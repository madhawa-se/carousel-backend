import app from "../index";
import request from "supertest";
import { getTestUserToken } from "./test-helper";

let token;

beforeAll(async(done) => {
    token = await getTestUserToken();
    done();
});

describe("Client Estimation", () => {
    it("Should return error when provide incorrect id", async (done) => {
        const result = await request(app)
            .get("/api/v1/clientEstimations/122332fff")
            .set("Authorization", `Bearer ${token}`).send({});
        expect(result.status).toEqual(422);
        done();
    });

    it("Should return error when provide none existant id", async (done) => {
        const result = await request(app)
            .get("/api/v1/clientEstimations/57ef4431-0f44-46ff-bdda-92e3b63d1559")
            .set("Authorization", `Bearer ${token}`).send({});
        expect(result.status).toEqual(500);
        done();
    });

    it("Should validate for paramters", async (done) => {
        const result = await request(app)
            .post("/api/v1/clientEstimations")
            .set("Authorization", `Bearer ${token}`).send({
                clientId: 121,
                name: 'testuser',
                details: 'Estimation'
            });
        expect(result.status).toEqual(422);
        done();
    });

    it("Should return estimations for user", async (done) => {
        const result = await request(app)
            .get("/api/v1/clientEstimations")
            .set("Authorization", `Bearer ${token}`).send();
        expect(result.status).toEqual(200);
        done();
    });

});
