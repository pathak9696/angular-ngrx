import { Pizza } from "../../models/pizza.model";
import * as fromPizzaActions from "../actions/pizza.actions";

export interface PizzaState {
  loading: boolean;
  loaded: boolean;
  entities: { [id: number]: Pizza };
}

const initialState: PizzaState = {
  loading: false,
  loaded: false,
  entities: {}
};

export function reducer(state = initialState, action: any): PizzaState {
  switch (action.type) {
    case fromPizzaActions.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromPizzaActions.LOAD_PIZZAS_SUCCESS: {
      const pizzas = action.payload;
      const entities = pizzas.reduce(
        (entities: { [id: number]: Pizza }, pizza: Pizza) => {
          return {
            ...entities,
            [pizza.id]: pizza
          };
        },
        {}
      );
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    case fromPizzaActions.LoadPizzasFail: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}

export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzaEntities = (state: PizzaState) => state.entities;
