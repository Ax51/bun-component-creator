export interface IArgs {
  verbose?: string[];
  name?: string[];
  path?: string[];
  settings_file?: string[];
  reset?: string[];
}

export interface ISettings {
  defaultPath: string;
}

export interface ITemplate {
  fileName: string;
  template: string;
}

export interface ISavedSettings {
  settings: ISettings;
  templates: ITemplate[];
}
