#!/usr/bin/env bun
import Mustache from "mustache";
import { join } from "path";
import { getTemplates } from "./src/getTemplates";
import { parseArgv } from "./src/parsers/argv";
import { ensureFolder } from "./src/utils/ensureFolder";

const main = async () => {
  const args = parseArgv();

  const isVerbose = args.verbose?.[0] && args.verbose[0] !== "false";
  const settingsFileName =
    args.settings_file?.[0] ?? "component-creator-settings.json";
  const shouldReset = args.reset?.[0] === "true";

  const {
    settings: { defaultPath },
    templates,
  } = await getTemplates(settingsFileName, shouldReset);

  args.name ??= [prompt("Enter component name:") ?? "Component"];

  const pathToComponent = args.path?.[0] ?? defaultPath;

  const componentsFolderPath = join(pathToComponent, args.name[0]);
  const safePath = await ensureFolder(componentsFolderPath);
  isVerbose && console.write(`\nCreated folder:\n${safePath}\n`);

  for (const { fileName, template } of templates) {
    const parsedFileName = Mustache.render(fileName, args);
    const parsedTemplate = Mustache.render(template, args);

    await Bun.write(join(safePath, parsedFileName), parsedTemplate);
    isVerbose &&
      console.write(`\nCreated file:\n${join(safePath, parsedFileName)}\n`);
  }
};

await main();
