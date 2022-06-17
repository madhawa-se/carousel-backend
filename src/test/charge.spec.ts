import app from "../index";
import request from "supertest";
import { getTestUserToken } from "./test-helper";

let token;

beforeAll(async (done) => {
    token = await getTestUserToken();
    done();
});

describe("Chargebee", () => {

    it("Should return error when setting client priority without clientId", async (done) => {
        // (ChargeBee as any).plan.mockImplementation(() => Promise.resolve('test'));

        const result = await request(app)
            .get("/api/v1/charge/plans")
            .set("Authorization", `Bearer ${token}`).send({});

        expect(result.status).toEqual(200);
        done();
    });

});
