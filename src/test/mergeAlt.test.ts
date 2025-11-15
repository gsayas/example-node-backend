import mergeAlt from "../playground/mergeAlt";

describe("mergeAlternately", () => {
  it("should merge two words alternately", () => {
    expect(mergeAlt("abc", "def")).toBe("adbecf");
  });
});
