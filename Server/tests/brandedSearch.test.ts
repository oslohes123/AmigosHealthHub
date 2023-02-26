// Import jest-fetch-mock and instantSearch
import fetchMock from 'jest-fetch-mock';
import brandedSearch from "../searches/brandedSearch";
import {bigMacBrandedTestData} from "./testdata";


// Enable fetch mocking
fetchMock.enableMocks();

// Write a test for instantSearch
test('instantSearch returns a promise with instantSearchInterface', async () => {
    // Mock the fetch response with some dummy data
    fetchMock.mockResponseOnce(JSON.stringify(bigMacBrandedTestData));

    // Call instantSearch with 'apple' as argument
    const result = await brandedSearch('apple');

    // Expect result to match the mock response
    expect(result).toEqual(bigMacBrandedTestData);
});
