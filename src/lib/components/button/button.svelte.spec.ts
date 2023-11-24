import { describe } from "vitest";
import { render, screen } from "@testing-library/svelte";
import { html } from "../../../test-support";
import Button from "./button.svelte";

describe("Button", () => {
  it("Should render the button label in the slot", () => {
    render(html`<${Button}>Test<//>`);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should pass in the correct type", () => {
    render(html`<${Button} type="reset">Test</button>`);
    const component = document.querySelector("button");
    expect(component?.getAttribute("type")).toEqual("reset");
  });

  it("should default type to 'button'", () => {
    render(html`<${Button}>Test</button>`);
    const component = document.querySelector("button");
    expect(component?.getAttribute("type")).toEqual("button");
  });
});
