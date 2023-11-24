import { describe } from "vitest";
import { render, screen } from "@testing-library/svelte";
import { html } from "../../../test-support";

describe("Button", () => {
  it("Should render the button label in the slot", () => {
    render(html`<button>Test</button>`);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
