const fitnessFunctions = require('../controllers/fitnessController');

test('Check count of 4', () => {
    expect(fitnessFunctions.getOccurrences([2, 3, 4, 2, 3, 1, 5], 4)).toBe(1);
  });
test('Check count of 6', () => {
    expect(fitnessFunctions.getOccurrences([2, 3, 4, 2, 3, 1, 5], 6)).toBe(0);
  });
test('Check count of 5', () => {
    expect(fitnessFunctions.getOccurrences([], 5)).toBe(0);
  });
test('Check count of 3', () => {
    expect(fitnessFunctions.getOccurrences([2, 3, 4, 2, 3, 1, 5], 3)).toBe(2);
  });
  test('Check count of 1', () => {
    expect(fitnessFunctions.getOccurrences([1, 1, 1, 1, 1, 1, 1], 1)).toBe(7);
  });


