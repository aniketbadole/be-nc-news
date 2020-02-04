process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = chai;
const request = require("supertest");
const app = require("../app");
const connection = require("../connection");
const chaiSorted = require("chai-sorted");

describe("app", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });

  describe("/api", () => {
    it("DELETE - 405 - Return an error 405 when other methods are requested'", () => {
      return request(app)
        .delete("/api")
        .expect(405)
        .then(result => {
          expect(result.body.msg).to.equal("Method Not Allowed");
        });
    });
    describe("/topics", () => {
      it("GET - 200 - Get a response from the server", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(result => {
            expect(result.body.topics).to.be.an("array");
            expect(result.body.topics[0]).to.be.an("object");
            expect(result.body.topics[0]).to.have.keys("description", "slug");
          });
      });
      it("POST - 405 - Return an error 405 when other methods are requested", () => {
        return request(app)
          .post("/api/topics")
          .send({ name: "Aniket" })
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
          });
      });
      it("PATCH - 405 - Return an error 405 when other methods are requested", () => {
        return request(app)
          .patch("/api/topics")
          .send({ name: "Aniket" })
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
          });
      });
      it("DELETE - 405 - Return an error 405 when other methods are requested", () => {
        return request(app)
          .delete("/api/topics")
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
          });
      });
    });
    describe("/users", () => {
      it("GET - 200 - Get a response from the server", () => {
        return request(app)
          .get("/api/users/icellusedkars")
          .expect(200)
          .then(res => {
            expect(res.body.user.username).to.eql("icellusedkars");
            expect(res.body.user.name).to.eql("sam");
            expect(res.body.user).to.contain.keys(
              "username",
              "avatar_url",
              "name"
            );
          });
      });
      it("GET - 200 - Get a response from the server with the right key 'user'", () => {
        return request(app)
          .get("/api/users/icellusedkars")
          .expect(200)
          .then(res => {
            expect(res.body).to.contain.keys("user");
          });
      });
      it("POST - 405 - Return an error 405 when other methods are requested", () => {
        return request(app)
          .post("/api/users")
          .send({ name: "Aniket" })
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
          });
      });
      it("PATCH - 405 - Return an error 405 when other methods are requested", () => {
        return request(app)
          .patch("/api/users")
          .send({ name: "Aniket" })
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
          });
      });
      it("DELETE - 405 - Return an error 405 when other methods are requested", () => {
        return request(app)
          .delete("/api/users")
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
          });
      });
      it("POST - 405 - Return an error 405 when other methods are requested with the parameter endpoint", () => {
        return request(app)
          .post("/api/users/butter_bridge")
          .send({ name: "Aniket" })
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
          });
      });
      it("PATCH - 405 - Return an error 405 when other methods are requested with the parameter endpoint", () => {
        return request(app)
          .patch("/api/users/butter_bridge")
          .send({ name: "Aniket" })
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
          });
      });
      it("DELETE - 405 - Return an error 405 when other methods are requested with the parameter endpoint", () => {
        return request(app)
          .delete("/api/users/butter_bridge")
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
          });
      });
      it("GET 404: Get an error from the server when a valid but non existent ID is passed", () => {
        return request(app)
          .get("/api/users/nonexistentid")
          .expect(404)
          .then(result => {
            expect(result.body.msg).to.equal("Not Found");
          });
      });
    });
    describe("/articles", () => {
      it("GET - 200 - Get a response from the server with a key called 'article", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(res => {
            expect(res.body).to.contain.keys("article");
          });
      });
      it("GET - 200 - Get a response from the server", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(res => {
            expect(res.body.article).does.not.contain.key("username");
          });
      });
    });
  });
});
