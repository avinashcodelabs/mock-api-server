import { Server, Model, RestSerializer } from "miragejs";

const startServer = ({ ignoreHosts = [], logging = false } = {}) => {
  const defaultHostsToIgnore = [
    "https://jsonplaceholder.typicode.com/**",
    "https://my-json-server.typicode.com/**",
  ];

  const mockApplicationSerializer = RestSerializer.extend({
    root: false,
    embed: true,
    include: [],
  });

  let server = new Server({
    serializers: {
      application: mockApplicationSerializer,
    },
    models: {
      product: Model,
    },

    seeds(server) {
      server.create("product", {
        name: "Shoes",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 10.5,
        imgUrl: "https://picsum.photos/id/21/300/200",
      });
      server.create("product", {
        name: "Phone",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 20.5,
        imgUrl: "https://picsum.photos/id/63/300/200",
      });
      server.create("product", {
        name: "MacBook",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 30.5,
        imgUrl: "https://picsum.photos/id/48/300/200",
      });
      server.create("product", {
        name: "A Dress",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 40.5,
        imgUrl: "https://picsum.photos/id/823/300/200",
      });
      server.create("product", {
        name: "Karvalo - The Book",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 50,
        imgUrl: "https://picsum.photos/id/464/300/200",
      });
    },

    routes() {
      this.logging = logging;
      this.namespace = "api";
      this.timing = 750;
      this.urlPrefix = "http://api.avinashcodelabs.com";

      this.get("/products", (schema) => {
        return schema.products.all();
      });

      this.get("/products/:id", (schema, request) => {
        return schema.products.find(request.params.id);
      });

      this.post(
        "/products",
        (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          return schema.products.create(attrs);
        }
        // { timing: 2000 }
      );

      this.put("/products/:id", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.products.find(request.params.id).update(attrs);
      });

      this.delete("/products/:id", (schema, request) => {
        return schema.products.find(request.params.id).destroy();
      });

      this.passthrough();
      this.passthrough(...[...defaultHostsToIgnore, ...ignoreHosts]);
    },
  });

  return server;
};

export { startServer };
