import app from "../index";
import request from "supertest";
import Reply from "../models/reply.model";
import User from "../models/user.model";
import Label from "../models/label.model";
import template from "../controllers/api/template";
import { getTestUserToken } from "./test-helper";

let token;
beforeAll(async (done) => {
    token = await getTestUserToken();
    done();
});


describe("metadata", async () => {

    it("Cannot get quotes without id", async (done) => {
        const result = await request(app)
            .get("/api/v1/metadata/quotes")
            .set("Authorization", `Bearer ${token}`).send({});
            expect(result.status).toEqual(422);
            done();
    });

    it("Cannot get messagesByLocation without id", async (done) => {
        const result = await request(app)
            .get("/api/v1/metadata/messagesByLocation")
            .set("Authorization", `Bearer ${token}`).send({});
            expect(result.status).toEqual(422);
            done();
    });

    it("Cannot get messagesByLabel without id", async (done) => {
        const result = await request(app)
            .get("/api/v1/metadata/quotes")
            .set("Authorization", `Bearer ${token}`).send({});
            expect(result.status).toEqual(422);
            done();
    });

});




