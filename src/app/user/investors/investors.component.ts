import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Investor} from "../../core/models/investor/investor.model";
import {InvestorActions} from "../../core/stores/investor/investor.actions";
import {Store} from "@ngrx/store";
import {selectFilteredInvestors} from "../../core/stores/investor/investor.reducer";

@Component({
  selector: 'app-investors',
  templateUrl: './investors.component.html',
  styleUrl: './investors.component.css'
})
export class InvestorsComponent implements OnInit{
  investors$: Observable<Investor[]>;
  p: number = 1;

  constructor(private store: Store) {
    this.investors$ = this.store.select(selectFilteredInvestors);
  }
  ngOnInit() {
    this.store.dispatch(InvestorActions.loadInvestors());
  }
  onSearchChange(event: any) {
    console.log(event.target.value);
    const value = event.target.value;
    this.store.dispatch(InvestorActions.filterInvestors({ searchTerm: value }));
  }
}
