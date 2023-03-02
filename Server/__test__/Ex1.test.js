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




// Import the function to be tested
test('convert JSON data to an array', () => {
  const data = '[1, 2, 3]'
  expect(fitnessFunctions.APIcallToArray([data])).toEqual([1, 2, 3]);
})
// describe('APIcallToArray', () => {
//   test('should convert JSON data to an array', () => {
//     const data = '[1, 2, 3]';
//     const result = APIcallToArray(data);
//     expect(result).toEqual([1, 2, 3]);
//   });

test('convert JSON data to an array', () => {
  const data = '[1, 2, 3]';
  expect(fitnessFunctions.APIcallToArray([data])).toEqual([1, 2, 3]);
})

  test('should return an empty array if JSON data is empty', () => {
    const data = '';
    expect(fitnessFunctions.APIcallToArray([data])).toEqual([])
  });

  test('should throw an error if JSON data is invalid', () => {
    const data = 'invalid';
    expect(() => APIcallToArray(data)).toThrow(error);
  });




test('Most Recent Workouts', async () => {
 const data = await info.supabaseQuery.mostRecent();
 expect(data).toBe('peanut butter');
 });
 Import the function to be tested
const APIcallToArray = require('../controllers/fitnessControllers.js');

test('should convert JSON data to an array', (assert) => {
  const data = '[1, 2, 3]';
  const result = APIcallToArray(data);
  assert.deepEqual(result, [1, 2, 3]);
});
test('should return an empty array if JSON data is empty', (assert) => {
  const data = '';
  const result = APIcallToArray(data);
  assert.deepEqual(result, []);
});

test('should throw an error if JSON data is invalid', (assert) => {
  const data = 'invalid';
  assert.throws(() => {
    APIcallToArray(data);
  });
});
const searchDB = require('../controllers/fitnessControllers.js');

test('Search Exercises database for bicep curl', () => {
  const obj = {
    "ExerciseID" : "5681d626-faee-4277-be34-3346696433e6",
    "Type" : "Weight",
    "Name" : "Bicep Curl",
    "Muscle" : "bicep",
    "Difficulty" : "Beginner",
    "Instructions" : "Curl the weight"
  }      
  expect(fitnessFunctions.searchDB('Bicep curl').toBe(obj));
});

test('Search Exercises database for chest press', () => {
  const obj = {
    "ExerciseID" : "78491fbb-818b-4f85-ac0a-592fbcfb0b2e",
    "Type" : "Weight",
    "Name" : "Bench Press",
    "Muscle" : "Chest",
    "Difficulty" : "Beginner",
    "Instructions" : "CLay with back on bench and press bar upwards from chest height."
  }      
  expect(fitnessFunctions.searchDB('Bench Press').toBe(obj));
});


jest.mock('../dist/utils/databaseInterface.js');

describe('searchDB', () => {
  it('returns null when given an invalid exercise name', async () => {
    const supabase = {};
    const name = 'invalid-exercise-name';
    const { data, error } = await searchDB(name);
    expect(error).toBe(null);
    expect(data).toBe(null);
  });

  it('returns the exercise data when given a valid exercise name', async () => {
    const supabase = {};
    const name = 'valid-exercise-name';
    const expectedData = { id: 1, name: 'valid-exercise-name', description: 'example description' };
    supabaseQueryClass.prototype.findrow.mockResolvedValueOnce({ data: expectedData, error: null });
    const { data, error } = await searchDB(name);
    expect(error).toBe(null);
    expect(data).toEqual(expectedData);
  });

  it('handles errors thrown during the Supabase query', async () => {
    const supabase = {};
    const name = 'valid-exercise-name';
    const expectedError = new Error('example error');
    supabaseQueryClass.prototype.findrow.mockResolvedValueOnce({ data: null, error: expectedError });
    const { data, error } = await searchDB(name);
    expect(error).toEqual(expectedError);
    expect(data).toBe(null);
  });
});
