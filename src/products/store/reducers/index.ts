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
export const getAllPizzas = createSelector(
  getPizzasState,
  fromPizzaReducer.getPizzasData
);
export const getPizzasLoading = createSelector(
  getPizzasState,
  fromPizzaReducer.getPizzasLoading
);
export const getPizzasLoaded = createSelector(
  getPizzasState,
  fromPizzaReducer.getPizzasLoaded
);
