// @ts-expect-error
import html from "svelte-htm";
export const htmlWrapper = (strings: TemplateStringsArray) => {
  return html(strings);
};
