import type { SSTConfig } from "sst";
import { AutoBudgetStack } from "./src/infrastructure/stack";

export default {
  config(input) {
    return {
      name: "auto-budget",
      region: "eu-west-2",
    };
  },
  stacks(app) {
    app.stack(AutoBudgetStack);
  },
} satisfies SSTConfig;
