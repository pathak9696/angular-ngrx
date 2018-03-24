import { Injectable } from "@angular/core";
import * as fromPizzasAction from "../actions/pizza.actions";
import { Effect, Actions } from "@ngrx/effects";
import * as fromServices from "../../services";
import { Observable } from "rxjs/Observable";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs/Observable/of";

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
}

// [{id: 1, name: 'x} , {id: 2. name: 'y}]
// {1: {id: 1, name: 'x'}, 2: {id: 2, name: 'y'}}
