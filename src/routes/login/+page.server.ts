import { fetchAuthSession, signIn, signOut } from "@aws-amplify/auth";
import type { Actions } from "../$types";
import { configureAmplify } from "$lib/aws/configure-amplify-server";
import type { LoginState } from "./login-state";
import { TOKEN_COOKIE_NAME } from "$lib/constants";

export const actions: Actions<LoginState> = {
  default: async (event) => {
    configureAmplify();
    const data = await event.request.formData();
    const username = data.get("username");
    const password = data.get("password");

    if (typeof username === "string" && typeof password === "string") {
      await signOut({ global: true });
      const result = await signIn({ username, password });
      if (result.isSignedIn) {
        const session = await fetchAuthSession();
        event.cookies.set(
          TOKEN_COOKIE_NAME,
          session.tokens?.accessToken.toString() ?? "",
        );

        return {
          token: session.tokens?.accessToken.toString() ?? "",
          state: "Success",
        };
      }
    }
    return { state: "Fail" };
  },
};
