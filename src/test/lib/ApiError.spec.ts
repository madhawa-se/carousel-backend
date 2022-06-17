import { ApiError } from "../../lib/ApiError";

describe("API Error", () => {

    it("Should create a api error with code and message", async (done) => {
        const apiError=new ApiError("test error", 400);
        expect(apiError.code).toEqual(400);
        expect(apiError.message).toEqual("test error");
        done();
    });

});
