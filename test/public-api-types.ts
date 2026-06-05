import {
  CSharpLanguagePackage,
  createCSharpNativeImporterAdapter,
  importCSharpSource,
  createCSharpSemanticImportSidecar
} from '../src/index.js';
import type {
  CSharpSourceImportInput,
  CSharpSourceImportOptions,
  CSharpSemanticImportSidecarOptions
} from '../src/index.js';
import type { NativeImporterAdapter } from '@shapeshift-labs/frontier-lang-compiler';

const adapter: NativeImporterAdapter = createCSharpNativeImporterAdapter();
const input: CSharpSourceImportInput = { sourceText: '', ast: {} };
const options: CSharpSourceImportOptions = { adapterOptions: {} };
const sidecarOptions: CSharpSemanticImportSidecarOptions = {
  id: 'sidecar',
  generatedAt: 1710000000000,
  regionPrefix: 'src',
  sidecarOptions: {
    id: 'nested-sidecar',
    generatedAt: 1710000000001
  }
};
const packageName: '@shapeshift-labs/frontier-lang-csharp' = CSharpLanguagePackage.packageName;

void adapter;
void input;
void options;
void sidecarOptions;
void packageName;
void importCSharpSource(input, options);
void createCSharpSemanticImportSidecar(input, sidecarOptions);
