import {
  fireEvent,
  logRoles,
  prettyDOM,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { ExpensePage } from "../pages";

test("Test 1", () => {
  render(<ExpensePage />);
  fireEvent.click(screen.getByRole("button", { name: "remove message" }));
  console.log("Removed");
  const targetElement = screen.queryByText(/ExpensePage/i);
  expect(targetElement).not.toBeInTheDocument();
});

test("Test 2", () => {
  render(<ExpensePage />);
  const dis = screen.getByRole("button", { name: "Disabled Button" });
  expect(dis).toBeDisabled();
});

test("Test 3", async () => {
  render(<ExpensePage />);
  const dv = await screen.findByText("Data Found", {}, { timeout: 2000 });
  expect(dv).toBeInTheDocument();
  console.log(prettyDOM(dv))
  console.log(logRoles(dv))
  //Testing Playground
});
