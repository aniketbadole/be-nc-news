const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("returns an empty array when passed an empty array", () => {
    expect(formatDates([])).to.eql([]);
  });
  it("returns a new array when passed an array with one object", () => {
    const input = [{ created_at: 1578928809262 }];
    const expected = [{ created_at: new Date(1578928809262) }];
    expect(formatDates(input)).to.eql(expected);
  });
  it("returns a new array when passed an array with multiple keys", () => {
    const input = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      }
    ];
    const expected = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        created_by: "tickle122",
        votes: -1,
        created_at: new Date(1468087638932)
      }
    ];
    expect(formatDates(input)).to.eql(expected);
  });
  it("returns an array when passed an array with multiple objects", () => {
    const input = [
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      },
      {
        title: "Student SUES Mitch!",
        topic: "mitch",
        author: "rogersop",
        body:
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: 1163852514171
      },
      {
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: 1037708514171
      }
    ];
    const expected = [
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: new Date(1289996514171)
      },
      {
        title: "Student SUES Mitch!",
        topic: "mitch",
        author: "rogersop",
        body:
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: new Date(1163852514171)
      },
      {
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: new Date(1037708514171)
      }
    ];
    expect(formatDates(input)).to.eql(expected);
  });
});

describe("makeRefObj", () => {
  it("returns an empty array when passed an empty object", () => {
    expect(makeRefObj([])).to.eql({});
  });
  it("returns an object with one key value pair of title and article_id", () => {
    const input = [{ article_id: 1, title: "A" }];
    const expected = { A: 1 };
    expect(makeRefObj(input)).to.eql(expected);
  });
  it("returns an object with multiple key value pairs of title and article_id", () => {
    const input = [
      { article_id: 1, title: "A" },
      { article_id: 2, title: "B" },
      { article_id: 3, title: "C" }
    ];
    const expected = { A: 1, B: 2, C: 3 };
    expect(makeRefObj(input)).to.eql(expected);
  });
});

describe.only("formatComments", () => {
  it("returns an empty array when given an empty array", () => {
    expect(formatComments([])).to.eql([]);
  });
  it("returns an array with author and article_id when passed an array with one object", () => {
    const input = [
      {
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge"
      }
    ];
    const refObj = {
      "They're not exactly dogs, are they?": 1
    };
    const expected = [
      {
        article_id: 1,
        author: "butter_bridge"
      }
    ];
    expect(formatComments(input, refObj)).to.eql(expected);
  });
});
