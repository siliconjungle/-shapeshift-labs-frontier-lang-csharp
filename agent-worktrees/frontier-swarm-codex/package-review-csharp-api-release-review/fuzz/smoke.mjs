import assert from 'node:assert/strict';
import { importCSharpSource, createCSharpSemanticImportSidecar } from '../dist/index.js';

for (let i = 0; i < 40; i += 1) {
  const ast = {
    kind: 'CompilationUnit',
    members: [{ kind: 'ClassDeclarationSyntax', identifier: { text: `Todo${i}` }, members: [{ kind: 'MethodDeclarationSyntax', identifier: { text: `AddTodo${i}` }, returnType: { name: 'void' } }] }]
  };
  const imported = await importCSharpSource({
    sourcePath: `src/Todo${i}.cs`,
    sourceText: `public class Todo${i} { public void AddTodo${i}() {} }`,
    ast
  });
  assert.equal(imported.metadata.astFormat, 'roslyn-csharp');
  assert.equal(imported.semanticIndex.symbols.some((symbol) => symbol.name === `AddTodo${i}`), true);
  const sidecar = await createCSharpSemanticImportSidecar({
    sourcePath: `src/Todo${i}.cs`,
    sourceText: `public class Todo${i} { public void AddTodo${i}() {} }`,
    ast
  }, { id: `csharp-fuzz-${i}` });
  assert.equal(sidecar.imports.length, 1);
}

console.log('@shapeshift-labs/frontier-lang-csharp fuzz ok');
