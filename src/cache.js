import { InMemoryCache } from "@apollo/client";

const inMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemons: {
          keyArgs: false,
          merge(existing, incoming) {
            let results = [];
            if (existing && existing.results) {
              results = results.concat(existing.results);
            }
            if (incoming && incoming.results) {
              results = results.concat(incoming.results);
            }
            return {
              // merge results array to incoming object
              ...incoming,
              results,
            };
          },
        },
      },
    },
  },
});

export { inMemoryCache };
