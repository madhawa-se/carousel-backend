import app from "../index";
import request from "supertest";

describe("Server", () => {
  it("Hello API Request", async (done) => {
    const result = await request(app).get("/");
    expect(result.text).toEqual("Hello World!");
    expect(result.status).toEqual(200);
    done();
  });
});