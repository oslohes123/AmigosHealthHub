const supabase = require('../dist/utils/supabaseSetUp.js');
const supabaseQuery = require('../dist/utils/databaseInterface.js');
const info = new supabaseQuery()

// test('Check count of 4', () => {
//     expect(fitnessFunctions.getOccurrences([2, 3, 4, 2, 3, 1, 5], 4)).toBe(1);
//   });
// test('Check count of 6', () => {
//     expect(fitnessFunctions.getOccurrences([2, 3, 4, 2, 3, 1, 5], 6)).toBe(0);
//   });
// test('Check count of 5', () => {
//     expect(fitnessFunctions.getOccurrences([], 5)).toBe(0);
//   });
// test('Check count of 3', () => {
//     expect(fitnessFunctions.getOccurrences([2, 3, 4, 2, 3, 1, 5], 3)).toBe(2);
//   });




// // Import the function to be tested
// test('convert JSON data to an array', () => {
//   const data = '[1, 2, 3]'
//   expect(fitnessFunctions.APIcallToArray([data])).toEqual([1, 2, 3]);
// })
// // describe('APIcallToArray', () => {
// //   test('should convert JSON data to an array', () => {
// //     const data = '[1, 2, 3]';
// //     const result = APIcallToArray(data);
// //     expect(result).toEqual([1, 2, 3]);
// //   });

// test('convert JSON data to an array', () => {
//   const data = '[1, 2, 3]';
//   expect(fitnessFunctions.APIcallToArray([data])).toEqual([1, 2, 3]);
// })

//   test('should return an empty array if JSON data is empty', () => {
//     const data = '';
//     expect(fitnessFunctions.APIcallToArray([data])).toEqual([])
//   });

//   test('should throw an error if JSON data is invalid', () => {
//     const data = 'invalid';
//     expect(() => APIcallToArray(data)).toThrow(error);
//   });




//test('Most Recent Workouts', async () => {
 // const data = await info.supabaseQuery.mostRecent();
 // expect(data).toBe('peanut butter');
 // });
 // Import the function to be tested
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
