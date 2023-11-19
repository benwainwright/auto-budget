import {
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import { getAttributeValue } from "./get-attribute-value";
import { COGNITO, ENV_VAR_NAMES } from "$lib/constants";
import { getEnv } from "$lib/utils/get-env";

export const getCredentials = async (username: string) => {
  const userPoolId = getEnv(ENV_VAR_NAMES.CognitoUserPoolId);

  const cognito = new CognitoIdentityProviderClient({
    region: getEnv(ENV_VAR_NAMES.AwsRegion),
  });

  const userResult = await cognito.send(
    new AdminGetUserCommand({
      UserPoolId: userPoolId,
      Username: username,
    }),
  );

  const attributes = userResult.UserAttributes;

  const accessToken = getAttributeValue(
    attributes,
    COGNITO.customFields.accessToken,
  );
  const refreshToken = getAttributeValue(
    attributes,
    COGNITO.customFields.refreshToken,
  );

  return { accessToken, refreshToken };
};
