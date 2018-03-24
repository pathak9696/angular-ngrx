import { createSelector } from "@ngrx/store";
import * as fromProducts from "../reducers";
import * as fromToppingsReducer from "../reducers/toppings.reducer";

export const getToppingsState = createSelector(
  fromProducts.getProducts,
  (state: fromProducts.ProductsState) => state.toppings
);

export const getToppingsLoaded = createSelector(
  getToppingsState,
  fromToppingsReducer.getToppingLoaded
);

export const getToppingsLoading = createSelector(
  getToppingsState,
  fromToppingsReducer.getToppingLoading
);

export const getToppingsSelected = createSelector(
  getToppingsState,
  fromToppingsReducer.getToppingsSelected
);

export const getToppingsEntities = createSelector(
  getToppingsState,
  fromToppingsReducer.getToppingEntities
);

export const getToppings = createSelector(getToppingsEntities, entities =>
  Object.keys(entities).map(id => entities[+id])
);
