import app from "../index";
import request from "supertest";
import { getTestUserToken } from "./test-helper";

let token;

beforeAll(async (done) => {
  token = await getTestUserToken();
  done();
});

describe("User", () => {

  it("Can login with correct credentials", async (done) => {
    const result = await request(app)
      .post("/api/v1/sessions")
      .send({ email: "testmail1@mail.com", password: '987654abc' })

    expect(result.body).toHaveProperty("token");
    expect(result.body).toHaveProperty("refreshToken");
    expect(result.status).toEqual(200);
    done();
  });

  it("Can't login with incorrect credentials", async (done) => {
    const result = await request(app)
      .post("/api/v1/sessions")
      .send({ email: "testmail1@mail.com", password: '123' })

    const expectedData = { "errors": [{ "msg": "Invalid Credentials" }] };
    expect(result.body).toMatchObject(expectedData);
    expect(result.status).toEqual(401);
    done();
  });


  it("should get current logged user data", async (done) => {
    const loginRes = await request(app)
      .post("/api/v1/sessions")
      .send({ email: "testmail1@mail.com", password: '987654abc' })

    const result = await request(app)
      .get("/api/v1/users/me")
      .set("Authorization", `Bearer ${loginRes.body.token}`)

    expect(result.status).toEqual(200);
    done();
  });


  it("should get logged user ( me ) data", async (done) => {

    const result = await request(app)
      .get("/api/v1/users/me")
      .set("Authorization", `Bearer ${token}`)
    expect(result.status).toEqual(200);
    done();
  });


  it("should retrive user network", async (done) => {

    const result = await request(app)
      .get("/api/v1/users/networks")
      .set("Authorization", `Bearer ${token}`);

    expect(result.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'email' }),
        expect.objectContaining({ name: 'whatsapp' })
      ])
    );
    expect(result.status).toEqual(200);
    done();
  });

});
