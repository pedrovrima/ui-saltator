import { useEffect, useContext } from "react";
import { contextType, Context } from "../context";

export default function Loading() {
  const { setStudySpp } = useContext(Context) as contextType;
  useEffect(() => {
    setStudySpp([
      {
        score: 0,
        id: 1,
        genus: "a",
        species: "b",
        sounds: [
          {
            id: 1,
            author: "John doe",
            url: "https://actions.google.com/sounds/v1/animals/owl_hooting.ogg",
          },
          {
            id: 2,
            author: "John doe",
            url: "https://actions.google.com/sounds/v1/animals/owl_hooting.ogg",
          },
          {
            id: 3,
            author: "John doe",
            url: "https://actions.google.com/sounds/v1/animals/owl_hooting.ogg",
          },
        ],
      },
      {
        score: 0,
        id: 2,
        genus: "c",
        species: "d",
        sounds: [
          {
            id: 1,
            author: "John doe",
            url: "https://actions.google.com/sounds/v1/animals/owl_hooting.ogg",
          },
          {
            id: 2,
            author: "John doe",
            url: "https://actions.google.com/sounds/v1/animals/owl_hooting.ogg",
          },
          {
            id: 3,
            author: "John doe",
            url: "https://actions.google.com/sounds/v1/animals/owl_hooting.ogg",
          },
        ],
      },
      {
        score: 0,
        id: 3,
        genus: "e",
        species: "f",
        sounds: [
          {
            id: 1,
            author: "John doe",
            url: "https://actions.google.com/sounds/v1/animals/owl_hooting.ogg",
          },
          {
            id: 2,
            author: "John doe",
            url: "https://actions.google.com/sounds/v1/animals/owl_hooting.ogg",
          },
          {
            id: 3,
            author: "John doe",
            url: "https://actions.google.com/sounds/v1/animals/owl_hooting.ogg",
          },
        ],
      },
      {
        score: 0,
        id: 4,
        genus: "g",
        species: "h",
        sounds: [
          {
            id: 1,
            author: "John doe",
            url: "https://actions.google.com/sounds/v1/animals/owl_hooting.ogg",
          },
          {
            id: 2,
            author: "John doe",
            url: "https://actions.google.com/sounds/v1/animals/owl_hooting.ogg",
          },
          {
            id: 3,
            author: "John doe",
            url: "https://actions.google.com/sounds/v1/animals/owl_hooting.ogg",
          },
        ],
      },
    ]);
  }, []);
  return <>loading...</>;
}
