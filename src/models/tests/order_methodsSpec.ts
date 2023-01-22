import order_model from "../order_methods";

const store = new order_model();

describe("order Model", () => {
  it("should have an index method", () => {
    expect(store.get_all_orders).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.get_specific_order).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a update method", () => {
    expect(store.update_order).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("create method should add a order", async () => {
    const result = await store.create({
      status: "completed",
      user_id: "1",
    });
    expect(result).toEqual({
      id: "1",
      status: "completed",
      user_id: "1",
    });
  });

  it("index method should return a list of orders", async () => {
    const result = await store.get_all_orders();
    expect(result).toEqual([
      {
        id: "1",
        status: "completed",
        user_id: "1",
      },
    ]);
  });

  it("show method should return the correct order", async () => {
    const result = await store.get_specific_order("1");
    expect(result).toEqual({
      id: "1",
      status: "completed",
      user_id: "1",
    });
  });

  it("delete method should remove the order", async () => {
    // store.delete();
    const result = await store.delete("1");

    expect(result).toContain([]);
  });
});
