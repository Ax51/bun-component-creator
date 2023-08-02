import Mustache from "mustache";
import { join } from "path";
import { ensureFolder } from "./utils/ensureFolder";
import { IArgs, ITemplate } from "./types";

interface ICreateComponentProps {
  componentName: string;
  path: string;
  templates: ITemplate[];
  args: IArgs;
}

export const createComponent = async ({
  componentName,
  path,
  templates,
  args,
}: ICreateComponentProps) => {
  const isVerbose = args.verbose?.[0] && args.verbose[0] !== "false";

  const componentsFolderPath = join(path, componentName);
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
