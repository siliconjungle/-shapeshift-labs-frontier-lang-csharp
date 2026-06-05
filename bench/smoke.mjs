import { performance } from 'node:perf_hooks';
import { importCSharpSource } from '../dist/index.js';

const iterations = 100;
const started = performance.now();
let symbols = 0;
for (let i = 0; i < iterations; i += 1) {
  const ast = {
    kind: 'CompilationUnit',
    members: [{ kind: 'ClassDeclarationSyntax', identifier: { text: `Todo${i}` }, members: [{ kind: 'MethodDeclarationSyntax', identifier: { text: `AddTodo${i}` }, returnType: { name: 'void' } }] }]
  };
  const imported = await importCSharpSource({
    sourcePath: `src/Todo${i}.cs`,
    sourceText: `public class Todo${i} { public void AddTodo${i}() {} }`,
    ast
  });
  symbols += imported.semanticIndex.symbols.length;
}
const elapsedMs = performance.now() - started;
console.log(JSON.stringify({
  package: '@shapeshift-labs/frontier-lang-csharp',
  iterations,
  elapsedMs: Number(elapsedMs.toFixed(3)),
  importsPerSecond: Number((iterations / (elapsedMs / 1000)).toFixed(2)),
  symbols
}, null, 2));
