import * as fromPizzaReducer from "./pizza.reducer";
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

export interface ProductsState {
  pizzas: fromPizzaReducer.PizzaState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzaReducer.reducer
};

export const getProducts = createFeatureSelector("products");
