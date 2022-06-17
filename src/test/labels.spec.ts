import app from "../index";
import request from "supertest";
import Reply from "../models/reply.model";
import User from "../models/user.model";
import Label from "../models/label.model";
import { getTestUserToken } from "./test-helper";

let token;
let label;
beforeAll(async (done) => {
    token = await getTestUserToken();
    const user = await User.findOne({ where: { email: 'testmail1@mail.com' } });
    label = await Label.create(
        {
            userId: user?.id,
            name: 'testlabel'
        },
    );
    done();
});

describe("Labels", () => {

    it("Should receive all labels", async (done) => {
        const result = await request(app)
            .get("/api/v1/labels")
            .set("Authorization", `Bearer ${token}`).send({});
        expect(Array.isArray(result.body)).toBeTruthy();
        expect(result.body.length).toEqual(1);
        done();
    });

    it("Cannot update without id", async (done) => {
        const result = await request(app)
            .put(`/api/v1/labels`)
            .set("Authorization", `Bearer ${token}`).send();
        expect(result.status).toEqual(422);
        done();
    });

    it("Should update", async (done) => {
        const result = await request(app)
            .put(`/api/v1/labels/${label.id}`)
            .set("Authorization", `Bearer ${token}`).send({
                name: 'testlabel2'
            });
        expect(result.status).toEqual(200);
        done();
    });

});

afterAll(async () => {
    await Label.destroy({
        where: {}
    });
});


