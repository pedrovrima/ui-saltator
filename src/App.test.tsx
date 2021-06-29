import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", async () => {
  render(<App />);
  const linkElement = screen.getByText(/Bem Vindo/i);
  expect(linkElement).toBeInTheDocument();

  const startButton = screen.getByText("Comece já!");
  expect(startButton).toBeInTheDocument();
  await startButton.click();

  const loginText = screen.getByText("Login");
  expect(loginText).toBeInTheDocument();


});
