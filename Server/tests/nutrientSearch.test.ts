import fetchMock from 'jest-fetch-mock';
import {steakNutritionTestData} from "./testdata";
import nutrientSearch from "../supabase/functions/FoodSearch/searches/nutrientSearch";


// Enable fetch mocking
fetchMock.enableMocks();

// Write a test for instantSearch
test('instantSearch returns a promise with instantSearchInterface', async () => {
    // Mock the fetch response with some dummy data
    fetchMock.mockResponseOnce(JSON.stringify(steakNutritionTestData));

    // Call instantSearch with 'apple' as argument
    const result = await nutrientSearch('apple');

    // Expect result to match the mock response
    expect(result).toEqual(steakNutritionTestData);
});
