// Import jest-fetch-mock and instantSearch
import fetchMock from 'jest-fetch-mock';
import instantSearch from "../searches/instantFoodSearch";
import {chickenInstantSearchTestData} from "./testdata";

// Enable fetch mocking
fetchMock.enableMocks();

// Write a test for instantSearch
test('instantSearch returns a promise with instantSearchInterface', async () => {
    // Mock the fetch response with some dummy data
    fetchMock.mockResponseOnce(JSON.stringify(chickenInstantSearchTestData));

    // Call instantSearch with 'chicken' as argument
    const result = await instantSearch('chicken');


    // Expect result to match the mock response
    expect(result).toEqual(chickenInstantSearchTestData);
});
