import { render } from "@testing-library/svelte";
import { html } from "../../../test-support";
import { HiddenField } from ".";

describe("hidden-field", () => {
  it("should wire up the name and value correctly to work with the hidden field", () => {
    render(html`<${HiddenField} name="foo" value="bar">Test<//>`);
    const element = document.querySelector("input");
    expect(element?.getAttribute("name")).toEqual("foo");
    expect(element?.getAttribute("value")).toEqual("bar");
    expect(element?.getAttribute("type")).toEqual("hidden");
  });
});
