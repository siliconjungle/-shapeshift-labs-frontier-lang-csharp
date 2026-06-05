import type {
  CSharpRoslynNativeImporterAdapterOptions,
  NativeImporterAdapter,
  NativeImporterAdapterImportResult,
  SemanticImportSidecar,
  SemanticImportSidecarOptions
} from '@shapeshift-labs/frontier-lang-compiler';

export declare const CSharpSourceLanguage: 'csharp';
export declare const CSharpParser: 'roslyn';
export declare const CSharpParserAstFormat: 'roslyn-csharp';
export declare const CSharpSupportedExtensions: readonly string[];

export interface CSharpLanguagePackageMetadata {
  readonly packageName: '@shapeshift-labs/frontier-lang-csharp';
  readonly version: '0.1.0';
  readonly sourceLanguage: 'csharp';
  readonly parser: 'roslyn';
  readonly parserAstFormat: 'roslyn-csharp';
  readonly supportedExtensions: readonly string[];
  readonly compilerPackage: '@shapeshift-labs/frontier-lang-compiler';
  readonly compilerVersion: '0.2.31';
}

export declare const CSharpLanguagePackage: CSharpLanguagePackageMetadata;

export { createCSharpRoslynNativeImporterAdapter } from '@shapeshift-labs/frontier-lang-compiler';

export interface CSharpSourceImportInput {
  readonly sourceText?: string;
  readonly sourcePath?: string;
  readonly sourceHash?: string;
  readonly language?: string;
  readonly parser?: string;
  readonly parserVersion?: string;
  readonly adapter?: NativeImporterAdapter;
  readonly importerOptions?: CSharpRoslynNativeImporterAdapterOptions;
  readonly adapterOptions?: Record<string, unknown>;
  readonly adapterMetadata?: Record<string, unknown>;
  readonly evidence?: readonly unknown[];
  readonly metadata?: Record<string, unknown>;
  readonly ast?: unknown;
  readonly nativeAst?: unknown;
  readonly syntaxTree?: unknown;
  readonly tree?: unknown;
  readonly root?: unknown;
  readonly compilationUnit?: unknown;
}

export interface CSharpSourceImportOptions {
  readonly language?: string;
  readonly parser?: string;
  readonly parserVersion?: string;
  readonly importerOptions?: CSharpRoslynNativeImporterAdapterOptions;
  readonly adapterOptions?: Record<string, unknown>;
  readonly adapterMetadata?: Record<string, unknown>;
}

export interface CSharpSemanticImportSidecarOptions extends CSharpSourceImportOptions {
  readonly sidecarOptions?: SemanticImportSidecarOptions;
  readonly id?: string;
  readonly generatedAt?: number;
  readonly regionPrefix?: string;
}

export declare function createCSharpNativeImporterAdapter(options?: CSharpRoslynNativeImporterAdapterOptions): NativeImporterAdapter;
export declare function importCSharpSource(input?: CSharpSourceImportInput, options?: CSharpSourceImportOptions): Promise<NativeImporterAdapterImportResult>;
export declare function createCSharpSemanticImportSidecar(input?: CSharpSourceImportInput, options?: CSharpSemanticImportSidecarOptions): Promise<SemanticImportSidecar>;
