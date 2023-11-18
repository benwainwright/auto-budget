import { getClient } from "./get-client";
import { verifyJwtToken } from "$lib/jwt-verify";
import { ApplicationError } from "$lib/errors/application-error";
import type { MonzoAPI } from "@otters/monzo";
import { HttpError } from "$lib/errors/http-error";
import { HTTP } from "$lib/constants";

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
  code?: string,
  refresh?: boolean
): Promise<AuthResponse> => {
  if (!token) {
    throw new HttpError("Please supply token", HTTP.statusCodes.BadRequest);
  }

  const { isValid, error, userName } = await verifyJwtToken({ token });

  if (!isValid) {
    throw new HttpError(
      "Invalid client credentials",
      HTTP.statusCodes.Forbidden
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
