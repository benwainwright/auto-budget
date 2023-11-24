// @ts-expect-error
import html from "svelte-htm";
export const htmlWrapper = (
  strings: TemplateStringsArray,
  ...args: unknown[]
) => {
  return html(strings, ...args);
};
