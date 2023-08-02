import type { IArgs } from "../types";

export const parseArgv = () => {
  const args = process.argv.slice(2);
  let lastFlag = "";
  const parsedArgs = args.reduce<Record<string, string | boolean | string[]>>(
    (acc, str) => {
      if (str.startsWith("--")) {
        // NOTE: this is a full key
        const clearedFlag = str.slice(2).toLowerCase();
        if (clearedFlag.includes("=")) {
          const [flag, val] = clearedFlag.split("=");
          lastFlag = flag;
          return { ...acc, [lastFlag]: val };
        }
        lastFlag = clearedFlag;
        return { ...acc, [lastFlag]: true };
      }

      if (str.startsWith("-")) {
        // NOTE: this is a short key(s)
        lastFlag = str[str.length - 1];
        const flags = str
          .slice(1)
          .split("")
          .reduce<Record<string, boolean>>(
            (keys, shortKey) => ({ ...keys, [shortKey]: true }),
            {},
          );
        return { ...acc, ...flags };
      }

      // NOTE: this is a value
      if (lastFlag in acc) {
        // NOTE: this is array of values
        const prevVal = acc[lastFlag];
        if (Array.isArray(prevVal)) {
          return { ...acc, [lastFlag]: [...prevVal, str] };
        }
        if (typeof prevVal === "boolean") {
          return { ...acc, [lastFlag]: str };
        }
        return {
          ...acc,
          [lastFlag]: [prevVal, str],
        };
      }
      return {
        ...acc,
        [lastFlag]: str,
      };
    },
    {},
  );

  return parsedArgs as IArgs;
};
