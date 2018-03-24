import * as fromPizzaReducer from "./pizza.reducer";
import * as fromToppingReducer from "./toppings.reducer";
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

export interface ProductsState {
  pizzas: fromPizzaReducer.PizzaState;
  toppings: fromToppingReducer.ToppingsState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzaReducer.reducer,
  toppings: fromToppingReducer.reducer
};

export const getProducts = createFeatureSelector("products");
