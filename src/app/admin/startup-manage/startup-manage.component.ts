import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {Startup} from "../../core/models/startup/startup.model";
import {selectFilteredStartups} from "../../core/stores/startup/startup.reducer";
import {StartupActions} from "../../core/stores/startup/startup.actions";

@Component({
  selector: 'app-startup-manage',
  templateUrl: './startup-manage.component.html',
  styleUrl: './startup-manage.component.css'
})
export class StartupManageComponent implements OnInit{
  startups$: Observable<Startup[]>;
  p: number = 1;

  constructor(private store: Store) {
    this.startups$ = this.store.select(selectFilteredStartups);
  }

  ngOnInit() {
    this.store.dispatch(StartupActions.loadStartups());
  }
  onSearchChange(event: any) {
    console.log(event.target.value);
    const value = event.target.value;
    this.store.dispatch(StartupActions.filterStartups({ searchTerm: value }));
  }
}
