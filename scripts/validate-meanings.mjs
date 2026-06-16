import { readFile } from 'node:fs/promises';

const data = JSON.parse(await readFile('quizData.json', 'utf8'));
const normText = (v) => String(v || '').replace(/\s+/g, ' ').trim();
const wordOf = (w) => normText(w?.worD ?? w?.word);
const extractMeaning = (rationale) => {
  const match = String(rationale || '').match(/'([^']+)'/);
  return match ? match[1].trim() : '';
};
const correctOption = (q) => (q?.answerOptions || []).find((o) => o && o.isCorrect === true);
const optionMatchesWord = (option, word) => {
  const target = normText(word).toLowerCase();
  return Boolean(target) && [wordOf(option), option?.speakText].some((v) => normText(v).toLowerCase() === target);
};
const meaningFrom = (day, word) => {
  const questions = day.questions || [];
  const byNumber = questions.find((q) => String(q.sourceNumber) === String(word.number));
  const numberedMeaning = extractMeaning(correctOption(byNumber)?.rationale);
  if (numberedMeaning) return numberedMeaning;

  for (const question of questions) {
    const option = (question.answerOptions || []).find(
      (o) => o && optionMatchesWord(o, word.word),
    );
    const fallbackMeaning = extractMeaning(option?.rationale);
    if (fallbackMeaning) return fallbackMeaning;
  }

  return '';
};

const failures = [];
const seen = new Map();
for (const [unitIndex, unit] of (data.units || data.Units || []).entries()) {
  for (const [dayIndex, day] of (unit.Days || unit.days || []).entries()) {
    for (const sourceWord of day.words || []) {
      const word = { number: sourceWord.number, word: wordOf(sourceWord) };
      const meaning = meaningFrom(day, word);
      const label = `${unit.unitTitle || unit.title || `Unit ${unitIndex + 1}`} / ${day.DayTitle || day.title || `Day ${dayIndex + 1}`} / #${word.number} ${word.word}`;
      if (!meaning) failures.push(`${label}: meaning not found`);
      seen.set(word.word.toLowerCase(), meaning);
    }
  }
}

for (const [word, expected] of [['expensive', '비싼'], ['leaf', '잎']]) {
  const actual = seen.get(word);
  if (actual !== expected) failures.push(`${word}: expected ${expected}, got ${actual || 'not found'}`);
}

if (failures.length) {
  console.error(`Meaning validation failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Validated ${seen.size} unique words. expensive=비싼, leaf=잎`);
