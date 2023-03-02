const fitnessFunctions = require('../controllers/fitnessController');

test('Check count of 4', () => {
const obj = {
    "ExerciseID" : "5681d626-faee-4277-be34-3346696433e6",
    "Type" : "Weight",
    "Name" : "Bicep Curl",
    "Muscle" : "bicep",
    "Difficulty" : "Beginner",
    "Instructions" : "Curl the weight"
  }
  expect(fitnessFunctions.APIcallToArray(obj)).toBe(["ExerciseID" : "5681d626-faee-4277-be34-3346696433e6", ]);
});

test("should return an array with the same length as the input data", () => {
    const data = '[{"id": 1, "name": "John"}, {"id": 2, "name": "Jane"}]';
    const result = APIcallToArray(data);
    expect(result).toHaveLength(2);
});

test("should return an empty array when input data is empty", () => {
    const data = '[]';
    const result = APIcallToArray(data);
    expect(result).toEqual([]);
});

test("should return an array with the same elements as the input data", () => {
    const data = '[{"id": 1, "name": "John"}, {"id": 2, "name": "Jane"}]';
    const result = APIcallToArray(data);
    expect(result).toEqual([
    {"id": 1, "name": "John"},
    {"id": 2, "name": "Jane"}
    ]);
});

test("should handle invalid JSON input and return an empty array", () => {
    const data = 'not a valid json string';
    const result = APIcallToArray(data);
    expect(result).toEqual([]);
});
  ;
  