const fitnessFunctions = require('../controllers/fitnessController');


test("returns an empty array for an empty object", () => {
    const obj = {};
    const result = fitnessFunctions.workoutPlanNameFind(obj);
    expect(result).toEqual([]);
});