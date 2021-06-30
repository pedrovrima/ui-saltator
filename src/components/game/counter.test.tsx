import Counter from "./counter";
import { render, screen } from "@testing-library/react";

test("options", async () => {
  render(<Counter total={10} this_position={2} />);
  expect(screen.getByText("2/10")).toBeInTheDocument();
});
