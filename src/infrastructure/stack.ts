import { type StackContext, Cognito } from "sst/constructs";
import { SvelteKitSite } from "sst/constructs";
import bucketDeployment from "aws-cdk-lib/aws-s3-deployment";
import type { AppConfig } from "../app-config";
import { CONFIG_FILENAME } from "$lib/constants";

export const AutoBudgetStack = ({ stack, app }: StackContext) => {
  const site = new SvelteKitSite(stack, "auto-budget-site", {
    path: "./",
  });

  const cognito = new Cognito(stack, "auto-budget-auth", {});

  const config: AppConfig = {
    userpoolId: cognito.cdk.userPool.userPoolId,
  };

  const destinationBucket = site.cdk?.bucket;
  if (destinationBucket) {
    new bucketDeployment.BucketDeployment(stack, "auto-budget-deploy-config", {
      destinationBucket,
      sources: [bucketDeployment.Source.jsonData(CONFIG_FILENAME, config)],
    });
  }

  // Add the site's URL to stack output
  stack.addOutputs({
    URL: site.url,
  });
};
