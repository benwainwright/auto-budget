import { getAuthwhitelist } from "$lib/auth-whitelist";
import { configureAmplify } from "$lib/aws/configure-amplify-server";
import { authorise } from "$lib/backend/monzo/authorise";
import { HTTP, TOKEN_COOKIE_NAME } from "$lib/constants";
import { HttpError } from "$lib/errors/http-error";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  if (getAuthwhitelist().includes(event.route.id ?? "")) {
    return await resolve(event);
  }

  configureAmplify();

  try {
    const authToken = event.cookies.get(TOKEN_COOKIE_NAME) ?? undefined;
    const code = event.url.searchParams.get("code") ?? undefined;
    const result = await authorise(authToken, code);

    if (!result.complete) {
      return new Response("Redirecting to Monzo", {
        status: HTTP.statusCodes.Found,
        headers: {
          [HTTP.headerNames.Location]: result.response.redirectUrl,
        },
      });
    }

    event.locals.monzoClient = result.client;
    event.locals.loggedIn = true;
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
