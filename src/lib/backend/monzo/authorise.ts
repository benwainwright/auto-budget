import { getClient } from "./get-client";
import { verifyJwtToken } from "$lib/jwt-verify";
import { ApplicationError } from "$lib/errors/application-error";
import type { MonzoAPI } from "@otters/monzo";
import { HttpError } from "$lib/errors/http-error";
import { ENV_VAR_NAMES, HTTP } from "$lib/constants";
import { getEnv } from "$lib/utils/get-env";

type AuthResponse =
  | {
      client: MonzoAPI;
      complete: true;
    }
  | {
      complete: false;
      response: { redirectUrl: string };
    };

export const authorise = async (
  token?: string | null,
  code?: string | null,
  refresh?: boolean,
): Promise<AuthResponse> => {
  if (!token) {
    throw new HttpError("Please supply token", HTTP.statusCodes.BadRequest);
  }

  const awsRegion = getEnv(ENV_VAR_NAMES.AwsRegion);
  const awsPoolId = getEnv(ENV_VAR_NAMES.CognitoUserPoolId);

  const { isValid, error, userName } = await verifyJwtToken({
    token,
    awsRegion,
    awsPoolId,
  });

  if (!isValid) {
    throw new HttpError(
      "Invalid client credentials",
      HTTP.statusCodes.Forbidden,
    );
  }

  const client = await getClient(userName, code, refresh);

  if ("redirectUrl" in client) {
    return {
      complete: false,
      response: { redirectUrl: client.redirectUrl },
    };
  }
  return { complete: true, client };
};
