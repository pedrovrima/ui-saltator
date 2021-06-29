import { render, screen } from "@testing-library/react";
import SpeciesList from "./spp_list";

describe("specie-list", () => {
  const spp = [
    { score: 2, genus: "a", species: "a" },
    { score: 1, genus: "a", species: "b" },
    { score: 4, genus: "a", species: "c" },
    { score: 5, genus: "a", species: "d" },
  ];
  test("renders App component", () => {
    render(<SpeciesList visible={true} spp={spp} />);
    expect(screen.getByText("a a")).toBeInTheDocument()
    expect(screen.getByText("a b")).toBeInTheDocument()
    expect(screen.getByText("1")).toBeInTheDocument()    
    expect(screen.getByText("2")).toBeInTheDocument()
});
});
