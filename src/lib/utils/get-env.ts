import type { ENV_VAR_NAMES, EnvironmentVariableName } from "$lib/constants";

export const getEnv = (name: EnvironmentVariableName): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`process.env.${name} was not configured`);
  }

  return value;
};
