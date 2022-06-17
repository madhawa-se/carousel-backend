import app from "../index";
import request from "supertest";

export const getTestUserToken = () => {
    return new Promise((resolve, reject) => {
        request(app)
            .post('/api/v1/sessions')
            .send({
                email: "testmail1@mail.com",
                password: "987654abc"
            }).end(onResponse);

        function onResponse(err, res) {
            if (err) return reject(err)
            const token = res.body.token;
            resolve(token);
        }
    });
}

