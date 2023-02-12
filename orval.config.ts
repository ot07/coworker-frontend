import { defineConfig } from "orval";

export default defineConfig({
  backend: {
    output: {
      mode: "tags-split",
      clean: true,
      target: "src/api/endpoints/api.ts",
      schemas: "src/api/model",
      client: "react-query",
      prettier: true,
      tsconfig: "tsconfig.json",
      override: {
        mutator: {
          path: "src/api/custom-instance.ts",
          name: "customInstance",
        },
      },
    },
    input: {
      target: "docs/api/swagger.yaml",
    },
  },
});
