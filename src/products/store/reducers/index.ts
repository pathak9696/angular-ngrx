import * as fromPizzaReducer from "./pizza.reducer";
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";

export interface ProductsState {
  pizzas: fromPizzaReducer.PizzaState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzaReducer.reducer
};

export const getProducts = createFeatureSelector("products");

export const getPizzasState = createSelector(
  getProducts,
  (state: ProductsState) => state.pizzas
);

export const getPizzaEntities = createSelector(
  getPizzasState,
  fromPizzaReducer.getPizzaEntities
);

// {1: {id: 1, name: 'x'}, 2: {id: 2, name: 'y'}}
// [{id: 1, name: 'x'}, {id: 2, name: 'y}]
export const getAllPizzas = createSelector(getPizzaEntities, entities =>
  Object.keys(entities).map(id => entities[+id])
);

export const getPizzasLoading = createSelector(
  getPizzasState,
  fromPizzaReducer.getPizzasLoading
);
export const getPizzasLoaded = createSelector(
  getPizzasState,
  fromPizzaReducer.getPizzasLoaded
);
