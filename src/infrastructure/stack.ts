import { type StackContext, Cognito } from "sst/constructs";
import { SvelteKitSite } from "sst/constructs";
import bucketDeployment from "aws-cdk-lib/aws-s3-deployment";
import type { AppConfig } from "../app-config";
import { COGNITO, CONFIG_FILENAME, ENV_VAR_NAMES } from "$lib/constants";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { StringAttribute } from "aws-cdk-lib/aws-cognito";

export const AutoBudgetStack = ({ stack, app }: StackContext) => {
  const monzoClientId = new Secret(stack, "monzo-client-id-secret", {
    secretName: "auto-budget/monzo-client-id",
  });

  const monzoClientSecret = new Secret(stack, "monzo-client-secret-secret", {
    secretName: "auto-budget/monzo-client-secret",
  });

  const monzoRedirectUrl = new Secret(
    stack,
    "monzo-client-redirect-url-secret",
    {
      secretName: "auto-budget/monzo-redirect-url",
    },
  );

  const cognito = new Cognito(stack, "auto-budget-auth", {
    cdk: {
      userPool: {
        customAttributes: {
          [COGNITO.customFields.userId]: new StringAttribute({ mutable: true }),
          [COGNITO.customFields.accessToken]: new StringAttribute({
            mutable: true,
          }),
          [COGNITO.customFields.expiresIn]: new StringAttribute({
            mutable: true,
          }),
          [COGNITO.customFields.expiresAt]: new StringAttribute({
            mutable: true,
          }),
          [COGNITO.customFields.refreshToken]: new StringAttribute({
            mutable: true,
          }),
        },
        autoVerify: {
          email: true,
        },
      },
    },
  });

  const site = new SvelteKitSite(stack, "auto-budget-site", {
    path: "./",
    environment: {
      [ENV_VAR_NAMES.CognitoUserPoolId]: cognito.cdk.userPool.userPoolId,

      [ENV_VAR_NAMES.CongitoClientId]:
        cognito.cdk.userPoolClient.userPoolClientId,
    },
  });

  const config: AppConfig = {
    userpoolId: cognito.cdk.userPool.userPoolId,
    userPoolClientId: cognito.cdk.userPoolClient.userPoolClientId,
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
