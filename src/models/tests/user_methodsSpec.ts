import { userStore } from "../user_methods";

const our_user = new userStore();

describe("user methods", () => {
  it("Should has an index method", () => {
    expect(our_user.index).toBeDefined();
  });
  it("index method Should return a list of users", async () => {
    const output = await our_user.index();
    expect(output).toEqual([]);
  });
});
