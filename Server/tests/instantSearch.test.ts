// Import jest-fetch-mock and instantSearch
import fetchMock from "jest-fetch-mock";
import instantSearch from "../searches/instantFoodSearch";
import { chickenInstantSearchTestData } from "./testdata";
import { baseUrl } from "../constants";
import authHeaders from "../searches/headersObject";

// Enable fetch mocking
fetchMock.enableMocks();

// Mock the fetch response with some dummy data

describe("instantSearch function", () => {
  beforeEach(() => {
    fetchMock.mockResponseOnce(JSON.stringify(chickenInstantSearchTestData));
  });
  // Write a test for instantSearch
  test("instantSearch returns a promise with instantSearchInterface", async () => {
    // Call instantSearch with 'chicken' as argument
    const result = await instantSearch("chicken");

    // Expect fetch to have been called once
    expect(fetchMock.mock.calls.length).toEqual(1);

    // Expect fetch to have been called with the correct arguments
    expect(fetchMock.mock.calls[0][0]).toEqual(
      baseUrl + "search/instant?query=chicken"
    );
    expect(fetchMock.mock.calls[0][1]).toEqual({
      method: "GET",
      headers: authHeaders,
    });

    // Expect result to match the mock response
    expect(result).toEqual(chickenInstantSearchTestData);
  });
});

describe("instantSearch false function", () => {
  // Mock the fetch response with an error
  beforeEach(() => {
    fetchMock.mockReject(new Error("Failed to fetch data"));
  });

  // Write a test for instantSearch that expects an error to be thrown
  test("returns an error if the fetch fails", async () => {
    fetchMock.mockReject(new Error("Failed to fetch data"));
    expect.assertions(1);
    await expect(instantSearch("chicken")).rejects.toThrow(
      "Failed to fetch data"
    );
  });
});
