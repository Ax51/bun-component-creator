import { ITemplate } from "../types";

export const reactTemplate: ITemplate[] = [
  {
    fileName: "{{ name }}.module.css",
    template: `.root {
  margin: 0;
}`,
  },
  {
    fileName: "{{ name }}.tsx",
    template: `import React from "react";
import css from "./{{ name }}.scss";

export const {{ name }} = ({{ args }}) => {
  const a = 3;
  return <div className={css.root}>{a}</div>;
}
`,
  },
  {
    fileName: "index.ts",
    template: `export { {{ name }} } from "./{{ name }}";
`,
  },
  {
    fileName: "{{ name }}.test.ts",
    template: `import { test } from "jest";
import { {{ name }} } from "./{{ name }}.tsx";

const test{{ name }} = () => {
  const testres = test({{ name }})
  return testres;
}
`,
  },
];
