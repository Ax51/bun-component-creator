import { ISettings } from "../types";

export const recordSettings = async (path: string, settings: ISettings) => {
  await Bun.write(path, JSON.stringify(settings));
};
