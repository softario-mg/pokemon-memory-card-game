export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

export interface Card {
  id: number;
  pokemonId: number;
  name: string;
  image: string;
  shinyImage: string;
  types: string[];
  stats: {
    [key: string]: number;
  };
  isFlipped: boolean;
  isMatched: boolean;
} 