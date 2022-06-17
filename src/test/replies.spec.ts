import app from "../index";
import request from "supertest";
import Reply from "../models/reply.model";
import User from "../models/user.model";
import { getTestUserToken } from "./test-helper";

let token;
beforeAll(async (done) => {
    token = await getTestUserToken();
    done();
});

describe("replies", async () => {
    const user = await User.findOne({ where: { email: 'testmail1@mail.com' } });
    const reply = await Reply.create(
        {
            message: 'message',
            enabled: true,
            userId: user!.id,
        }
    );

    it("Should receive all replies", async (done) => {
        const result = await request(app)
            .get("/api/v1/replies")
            .set("Authorization", `Bearer ${token}`).send({});
        expect(Array.isArray(result.body)).toBeTruthy();
        expect(result.body.length).toEqual(1);
        done();
    });

    it("cannot delete a reply without ID ", async (done) => {
        const result = await request(app)
            .delete("/api/v1/replies")
            .set("Authorization", `Bearer ${token}`).send({});
        expect(result.status).toEqual(422);
        done();
    });

    it("cannot update none existing reply ", async (done) => {
        const result = await request(app)
            .delete("/api/v1/replies")
            .set("Authorization", `Bearer ${token}`).send({});
        expect(result.status).toEqual(422);
        done();
    });

    it("Should delete a reply", async (done) => {
        const result = await request(app)
            .delete("/api/v1/replies")
            .set("Authorization", `Bearer ${token}`).send({ id: reply.id });
        expect(result.status).toEqual(200);
        done();
    });
});


describe("replies", () => {

    it("It should ", async (done) => {
        const result = await request(app)
            .post("/api/v1/replies")
            .set("Authorization", `Bearer ${token}`).send({});
        expect(result.status).toEqual(422);
        done();
    });
});




