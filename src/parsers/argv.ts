import type { IArgs } from "../types";

export const parseArgv = () => {
  const args = process.argv.slice(2);
  let lastFlag = "";
  const parsedArgs = args.reduce<Record<string, string[]>>((acc, str) => {
    if (str.startsWith("--")) {
      // NOTE: this is a key
      lastFlag = str.slice(2).toLowerCase();
      return acc;
    } else {
      return {
        ...acc,
        [lastFlag]: lastFlag in acc ? [...acc[lastFlag], str] : [str],
      };
    }
  }, {});

  return parsedArgs as IArgs;
};
