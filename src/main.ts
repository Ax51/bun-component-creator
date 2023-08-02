import { getSettings } from "./getSettings";
import { createComponent } from "./createComponent";
import { parseArgv } from "./parsers/argv";

export const main = async () => {
  const args = parseArgv();

  const settingsFileName =
    args.settings_file?.[0] ?? "component-creator-settings.json";
  const shouldReset = args.reset?.[0] === "true";

  const {
    settings: { defaultPath },
    templates,
  } = await getSettings(settingsFileName, shouldReset);

  if (!args.name) {
    // NOTE: no name provided
    const enteredNames = prompt("Enter component name:")?.split(" ");
    args.name = enteredNames ?? ["Component"];
  }

  const pathToComponent = args.path?.[0] ?? defaultPath;

  for (const componentName of args.name) {
    await createComponent({
      componentName,
      path: pathToComponent,
      templates,
      args: { ...args, name: [componentName] },
    });
  }
};
