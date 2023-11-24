import { vi } from "vitest";
import { Form } from ".";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { html } from "../../../test-support";
describe("form", () => {
  it("submits the form when you click the submit button", async () => {
    const submitHandler = vi.fn((event: Event) => event.preventDefault());
    render(html`<${Form} onSubmit=${submitHandler}><//>`);
    const submitButton = screen.getByRole("button", { name: "Submit" });
    await userEvent.click(submitButton);
    expect(submitHandler).toHaveBeenCalled();
  });

  it("action should be set correctly", () => {
    const submitHandler = vi.fn((event: Event) => event.preventDefault());

    render(html`<${Form} onSubmit=${submitHandler} action="foo"><//>`);
    const foundElement = document.querySelector("form");
    expect(foundElement?.getAttribute("action")).toEqual("foo");
  });
});
