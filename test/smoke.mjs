import assert from 'node:assert/strict';
import {
  CSharpLanguagePackage,
  CSharpParserAstFormat,
  CSharpSourceLanguage,
  createCSharpNativeImporterAdapter,
  createCSharpLanguageCapabilityMatrix,
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
assert.equal(CSharpLanguagePackage.version, '0.1.6');
assert.equal(CSharpLanguagePackage.compilerVersion, '0.2.47');

const imported = await importCSharpSource({
  sourcePath: 'src/Todo.cs',
  sourceText: "public class Todo { public void AddTodo(string title) {} }\n",
  ast
});

assert.equal(imported.adapter.parser, 'roslyn');
assert.equal(imported.metadata.astFormat, 'roslyn-csharp');
assert.equal(imported.semanticIndex.symbols.some((symbol) => symbol.name === 'AddTodo' && symbol.kind === 'method'), true);
assert.equal(imported.metadata.nativeImportLossSummary.exactAst, true);

const capability = createCSharpLanguageCapabilityMatrix({ imports: [imported], targets: ['typescript', 'rust'] });
assert.equal(capability.kind, 'frontier.lang.universalCapabilityMatrix');
assert.equal(capability.languages.length, 1);
assert.equal(capability.languages[0].language, CSharpSourceLanguage);
assert.equal(capability.summary.imports, 1);
assert.equal(capability.summary.targetEntries, 2);

const sidecar = await createCSharpSemanticImportSidecar({
  sourcePath: 'src/Todo.cs',
  sourceText: "public class Todo { public void AddTodo(string title) {} }\n",
  ast
}, { id: 'csharp-sidecar', regionPrefix: 'csharp' });

assert.equal(sidecar.id, 'csharp-sidecar');
assert.equal(sidecar.symbols.some((symbol) => symbol.name === 'AddTodo'), true);
console.log('@shapeshift-labs/frontier-lang-csharp smoke ok');
