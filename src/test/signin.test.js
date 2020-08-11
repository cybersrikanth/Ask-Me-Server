const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const connect = require("../database/connect");
const app = require("../index");
chai.use(chaiHttp);

describe("[SIGNIN] /auth", () => {
    before((done) => {
        connect()
            .then(() => {
                console.log("db connected");
                done();
            })
            .catch((err) => done(err));
    });

    it("it should GET a message", (done) => {
        chai.request(app)
            .post("/api/auth/signin")
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.a("object");
                done();
            });
    });
});
