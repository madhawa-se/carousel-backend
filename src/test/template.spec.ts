import { id } from 'date-fns/locale';
import app from "../index";
import request from "supertest";
import Reply from "../models/reply.model";
import User from "../models/user.model";
import Template from "../models/template.model";
import { getTestUserToken } from './test-helper';

let token;
let template;
beforeAll(async (done) => {
    token = await getTestUserToken();
    done();
});

beforeAll(async () => {
    const user = await User.findOne({ where: { email: 'testmail1@mail.com' } });
    template = await Template.create(
        { title: "test", message: "template message", userId: user?.id },
    );
});

describe("Templates", async () => {
    it("cannot delete a reply without ID ", async (done) => {
        const result = await request(app)
            .post("/api/v1/templates")
            .set("Authorization", `Bearer ${token}`).send({});
        expect(result.status).toEqual(422);
        done();
    });

    it("Should create a template", async (done) => {
        const result = await request(app)
            .post("/api/v1/templates")
            .set("Authorization", `Bearer ${token}`).send({ title: "test", message: "message template" });
        expect(result.status).toEqual(200);
        done();
    });

    it("Update should fail without ID", async (done) => {
        const result = await request(app)
            .put("/api/v1/templates")
            .set("Authorization", `Bearer ${token}`).send({ title: "test", message: "message template updated" });
        expect(result.status).toEqual(422);
        done();
    });

    it("should update", async (done) => {
        const result = await request(app)
            .put("/api/v1/templates")
            .set("Authorization", `Bearer ${token}`).send({ id: template.id, title: "test", message: "message template updated" });
        expect(result.status).toEqual(422);
        done();
    });

    it("should delete", async (done) => {
        const result = await request(app)
            .delete(`/api/v1/templates/${template.id}`)
            .set("Authorization", `Bearer ${token}`).send();
        expect(result.status).toEqual(200);
        done();
    });
});

afterAll(async () => {
    Template.destroy({
        where: {},
        truncate: true
    })
});

