// Import jest-fetch-mock and instantSearch
import fetchMock from 'jest-fetch-mock';
import brandedSearch from "../searches/brandedSearch";
import { bigMacBrandedTestData } from './testdata';
import authHeaders from '../searches/headersObject';
import { baseUrl } from '../constants';


// Enable fetch mocking
fetchMock.enableMocks();

// Mock the fetch response with some dummy data
beforeEach(() => {
    fetchMock.mockResponseOnce(JSON.stringify(bigMacBrandedTestData));
  });
  
  // Write a test for brandedSearch
  test('brandedSearch returns a promise with brandedSearchResultInterface', async () => {
    // Call brandedSearch with 'apple' as argument
    const result = await brandedSearch('513fc9e73fe3ffd40300109f');
    
    // Expect result to match the mock response
    expect(result).toEqual(bigMacBrandedTestData);
  
    // Test that the mock function was called with the correct arguments
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(baseUrl + "search/item?nix_item_id=513fc9e73fe3ffd40300109f");
    expect(fetchMock.mock.calls[0][1]).toEqual({
      method: "GET",
      headers: authHeaders,
    });
  });
