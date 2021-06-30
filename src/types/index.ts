export type Species = {
  id: number;
  genus: string;
  species: string;
  pt_name?: string;
  img?: Image[];
  score: number;
  points?: number;
  sounds?: Sounds[];
};

export type User = {
  id: number;
  email: string;
  name: string;
  user_decks: Deck[];
};

export type Image = {
  id: number;
  url: string;
  author: string;
};

export type Sounds = {
  id: number;
  // xeno_id: number;
  url:string;
  author: string;
};

export type Deck = {
  id: number;
  name: string;
  spp: Species[];
  active: boolean;
};
