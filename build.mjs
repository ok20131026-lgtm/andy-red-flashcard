import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';

await mkdir('dist', { recursive: true });
let html = await readFile('index.html', 'utf8');
html = html
  .replaceAll('__PUBLIC_URL__', process.env.PUBLIC_URL || '')
  .replaceAll('__KAKAO_JS_KEY__', process.env.KAKAO_JS_KEY || '');
await writeFile('dist/index.html', html);
await copyFile('quizData.json', 'dist/quizData.json');
console.log('Built Andy RED Vol.2 flashcard app into dist/');
