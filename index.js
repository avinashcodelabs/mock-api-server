import { Server, Model } from "miragejs";

const startServer = ({ ignoreHosts = [], logging = false } = {}) => {
  const defaultHostsToIgnore = [
    "https://jsonplaceholder.typicode.com/**",
    "https://my-json-server.typicode.com/**",
  ];
  let server = new Server({
    models: {
      product: Model,
    },

    seeds(server) {
      server.create("product", {
        name: "Shoes",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 1.05,
        imgUrl: "https://picsum.photos/id/21/300/200",
      });
      server.create("product", {
        name: "Phone",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 10.99,
        imgUrl: "https://picsum.photos/id/63/300/200",
      });
      server.create("product", {
        name: "MacBook",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 1199,
        imgUrl: "https://picsum.photos/id/48/300/200",
      });
      server.create("product", {
        name: "A Dress",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 14000,
        imgUrl: "https://picsum.photos/id/823/300/200",
      });
      server.create("product", {
        name: "Karvalo - The Book",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 150,
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

      this.passthrough();
      this.passthrough(...[...defaultHostsToIgnore, ...ignoreHosts]);
    },
  });

  return server;
};

export { startServer };