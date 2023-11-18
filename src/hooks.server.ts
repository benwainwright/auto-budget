import { authWhitelist } from "$lib/auth-whitelist";
import { authorise } from "$lib/backend/monzo/authorise";
import { HTTP } from "$lib/constants";
import { HttpError } from "$lib/errors/http-error";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  if (authWhitelist.includes(event.route.id ?? "")) {
    return await resolve(event);
  }
  try {
    const authToken = event.request.headers.get("authorization");
    const result = await authorise(authToken);

    if (!result.complete) {
      return new Response("Redirecting to Monzo", {
        status: HTTP.statusCodes.Found,
        headers: {
          Location: result.response.redirectUrl,
        },
      });
    }
  } catch (error) {
    if (error instanceof HttpError) {
      return new Response("Redirecting to login page", {
        status: HTTP.statusCodes.Found,
        headers: {
          Location: "/login",
        },
      });
    }
    throw error;
  }
  return await resolve(event);
};
