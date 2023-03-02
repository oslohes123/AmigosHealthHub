const fitnessFunctions = require('../controllers/fitnessController');


test("returns an empty array for an empty object", () => {
    const obj = {};
    const result = fitnessFunctions.objectToArray(obj);
    expect(result).toEqual([]);
});

test("returns an array of object values", () => {
    const obj = {
    name: "John",
    age: 25,
    isEmployed: true,
    };
    const result = fitnessFunctions.objectToArray(obj);
    expect(result).toEqual(["John", 25, true]);
});

test("returns an array of null values for an object with null properties", () => {
    const obj = {
    name: null,
    age: null,
    isEmployed: null,
    };
    const result = fitnessFunctions.objectToArray(obj);
    expect(result).toEqual([null, null, null]);
});

  

  
  