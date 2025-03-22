import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import {InvestorService} from "../../services/investor/investor.service";
import {InvestorActions} from "./investor.actions";

@Injectable()
export class InvestorEffects {
  constructor(private actions$: Actions, private investorService: InvestorService) {}

  loadInvestors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvestorActions.loadInvestors),
      mergeMap(() =>
        this.investorService.getInvestors().pipe(
          map((investors) => InvestorActions.loadInvestorsSuccess({ investors })),
          catchError((error) => of(InvestorActions.loadInvestorsFailure({ error: error.message })))
        )
      )
    )
  );

  getInvestorById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvestorActions.getInvestorById),
      mergeMap((action) =>
        this.investorService.getInvestorById(action.id).pipe(
          map((investor) => {
            return InvestorActions.getInvestorByIdSuccess({ investor });
          }),
          catchError((error) => {
            return of(InvestorActions.getInvestorByIdFailure({ error: error.message }));
          })
        )
      )
    )
  );

  addInvestor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvestorActions.addInvestor),
      mergeMap((action) =>
        this.investorService.saveInvestor(action.investor).pipe(
          map((investor) => InvestorActions.addInvestorSuccess({ investor })),
          catchError((error) => of(InvestorActions.addInvestorFailure({ error: error.message })))
        )
      )
    )
  );


  updateInvestor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvestorActions.updateInvestor),
      mergeMap((action) => {
        const investorId = action.investor.id;
        if (!investorId) {
          console.error("Investor ID is not valid:", action.investor);
          return of(InvestorActions.updateInvestorFailure({ error: "Invalid Investor ID" }));
        }

        return this.investorService.updateInvestor(action.investor, investorId).pipe(
          map((investor) => InvestorActions.updateInvestorSuccess({ investor })),
          catchError((error) => of(InvestorActions.updateInvestorFailure({ error: error.message })))
        );
      })
    )
  );

  deleteInvestor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvestorActions.deleteInvestor),
      mergeMap((action) =>
        this.investorService.deleteInvestor(action.id).pipe(
          map(() => {
            console.log("Suppression réussie pour l'ID:", action.id);
            return InvestorActions.deleteInvestorSuccess({ id: action.id });
          }),
          catchError((error) => {
            console.error("Erreur lors de la suppression:", error);
            return of(InvestorActions.deleteInvestorFailure({ error: error.message }));
          })
        )
      )
    )
  );

}
