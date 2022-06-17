import app from "../index";
import request from "supertest";


describe("Public", () => {

    it("Cannot sign with goole without code", async (done) => {
        const result = await request(app)
            .get("/api/v1/public/completegoogleauth").send();
        expect(result.status).toEqual(422);
        const expectedData = {
            "errors": [
                {
                    "msg": "Invalid value",
                    "param": "code",
                    "location": "query"
                }
            ]
        };
        expect(result.body).toMatchObject(expectedData);
        done();
    });

    it("Cannot sign with facebook without code", async (done) => {
        const result = await request(app)
            .get("/api/v1/public/completefacebookauth").send();
        expect(result.status).toEqual(422);
        const expectedData = {
            "errors": [
                {
                    "msg": "Invalid value",
                    "param": "accessToken",
                    "location": "query"
                },
                {
                    "msg": "Invalid value",
                    "param": "userID",
                    "location": "query"
                }
            ]
        };
        expect(result.body).toMatchObject(expectedData);
        done();
    });


    it("Cannot recover password without code and password", async (done) => {
        const result = await request(app)
            .post("/api/v1/public/recovernewpassword").send({});
        const expectedData = {
            "errors": [
                {
                    "msg": "Invalid value",
                    "param": "newPassword",
                    "location": "body"
                },
                {
                    "msg": "Invalid value",
                    "param": "code",
                    "location": "body"
                }
            ]
        };
        expect(result.body).toMatchObject(expectedData);
        expect(result.status).toEqual(422);
        done();
    });


    it("Cannot Register without - name email password", async (done) => {
        const result = await request(app)
            .post("/api/v1/public/register").send({});
        const expectedData = {
            "errors": [
                {
                    "msg": "Invalid value",
                    "param": "name",
                    "location": "body"
                },
                {
                    "msg": "Invalid value",
                    "param": "email",
                    "location": "body"
                },
                {
                    "msg": "Invalid value",
                    "param": "password",
                    "location": "body"
                }
            ]
        };
        expect(result.body).toMatchObject(expectedData);
        expect(result.status).toEqual(422);
        done();
    });


    
    it("Cannot get estimation with ID", async (done) => {
        const result = await request(app)
            .post("/api/v1/public/register").send({});
        const expectedData = {
            "errors": [
                {
                    "msg": "Invalid value",
                    "param": "name",
                    "location": "body"
                },
                {
                    "msg": "Invalid value",
                    "param": "email",
                    "location": "body"
                },
                {
                    "msg": "Invalid value",
                    "param": "password",
                    "location": "body"
                }
            ]
        };
        expect(result.body).toMatchObject(expectedData);
        expect(result.status).toEqual(422);
        done();
    });




});
