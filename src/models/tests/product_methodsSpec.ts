import product_model from "../product_methods";

const store = new product_model();

describe("product Model", () => {
  it("should have an index method", () => {
    expect(store.get_all_products).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.get_specific_product).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a update method", () => {
    expect(store.update_product).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("create method should add a product", async () => {
    const result = await store.create({
      name: "Bridge to Terabithia",
      price: 250,
    });
    expect(result).toEqual({
      id: "1",
      name: "Bridge to Terabithia",
      price: 250,
    });
  });

  it("index method should return a list of products", async () => {
    const result = await store.get_all_products();
    expect(result).toEqual([
      {
        id: "1",
        name: "Bridge to Terabithia",
        price: 250,
      },
    ]);
  });

  it("show method should return the correct product", async () => {
    const result = await store.get_specific_product("1");
    expect(result).toEqual({
      id: "1",
      name: "Bridge to Terabithia",
      price: 250,
    });
  });

  it("delete method should remove the product", async () => {
    // store.delete();
    const result = await store.delete("1");

    expect(result).toContain([]);
  });
});
