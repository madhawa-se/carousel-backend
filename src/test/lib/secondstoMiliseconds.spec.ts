import app from "../../index";
import request from "supertest";
import { secondsToMiliseconds } from "../../lib/secondsToMiliseconds";


describe("API Error", () => {

    it("Should convert to miliseconds", async (done) => {
        const miliSecond = secondsToMiliseconds(5);
        expect(miliSecond).toEqual(5000);
        done();
    });

});
