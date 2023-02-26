import fetchMock from "jest-fetch-mock";
import { steakNutritionTestData } from "./testdata";
import nutrientSearch from "../searches/nutrientSearch";
import authHeaders from "../searches/headersObject";
import { baseUrl } from "../constants";
import { URLSearchParams } from "url";

// Enable fetch mocking
fetchMock.enableMocks();

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
