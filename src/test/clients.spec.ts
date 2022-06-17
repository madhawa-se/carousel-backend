import app from "../index";
import request from "supertest";
import { getTestUserToken } from "./test-helper";

let token;

beforeAll(async(done) => {
    token = await getTestUserToken();
    done();
});

describe("Client", () => {

    it("Should return error when setting client priority without clientId", async (done) => {
        const result = await request(app)
            .post("/api/v1/clients/priority")
            .set("Authorization", `Bearer ${token}`).send({});
        expect(result.status).toEqual(422);
        done();
    });

    it("Should return error when setting client priority with incorrrect client id ", async (done) => {
        const result = await request(app)
            .post("/api/v1/clients/priority")
            .set("Authorization", `Bearer ${token}`).send({ clientId: '1111111' });
        expect(result.status).toEqual(422);
        done();
    });

    it("Should return error when setting client priority with incorrrect priority name", async (done) => {
        const result = await request(app)
            .post("/api/v1/clients/priority")
            .set("Authorization", `Bearer ${token}`).send({ clientId: '8f6c64b1-7f98-4e84-aea1-f62f21b1822e', priorityName: 'Foo' });
        expect(result.status).toEqual(500);
        done();
    });

    it("Should return clientId", async (done) => {
        const result = await request(app)
            .post("/api/v1/clients/priority")
            .set("Authorization", `Bearer ${token}`).send({ clientId: '8f6c64b1-7f98-4e84-aea1-f62f21b1822e', priorityName: 'High' });
        const expectedData = {
            "success": "Priority assigned"
        };
        expect(result.body).toMatchObject(expectedData);
        expect(result.status).toEqual(200);
        done();
    });

    it("Should return error when setting label with incorrrect label name", async (done) => {
        const result = await request(app)
            .post("/api/v1/clients/label")
            .set("Authorization", `Bearer ${token}`).send({ clientId: '8f6c64b1-7f98-4e84-aea1-f62f21b1822e', priorityName: 'Foo' });
        expect(result.status).toEqual(422);
        done();
    });


});
