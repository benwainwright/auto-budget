import { render, screen } from "@testing-library/svelte";
import { Field } from ".";
import { html } from "../../../test-support";

describe("field", () => {
  it("Should render the field prop in the field label and wire up the field to work with a nested input", () => {
    render(html`<${Field} name="thing" label="Test"><input id="thing" /><//>`);

    expect(screen.getByLabelText("Test")).toBeInTheDocument();
  });
});
