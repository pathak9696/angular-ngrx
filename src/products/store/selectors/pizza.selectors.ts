import { createSelector } from "@ngrx/store";
import * as fromReducer from "../reducers";
import * as fromPizzaReducer from "../reducers/pizza.reducer";
import * as fromRoot from "../../../app/store";

export const getPizzasState = createSelector(
  fromReducer.getProducts,
  (state: fromReducer.ProductsState) => state.pizzas
);

export const getPizzaEntities = createSelector(
  getPizzasState,
  fromPizzaReducer.getPizzaEntities
);

export const getPizzaEntity = createSelector(
  getPizzaEntities,
  fromRoot.getRouterReducer,
  (entities, router) => {
    return router.state && entities[router.state.params.pizzaId];
  }
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
