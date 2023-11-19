import type { Actions } from "./$types";
import { fetchAuthSession, signUp, confirmSignUp } from "@aws-amplify/auth";
import type { RegisterState } from "./register-state";

export const actions: Actions<RegisterState> = {
  start: async (event): Promise<RegisterState> => {
    const data = await event.request.formData();
    const username = data.get("username");
    const password = data.get("password");
    const email = data.get("email");
    const verifyPassword = data.get("verifyPassword");

    if (
      password === verifyPassword &&
      typeof username === "string" &&
      typeof password === "string" &&
      typeof email === "string"
    ) {
      const result = await signUp({
        username,
        password,
        options: { userAttributes: { email } },
      });
      console.log(result);
      if (result.isSignUpComplete) {
        return { state: "Success" };
      } else if (result.nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        return { state: "VerifyCode", username };
      }
    }
    return { state: "Fail" };
  },

  verify: async (event) => {
    const data = await event.request.formData();
    const username = data.get("username");
    const confirmationCode = data.get("code");

    if (typeof username === "string" && typeof confirmationCode === "string") {
      await fetchAuthSession();
      await confirmSignUp({ username, confirmationCode });
      return { state: "Success" };
    }
    return { state: "VerifyFail" };
  },
};
