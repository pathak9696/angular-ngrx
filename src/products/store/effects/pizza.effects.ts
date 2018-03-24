import { Injectable } from "@angular/core";
import * as fromPizzasAction from "../actions/pizza.actions";
import { Effect, Actions } from "@ngrx/effects";
import * as fromServices from "../../services";
import { Observable } from "rxjs/Observable";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs/Observable/of";
import { Pizza } from "../../models/pizza.model";
import * as fromRoot from "../../../app/store";

@Injectable()
export class PizzaEffects {
  constructor(
    private pizzaService: fromServices.PizzasService,
    private actions$: Actions
  ) {}
  // LoadPizzas will listen for LOAD_PIZZAS action and
  // Makes call to pizzaService.getPizzas()
  // Dispatched action 'LOAD_PIZZAS_SUCCESS' or 'LOAD_PIZZAS_FAIL' with payload based
  // on the response we get from getPizzas;
  @Effect()
  loadPizzas$ = this.actions$.ofType(fromPizzasAction.LOAD_PIZZAS).pipe(
    switchMap(() => {
      return this.pizzaService
        .getPizzas()
        .pipe(
          map(pizzas => new fromPizzasAction.LoadPizzasSuccess(pizzas)),
          catchError(error => of(new fromPizzasAction.LoadPizzasFail(error)))
        );
    })
  );

  @Effect()
  createPizzas$ = this.actions$.ofType(fromPizzasAction.CREATE_PIZZA).pipe(
    map((action: fromPizzasAction.CreatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService
        .createPizza(pizza)
        .pipe(
          map(pizza => new fromPizzasAction.CreatePizzaSuccess(pizza)),
          catchError(error => of(new fromPizzasAction.CreatePizzaFail(error)))
        );
    })
  );

  @Effect()
  createPizzaSuccess$ = this.actions$
    .ofType(fromPizzasAction.CREATE_PIZZA_SUCCESS)
    .pipe(
      map((action: fromPizzasAction.CreatePizzaSuccess) => action.payload),
      map(
        pizza =>
          new fromRoot.Go({
            path: ["products", pizza.id]
          })
      )
    );

  @Effect()
  updatePizzas$ = this.actions$.ofType(fromPizzasAction.UPDATE_PIZZA).pipe(
    map((action: fromPizzasAction.UpdatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService
        .updatePizza(pizza)
        .pipe(
          map(pizza => new fromPizzasAction.UpdatePizzaSuccess(pizza)),
          catchError(error => of(new fromPizzasAction.UpdatePizzaFail(error)))
        );
    })
  );

  @Effect()
  removePizzas$ = this.actions$.ofType(fromPizzasAction.REMOVE_PIZZA).pipe(
    map((action: fromPizzasAction.RemovePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService
        .removePizza(pizza)
        .pipe(
          map(() => new fromPizzasAction.RemovePizzaSuccess(pizza)),
          catchError(error => of(new fromPizzasAction.RemovePizzaFail(error)))
        );
    })
  );

  @Effect()
  handlePizzaSuccess$ = this.actions$
    .ofType(
      fromPizzasAction.UPDATE_PIZZA_SUCCESS,
      fromPizzasAction.REMOVE_PIZZA_SUCCESS
    )
    .pipe(
      map((action: fromPizzasAction.CreatePizzaSuccess) => action.payload),
      map(
        pizza =>
          new fromRoot.Go({
            path: ["products"]
          })
      )
    );
}

// [{id: 1, name: 'x} , {id: 2. name: 'y}]
// {1: {id: 1, name: 'x'}, 2: {id: 2, name: 'y'}}
