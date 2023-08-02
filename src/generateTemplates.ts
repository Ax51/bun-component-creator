import { reactTemplate } from "./examples/react";
import { solidTemplate } from "./examples/solid";
import { ITemplate } from "./types";

export const askUserForTemplates = (): {
  templates: ITemplate[];
  basePath: string;
  shouldExit?: true;
} => {
  const basePath =
    prompt(
      "Write default path to store your components (relative from the project root or absolute):",
    ) ?? "./";
  const availableFrameworks = ["react", "solid"];
  const userChoice = prompt(
    `Enter which framework do you use: (${availableFrameworks.join(
      " | ",
    )} | custom)`,
  );

  switch (userChoice) {
    case "react":
      return { templates: reactTemplate, basePath };
    case "solid":
      return { templates: solidTemplate, basePath };
    default: {
      console.write("So let's create our own templates!\n");
      const mainFileExt = prompt(
        "Enter main files extension (.js | .tsx | .rs)",
      );
      const stylesExt = prompt(
        "Enter stylesheets extension (.css | .sass | .pcss)",
      );
      const isModuleStyles =
        stylesExt && confirm("Will you use moduled stylesheets?");
      const isTestsIncluded = confirm("Should we add test file?");
      const isStorybookIncluded = confirm("Should we add Storybook file?");

      const result: ITemplate[] = [
        {
          fileName: `{{ name }}${mainFileExt}`,
          template: "",
        },
      ];

      if (stylesExt) {
        result.push({
          fileName: `{{ name }}${isModuleStyles ? ".module" : ""}${stylesExt}`,
          template: "",
        });
      }

      if (isTestsIncluded) {
        result.push({
          fileName: `{{ name }}.test${mainFileExt}`,
          template: "",
        });
      }

      if (isStorybookIncluded) {
        result.push({
          fileName: `{{ name }}.stories${mainFileExt}`,
          template: "",
        });
      }

      console.write(
        "Ok, we're done. So next you need to open your component-builder config file and edit templates. We use `Mustache` syntax",
      );
      console.write(
        "After you're done, just run this script again, and pass `Mustache` arguments as shell flags (ex: `--fnName Component`)",
      );

      return { templates: result, shouldExit: true, basePath };
    }
  }
};
