import { fireEvent, render, screen } from "@testing-library/react";
import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import bcrypt from "bcryptjs-react";
import { expect, test, vitest } from "vitest";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vitest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vitest.fn(),
      removeListener: vitest.fn(),
      addEventListener: vitest.fn(),
      removeEventListener: vitest.fn(),
      dispatchEvent: vitest.fn(),
    })),
  });

  localStorage.setItem(
    "auth",
    JSON.stringify([
      {
        username: "Aditya",
        password: bcrypt.hashSync("123", "$2a$10$CwTycUXWue0Thq9StjUM0u"),
      },
    ])
  );

  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );

  const username = screen.getByRole("textbox", { name: /username/i });
  fireEvent.change(username, { target: { value: "Aditya" } });
  const password = screen.getByRole("textbox", { name: /password/i });
  fireEvent.change(password, { target: { value: "123" } });
  const loginBtn = screen.getByRole("button", { name: /login/i });
  fireEvent.click(loginBtn);
});

test("renders expense tracker", () => {
  const heading = screen.getByText(/Expense Tracker/i);
  expect(heading).toBeInTheDocument();
  const btn = screen.getByRole("button", { name: "Add" });
  expect(btn).toBeInTheDocument();
});