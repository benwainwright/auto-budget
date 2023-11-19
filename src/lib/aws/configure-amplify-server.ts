import { COGNITO, ENV_VAR_NAMES } from "$lib/constants";
import { getEnv } from "$lib/utils/get-env";
import type { AuthConfig } from "@aws-amplify/core";
import { Amplify } from "aws-amplify";

export const configureAmplify = () => {
  const userPoolId = getEnv(ENV_VAR_NAMES.CognitoUserPoolId);
  const userPoolClientId = getEnv(ENV_VAR_NAMES.CongitoClientId);
  const config: AuthConfig = {
    Cognito: {
      userPoolId,
      userPoolClientId,
    },
  };
  Amplify.configure({ Auth: config });
};
