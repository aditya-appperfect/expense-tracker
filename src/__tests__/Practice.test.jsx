import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Practice from "../pages/Practice";
import userEvent from "@testing-library/user-event";

test("Test 1", async () => {
  render(<Practice />);
  await userEvent.click(screen.getByRole("button", { name: "remove message" }));
  console.log("Removed");
  const targetElement = screen.queryByText(/ExpensePage/i);
  expect(targetElement).not.toBeInTheDocument();
});

test("Test 2", () => {
  render(<Practice />);
  const dis = screen.getByRole("button", { name: "Disabled Button" });
  expect(dis).toBeDisabled();
});

test("Test 3", async () => {
  render(<Practice />);
  const country = await screen.findByText("List of countries");
  expect(country).toBeInTheDocument();
  const li = await screen.findAllByRole("listitem", {}, { timeout: 2000 });
  expect(li).toHaveLength(250);
});
