import { expect } from "chai";
import supertest from "supertest";

describe("text analyzer rest api check", function () {
  const baseUrl = "http://localhost:8081/api/v0";
  describe("api health check ", function () {
    it("should return Successfully 200 response on GET /health", async function () {
      const response = await supertest(baseUrl)
        .get("/health")
        .then((response) => {
          return response;
        });
      expect(response.statusCode).to.be.equal(200);
    });
  });

  describe("analyzer api data check ", function () {
    let response;
    before(async function () {
      const filepath = "./uploads/sampleFile.txt";
      response = await supertest(baseUrl)
        .post("/upload-file")
        .set("Content-Type", "multipart/form-data")
        .attach("sampleFile", filepath)
        .then((response) => {
          return response;
        });
    });

    it("should return Successfully the total number of words", async function () {
      expect(response?._body?.data?.wordCount).to.be.equal(16);
    });
    it("should return Successfully the total number of character Count with space", async function () {
      expect(response?._body?.data?.characterCount).to.be.equal(75);
    });
    it("should return Successfully the total number of paragraphs count", async function () {
      expect(response?._body?.data?.paraCount).to.be.equal(1);
    });
    it("should return Successfully the total number of sentenceCount count", async function () {
      expect(response?._body?.data?.sentenceCount).to.be.equal(2);
    });
    it("should return Successfully the total number of longest words", async function () {
      expect(response?._body?.data?.longestwords).to.be.equal("quick");
    });
  });
});
