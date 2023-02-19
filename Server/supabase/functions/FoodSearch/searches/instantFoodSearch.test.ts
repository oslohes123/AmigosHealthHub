import instantSearch from "./instantFoodSearch";
import {describe, it} from "node:test";
import {chickenInstantSearchResult} from "./testdata";



// Need to mock the fetch function so that the tests don't go and make API calls
describe("instantSearch", () => {
    it("should return instant search result", async () => {
        const food = "chicken";
        const result = await instantSearch(food);

        expect(result).toEqual({
            /* expected result */
        });
    });
});
