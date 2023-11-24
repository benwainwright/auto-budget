import { render, screen } from "@testing-library/svelte";
import { html } from "../../../test-support";
import { HeadingTwo } from ".";

describe("heading-two", () => {
  it("correctly renders slot content", () => {
    render(html`<${HeadingTwo}>Test<//>`);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
