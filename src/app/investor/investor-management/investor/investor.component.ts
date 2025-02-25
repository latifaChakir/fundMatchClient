import {Component, OnInit} from '@angular/core';
import {Observable, take} from "rxjs";
import {Store} from "@ngrx/store";
import {Investor} from "../../../core/models/investor/investor.model";
import {InvestorActions} from "../../../core/stores/investor/investor.actions";
import {selectFilteredInvestors, selectInvestors} from "../../../core/stores/investor/investor.reducer";

@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrl: './investor.component.css'
})
export class InvestorComponent implements OnInit{
  p: number = 1;
  showModal = false;
  investors$: Observable<Investor[]>;
  selectedInvestor: Investor | null = null;
  visible: boolean = false;
  investorIdToDelete: number | null = null;
  constructor(private store: Store) {
    this.investors$ = this.store.select(selectFilteredInvestors);
  }
  ngOnInit() {
    this.store.dispatch(InvestorActions.loadInvestors());
  }
  closePopup(): void {
    this.showModal = false;
    this.selectedInvestor = null;
  }
  openPopup() : void{
    this.showModal = true;
  }
  editInvestor(investorId: number): void {
    this.store.dispatch(InvestorActions.getInvestorById({ id: investorId }));
    this.store.select(selectInvestors).pipe(
      take(1)
    ).subscribe(investors => {
      const investorToEdit = investors.find(investor => investor.id === investorId);
      if (investorToEdit) {
        this.selectedInvestor = investorToEdit;
        this.openPopup();
      }
    });
  }

  showDeleteConfirmation(id: number) {
    this.investorIdToDelete = id;
    this.visible = true;
  }

  confirmDeleteInvestissor() {
    if (this.investorIdToDelete !== null) {
      this.store.dispatch(InvestorActions.deleteInvestor({ id: this.investorIdToDelete }));
    }
    this.visible = false;
  }

  onSearchChange(event: any) {
    console.log(event.target.value);
    const value = event.target.value;
    this.store.dispatch(InvestorActions.filterInvestors({ searchTerm: value }));
  }

}
