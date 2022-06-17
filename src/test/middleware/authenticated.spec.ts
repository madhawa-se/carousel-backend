import { truncateSync } from 'fs';
import authenticated from '../../controllers/api/middleware/authenticated';
import { getTestUserToken } from "../test-helper";

let token;
beforeAll(async (done) => {
    token = await getTestUserToken();
    done();
});


describe("Authentication", () => {
    it("Cannot authenticate without auth header", async (done) => {
        let status;
        const mockReq = {
            headers: {}
        };
        const mockRes = {
            sendStatus: function (code) {
                status = code;
                return code
            }
        };
        let nextCalled = false;
        const next = function () { nextCalled = true }

        authenticated(mockReq, mockRes, next);
        expect(status).toEqual(401);
        done();
    });

    it("Cannot authenticate without correct header", async (done) => {
        let status;
        const mockReq = {
            headers: { authorization: 'basic 7654765765' }
        };
        const mockRes = {
            sendStatus: function (code) {
                status = code;
                return code
            }
        };
        let nextCalled = false;
        const next = function () { nextCalled = true }

        authenticated(mockReq, mockRes, next);
        expect(status).toEqual(403);
        done();
    });

    it("should authenticate", async (done) => {

        let status;
        const mockReq = {
            headers: { authorization: `basic ${token}` }
        };
        const mockRes = {
            sendStatus: function (code) {
                status = code;
                return code
            }
        };
        let nextCalled = false;
        const next = function () { nextCalled = true }

        authenticated(mockReq, mockRes, next);
        expect(nextCalled).toEqual(true);
        done();
    });

});



