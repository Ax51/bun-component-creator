import { askUserForTemplates } from "./generateTemplates";
import { ISavedSettings } from "./types";

export const getTemplates = async (
  settingsFileName: string,
  shouldReset: boolean,
): Promise<ISavedSettings> => {
  const rawSavedSettings = Bun.file(`./${settingsFileName}`);

  // NOTE: check if settings file already exists
  if (!shouldReset && (await rawSavedSettings.exists())) {
    // NOTE: file exists, read;
    try {
      const savedSettings = await rawSavedSettings.json();
      return savedSettings as ISavedSettings;
    } catch {
      console.error("Saved settings are corrupted");
    }
  }
  // NOTE: create new file
  const { templates, basePath, shouldExit } = askUserForTemplates();

  const settingsToSave: ISavedSettings = {
    settings: { defaultPath: basePath },
    templates,
  };

  await Bun.write(`./${settingsFileName}`, JSON.stringify(settingsToSave));

  // NOTE: exit because user sould edit templates
  shouldExit && process.exit(0);

  return settingsToSave;
};
