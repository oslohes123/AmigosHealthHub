import fetchMock from "jest-fetch-mock";
import { URLSearchParams } from "url";
import { baseUrl } from "../../constants";
import authHeaders from "../../utils/Food/searches/headersObject";
import nutrientSearch from "../../utils/Food/searches/nutrientSearch";
import { steakNutritionTestData } from "./testdata";

// Enable fetch mocking
fetchMock.enableMocks();

describe("nutrientSearch function test", () => {
  // Mock the fetch response with some dummy data
  beforeEach(() => {
    fetchMock.mockResponseOnce(JSON.stringify(steakNutritionTestData));
  });

  // Write a test for nutrientSearch
  test("nutrientSearch returns a promise with nutrientInterface", async () => {
    // Call nutrientSearch with 'steak' as argument
    const result = await nutrientSearch("steak");

    // Expect fetch to have been called once
    expect(fetchMock.mock.calls.length).toEqual(1);

    // Expect fetch to have been called with the correct arguments
    expect(fetchMock.mock.calls[0][0]).toEqual(baseUrl + "natural/nutrients");
    expect(fetchMock.mock.calls[0][1]).toEqual({
      method: "POST",
      headers: authHeaders,
      body: new URLSearchParams({
        query: "steak",
      }),
    });

    // Expect result to match the mock response
    expect(result).toEqual(steakNutritionTestData);
  });
});

describe("nutrientSearch false function", () => {
  // Mock the fetch response with an error
  beforeEach(() => {
    fetchMock.mockReject(new Error("Failed to fetch data"));
  });

  // Write a test for instantSearch that expects an error to be thrown
  test("returns an error if the fetch fails", async () => {
    fetchMock.mockReject(new Error("Failed to fetch data"));
    expect.assertions(1);
    await expect(nutrientSearch("steak")).rejects.toThrow(
      "Failed to fetch data"
    );
  });
});
