import assert from 'node:assert/strict';
import {
  CSharpLanguagePackage,
  CSharpParserAstFormat,
  CSharpSourceLanguage,
  createCSharpNativeImporterAdapter,
  importCSharpSource,
  createCSharpSemanticImportSidecar
} from '../dist/index.js';

const ast = {
  kind: 'CompilationUnit',
  members: [{
    kind: 'ClassDeclarationSyntax',
    identifier: { text: 'Todo' },
    members: [{ kind: 'MethodDeclarationSyntax', identifier: { text: 'AddTodo' }, returnType: { name: 'void' } }]
  }]
};

const adapter = createCSharpNativeImporterAdapter();
assert.equal(adapter.language, CSharpSourceLanguage);
assert.equal(CSharpLanguagePackage.parserAstFormat, CSharpParserAstFormat);

const imported = await importCSharpSource({
  sourcePath: 'src/Todo.cs',
  sourceText: "public class Todo { public void AddTodo(string title) {} }\n",
  ast
});

assert.equal(imported.adapter.parser, 'roslyn');
assert.equal(imported.metadata.astFormat, 'roslyn-csharp');
assert.equal(imported.semanticIndex.symbols.some((symbol) => symbol.name === 'AddTodo' && symbol.kind === 'method'), true);
assert.equal(imported.metadata.nativeImportLossSummary.exactAst, true);

const sidecar = await createCSharpSemanticImportSidecar({
  sourcePath: 'src/Todo.cs',
  sourceText: "public class Todo { public void AddTodo(string title) {} }\n",
  ast
}, { id: 'csharp-sidecar', regionPrefix: 'csharp' });

assert.equal(sidecar.id, 'csharp-sidecar');
assert.equal(sidecar.symbols.some((symbol) => symbol.name === 'AddTodo'), true);
console.log('@shapeshift-labs/frontier-lang-csharp smoke ok');
