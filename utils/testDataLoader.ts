import { readFileSync } from 'fs';
import { join } from 'path';

export const loadTestData = () => {
  const testDataPath = join(__dirname, '../data/testData.json');
  const testData = JSON.parse(readFileSync(testDataPath, 'utf-8'));
  return testData;
};
