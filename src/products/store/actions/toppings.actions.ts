import { Action } from "@ngrx/store";
import { Topping } from "../../models/topping.model";

export const LOAD_TOPPINGS = "[Products] LOAD TOPPINGS";
export const LOAD_TOPPINGS_SUCCESS = "[Products] LOAD TOPPINGS SUCCESS";
export const LOAD_TOPPINGS_FAIL = "[Products] LOAD TOPPINGS FAIL";
export const VISUALIZE_TOPPINGS = "[Products] VISUALIZE TOPPINGS";

export class LoadToppings implements Action {
  readonly type = LOAD_TOPPINGS;
}

export class LoadToppingsSuccess implements Action {
  readonly type = LOAD_TOPPINGS_SUCCESS;
  constructor(public payload: Topping[]) {}
}

export class LoadToppingsFail implements Action {
  readonly type = LOAD_TOPPINGS_FAIL;
  constructor(public payload: any) {}
}

export class VisualizeToppings implements Action {
  readonly type = VISUALIZE_TOPPINGS;
  constructor(public payload: number[]) {}
}

export type ToppingActions =
  | LoadToppings
  | LoadToppingsSuccess
  | LoadToppingsFail
  | VisualizeToppings;
