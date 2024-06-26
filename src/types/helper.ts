import type ts from 'typescript/lib/tsserverlibrary';

export type TsServer = typeof ts;

export interface CreatePlugin {
  typescript: TsServer;
}

export interface PluginConfig {
  servicePaths: string[];
  outputPath: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Random = any;

export type RecordUnknown = Record<string, unknown>;

export type RecordString = Record<string, string>;

export interface ServiceInformation {
  importPath: string;
  fileName: string;
}

export interface ServiceDefinition {
  action: string;
  event: string;
  import: string;
}
