import {
  NativeImportLanguageProfiles,
  createCSharpRoslynNativeImporterAdapter,
  createSemanticImportSidecar,
  createUniversalCapabilityMatrix,
  runNativeImporterAdapter
} from '@shapeshift-labs/frontier-lang-compiler';

export const CSharpSourceLanguage = 'csharp';
export const CSharpParser = 'roslyn';
export const CSharpParserAstFormat = 'roslyn-csharp';
export const CSharpSupportedExtensions = Object.freeze(['.cs']);

export const CSharpLanguagePackage = Object.freeze({
  packageName: '@shapeshift-labs/frontier-lang-csharp',
  version: '0.1.10',
  sourceLanguage: CSharpSourceLanguage,
  parser: CSharpParser,
  parserAstFormat: CSharpParserAstFormat,
  supportedExtensions: CSharpSupportedExtensions,
  compilerPackage: '@shapeshift-labs/frontier-lang-compiler',
  compilerVersion: '0.2.68'
});

export const CSharpCapabilityLanguageProfiles = Object.freeze(
  NativeImportLanguageProfiles.filter((profile) => profile.language === CSharpSourceLanguage)
);

export { createCSharpRoslynNativeImporterAdapter } from '@shapeshift-labs/frontier-lang-compiler';

export function createCSharpNativeImporterAdapter(options = {}) {
  return createCSharpRoslynNativeImporterAdapter(options);
}

export function createCSharpLanguageCapabilityMatrix(options = {}) {
  const languages = options.languages ?? CSharpCapabilityLanguageProfiles;
  const adapters = options.adapters ?? [createCSharpNativeImporterAdapter(options.importerOptions ?? {})];
  return createUniversalCapabilityMatrix({ ...options, languages, adapters });
}

function mergeAdapterOptions(input = {}, options = {}) {
  const adapterOptions = {
    ...(options.adapterOptions ?? {}),
    ...(input.adapterOptions ?? {})
  };
  for (const alias of ['ast', 'nativeAst', 'syntaxTree', 'tree', 'root', 'compilationUnit']) {
    if (Object.prototype.hasOwnProperty.call(input, alias)) {
      adapterOptions[alias] = input[alias];
    }
  }
  return adapterOptions;
}

function pickSidecarOptions(options = {}) {
  if (options.sidecarOptions) {
    return options.sidecarOptions;
  }
  const picked = {};
  for (const key of ['id', 'generatedAt', 'regionPrefix']) {
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      picked[key] = options[key];
    }
  }
  return picked;
}

export async function importCSharpSource(input = {}, options = {}) {
  const importerOptions = {
    ...(options.importerOptions ?? {}),
    ...(input.importerOptions ?? {})
  };
  const adapter = input.adapter ?? createCSharpNativeImporterAdapter(importerOptions);
  return runNativeImporterAdapter(adapter, {
    sourceText: input.sourceText ?? '',
    sourcePath: input.sourcePath,
    sourceHash: input.sourceHash,
    language: input.language ?? options.language ?? CSharpSourceLanguage,
    parser: input.parser ?? options.parser ?? CSharpParser,
    parserVersion: input.parserVersion ?? options.parserVersion,
    adapterOptions: mergeAdapterOptions(input, options),
    adapterMetadata: {
      packageName: CSharpLanguagePackage.packageName,
      ...(options.adapterMetadata ?? {}),
      ...(input.adapterMetadata ?? {})
    },
    evidence: input.evidence,
    metadata: input.metadata
  });
}

export async function createCSharpSemanticImportSidecar(input = {}, options = {}) {
  const importResult = await importCSharpSource(input, options);
  return createSemanticImportSidecar(importResult, pickSidecarOptions(options));
}
