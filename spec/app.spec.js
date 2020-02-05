process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = chai;
const request = require("supertest");
const app = require("../app");
const connection = require("../connection");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);

describe("app", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });

  describe("/api", () => {
    it("DELETE - 405 - Return an error 405 when other methods are requested", () => {
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
          .then(result => {
            expect(result.body.user.username).to.eql("icellusedkars");
            expect(result.body.user.name).to.eql("sam");
            expect(result.body.user).to.contain.keys(
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
          .then(result => {
            expect(result.body).to.contain.keys("user");
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
    describe("/articles/:article_id", () => {
      it("GET - 200 - Get a response from the server with a key called 'article'", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(result => {
            expect(result.body).to.contain.keys("article");
          });
      });
      it("GET - 200 - Get a response from the server", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(result => {
            expect(result.body.article).does.not.contain.key("username");
            expect(result.body).to.be.an("object");
            expect(result.body.article).to.be.an("object");
          });
      });
      it("GET - 200 - Has a votes_count key", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(result => {
            expect(result.body.article).to.contain.key("comment_count");
            expect(result.body.article.comment_count).to.equal("13");
          });
      });
      it("GET - 200 - Has comment_count and votes keys", () => {
        return request(app)
          .get("/api/articles/2")
          .expect(200)
          .then(result => {
            // console.log(res.body);
            expect(result.body.article.comment_count).to.equal("0");
            expect(result.body.article.votes).to.equal(0);
          });
      });
      it("GET - 400 - Get an error from the server when an invalid ID is passed", () => {
        return request(app)
          .get("/api/articles/nonexistent")
          .expect(400)
          .then(result => {
            expect(result.body.msg).to.equal("Invalid Query");
          });
      });
      it("GET - 404 - Get an error from the server when a valid but non existent ID is passed", () => {
        return request(app)
          .get("/api/articles/987654321")
          .expect(404)
          .then(result => {
            expect(result.body.msg).to.equal("Not Found");
          });
      });
      it("PATCH - 200 - Responds with incremented votes", () => {
        return request(app)
          .patch("/api/articles/2")
          .send({ inc_votes: 100 })
          .then(result => {
            expect(result.body.article).to.contain.key("votes");
            expect(result.body.article.votes).to.equal(100);
          });
      });
      it("PATCH - 200 - Responds with decremented votes", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: -50 })
          .then(result => {
            expect(result.body.article).to.contain.key("votes");
            expect(result.body.article.votes).to.equal(50);
          });
      });
      it("POST - 405 - Return an error 405 when other methods are requested with the parameter endpoint", () => {
        return request(app)
          .post("/api/articles/1")
          .send({ name: "Aniket" })
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
          });
      });
      it("DELETE - 405 - Return an error 405 when other methods are requested with the parameter endpoint", () => {
        return request(app)
          .delete("/api/articles/2")
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
          });
      });
    });
    describe("/articles/:article_id/comments", () => {
      it("POST - 200 - Get a response from the server", () => {
        return request(app)
          .post("/api/articles/2/comments")
          .send({ username: "icellusedkars", body: "this is a comment" })
          .then(result => {
            expect(result.body).to.have.keys("comment");
            expect(result.body.comment).to.contain.keys("body", "comment_id");
          });
      });
      it("POST - 404 - Return error 404 when a valid but non existent ID is passed", () => {
        return request(app)
          .post("/api/articles/987654321/comments")
          .send({ username: "icellusedkars", body: "this is a comment" })
          .expect(404)
          .then(result => {
            expect(result.body.msg).to.equal("Not Found");
          });
      });
      it("POST - 400 - Return an error from the server when an invalid ID is passed", () => {
        return request(app)
          .post("/api/articles/nonexistent/comments")
          .expect(400)
          .then(result => {
            expect(result.body.msg).to.equal("Invalid Query");
          });
      });
      it("GET - 200 - Responds with an array of comments by article_id", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(result => {
            expect(result.body.length).to.equal(13);
            expect(result.body[0].article_id).to.eql(1);
            expect(result.body[0]).to.contain.keys("comment_id");
          });
      });
      it("GET - 404 - Return error 404 when a valid but non existent ID is passed", () => {
        return request(app)
          .get("/api/articles/987654321/comments")
          .expect(404)
          .then(result => {
            expect(result.body.msg).to.equal("Not Found");
          });
      });
      it("GET - 400 - Return an error from the server when an invalid ID is passed", () => {
        return request(app)
          .get("/api/articles/nonexistent/comments")
          .expect(400)
          .then(result => {
            expect(result.body.msg).to.equal("Invalid Query");
          });
      });
      it("GET - 200 - Get a response from the server when a query is passed", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=created_at")
          .expect(200)
          .then(result => {
            console.log(result.body);
            expect(result.body).to.be.sortedBy("created_at", {
              descending: true
            });
          });
      });
      it("GET - 200 - Get a response from the server when a query is passed", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=votes")
          .expect(200)
          .then(result => {
            console.log(result.body);
            expect(result.body).to.be.sortedBy("votes", {
              descending: true
            });
          });
      });
      it("GET - 200 - Get a response from the server when a query is passed", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=votes&order=asc")
          .expect(200)
          .then(result => {
            console.log(result.body);
            expect(result.body).to.be.sortedBy("votes");
          });
      });
      it("PATCH - 405 - Return an error 405 when other methods are requested", () => {
        return request(app)
          .patch("/api/articles/1/comments")
          .send({ name: "Aniket" })
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
          });
      });
      it("DELETE - 405 - Return an error 405 when other methods are requested", () => {
        return request(app)
          .delete("/api/articles/2/comments")
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Allowed");
          });
      });
    });
    describe.only("/articles", () => {
      it("GET - 200 - Get a response from the server", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(result => {
            console.log(result.body);
            expect(result.body[0]).to.contain.keys(
              "article_id",
              "title",
              "author",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
          });
      });
    });
  });
});