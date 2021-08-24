export type Species = {
  deck_id?: number
  id: number;
  genus: string;
  species: string;
  pt_common_name?: string;
  image?: Image[];
  score: number;
  points?: number;
  sounds?: Sounds[];
};

export type User = {
  id: number;
  email?: string;
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
  xeno_id:string;
  author: string;
};

export type Deck = {
  id: number;
  type: string;
  spp: Species[];
  active: boolean;
};
