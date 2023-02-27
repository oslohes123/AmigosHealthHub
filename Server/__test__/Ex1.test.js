const supabase = require('../dist/utils/supabaseSetUp.js');
const supabaseQuery = require('../dist/utils/databaseInterface.js');
const info = new supabaseQuery()

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


//test('Most Recent Workouts', async () => {
 // const data = await info.supabaseQuery.mostRecent();
 // expect(data).toBe('peanut butter');
 // });
  const supabaseQuery = require('../path/to/supabaseQuery');

  describe('mostRecent', () => {
    it('returns the 5 most recent records from the CompleteWorkouts table', async () => {
      
      const query = new supabaseQuery();
      const supabase = require('../dist/utils/supabaseSetUp.js');
      const result = await query.mostRecent(supabase);
      // Assert that the result is an array with 5 elements, and that each element has the expected properties
      expect(result).toHaveLength(5);
      expect(result[0]).toHaveProperty('CompleteWorkoutsID');
      expect(result[0]).toHaveProperty('Timestamp');
      // Add additional assertions for other expected properties
    });
  });

  describe('getOccurrences', () => {
    test('returns the correct count when value is present in array', () => {
      const arr = [1, 2, 3, 4, 2, 2];
      const v = 2;
      expect(getOccurrences(arr, v)).toBe(3);
    });
  
    test('returns 0 when value is not present in array', () => {
      const arr = [1, 2, 3, 4, 2, 2];
      const v = 5;
      expect(getOccurrences(arr, v)).toBe(0);
    });
  
    test('returns 0 when array is empty', () => {
      const arr = [];
      const v = 2;
      expect(getOccurrences(arr, v)).toBe(0);
    });
  
    test('returns 0 when array is null or undefined', () => {
      const v = 2;
      expect(getOccurrences(null, v)).toBe(0);
      expect(getOccurrences(undefined, v)).toBe(0);
    });
  
    test('returns the correct count when all elements of the array match the value', () => {
      const arr = [2, 2, 2, 2];
      const v = 2;
      expect(getOccurrences(arr, v)).toBe(4);
    });
  });
  
