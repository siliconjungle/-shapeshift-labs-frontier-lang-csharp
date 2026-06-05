# @shapeshift-labs/frontier-lang-csharp

C# Roslyn source-language importer package for Frontier Lang semantic source documents.

Wraps the compiler C# Roslyn native importer with package-level metadata, import helpers, and semantic sidecar generation for SyntaxTree/SyntaxNode-shaped ASTs.

## Usage

```js
import { importCSharpSource, createCSharpSemanticImportSidecar } from '@shapeshift-labs/frontier-lang-csharp';

const imported = await importCSharpSource({
  sourcePath: 'src/Todo.cs',
  sourceText: "public class Todo { public void AddTodo(string title) {} }\n",
  ast: {
    kind: 'CompilationUnit',
    members: [{
      kind: 'ClassDeclarationSyntax',
      identifier: { text: 'Todo' },
      members: [{ kind: 'MethodDeclarationSyntax', identifier: { text: 'AddTodo' }, returnType: { name: 'void' } }]
    }]
  }
});

const sidecar = await createCSharpSemanticImportSidecar({
  sourcePath: 'src/Todo.cs',
  sourceText: "public class Todo { public void AddTodo(string title) {} }\n",
  ast: {
    kind: 'CompilationUnit',
    members: [{
      kind: 'ClassDeclarationSyntax',
      identifier: { text: 'Todo' },
      members: [{ kind: 'MethodDeclarationSyntax', identifier: { text: 'AddTodo' }, returnType: { name: 'void' } }]
    }]
  }
});

console.log(imported.metadata.astFormat);
console.log(sidecar.symbols.map((symbol) => symbol.name));
```

This package expects a caller-owned parser AST, parser module, or parser function. It records exact-parser-AST metadata and semantic sidecars for merge review; it does not claim full type, build-system, macro, generator, or runtime semantics unless those are provided as evidence.

## API

- `createCSharpNativeImporterAdapter(options)`: create the package-level native importer adapter.
- `importCSharpSource(input, options)`: import source plus a native AST into a Frontier native import result.
- `createCSharpSemanticImportSidecar(input, options)`: import source and return a semantic import sidecar suitable for swarm merge evidence.
- `CSharpLanguagePackage`: package metadata for release-train and coordinator tooling.

## Benchmarks

Run the package-local benchmark with:

```sh
npm run bench
```

These measurements exercise only this package's importer wrapper and semantic sidecar helpers.
