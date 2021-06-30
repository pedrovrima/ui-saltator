import Options from "./options";
import { render, screen, fireEvent } from "@testing-library/react";

const options = [
  { genus: "a", species: "b", pt_name: "abb", correct: false },
  { genus: "a", species: "a", pt_name: "aaa", correct: false },
  { genus: "a", species: "c", pt_name: "acc", correct: true },
];

test("options", async () => {
  render(<Options options={options} />);
  const button = screen.getAllByTestId("a a")[0];
  const button2 = screen.getAllByTestId("a b")[0];

  expect(screen.getByText("a b")).toBeInTheDocument();
  expect(screen.getByText("a c")).toBeInTheDocument();
  expect(screen.getByText("a a")).toBeInTheDocument();

  expect(button).toBeEnabled();
  expect(button2).toBeEnabled();

  await fireEvent.click(button);
  expect(button).toBeDisabled();
  expect(button2).toBeDisabled();
});
