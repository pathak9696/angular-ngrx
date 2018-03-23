import { Pizza } from "../../models/pizza.model";
import * as fromPizzaActions from "../actions/pizza.actions";

export interface PizzaState {
  loading: boolean;
  loaded: boolean;
  data: Pizza[];
}

const initialState: PizzaState = {
  loading: false,
  loaded: false,
  data: [
    {
      name: "Blazin' Inferno",
      toppings: [
        {
          id: 10,
          name: "pepperoni"
        },
        {
          id: 9,
          name: "pepper"
        },
        {
          id: 3,
          name: "basil"
        },
        {
          id: 4,
          name: "chili"
        },
        {
          id: 7,
          name: "olive"
        },
        {
          id: 2,
          name: "bacon"
        }
      ],
      id: 1
    }
  ]
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
      return {
        ...state,
        loading: false,
        loaded: true
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
export const getPizzasData = (state: PizzaState) => state.data;
