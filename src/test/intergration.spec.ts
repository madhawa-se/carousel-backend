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


describe("Templates", async () => {
    it("cannot delete a reply without ID ", async (done) => {
        const result = await request(app)
            .post("/api/v1/templates")
            .set("Authorization", `Bearer ${token}`).send({});
        expect(result.status).toEqual(422);
        done();
    });
});



