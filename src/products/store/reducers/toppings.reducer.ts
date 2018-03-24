import { Topping } from "../../models/topping.model";
import * as fromToppingsActions from "../actions/toppings.actions";

export interface ToppingsState {
  loading: boolean;
  loaded: boolean;
  entities: { [id: number]: Topping };
  selectedToppings: number[];
}

export const initialState: ToppingsState = {
  loading: false,
  loaded: false,
  entities: {},
  selectedToppings: []
};

export function reducer(state = initialState, action: any): ToppingsState {
  switch (action.type) {
    case fromToppingsActions.VISUALIZE_TOPPINGS: {
      const selectedToppings = action.payload;

      return {
        ...state,
        selectedToppings
      };
    }

    case fromToppingsActions.LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromToppingsActions.LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromToppingsActions.LOAD_TOPPINGS_SUCCESS: {
      const toppings = action.payload;
      const entities = toppings.reduce(
        (entities: { [id: number]: Topping }, topping: Topping) => {
          return {
            ...entities,
            [topping.id]: topping
          };
        },
        {}
      );
      return {
        ...state,
        entities
      };
    }

    default: {
      return state;
    }
  }
}

export const getToppingLoaded = (state: ToppingsState) => state.loaded;
export const getToppingLoading = (state: ToppingsState) => state.loading;
export const getToppingEntities = (state: ToppingsState) => state.entities;
export const getToppingsSelected = (state: ToppingsState) =>
  state.selectedToppings;
