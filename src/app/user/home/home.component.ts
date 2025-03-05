import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Startup} from "../../core/models/startup/startup.model";
import {Store} from "@ngrx/store";
import {selectFilteredStartups} from "../../core/stores/startup/startup.reducer";
import {StartupActions} from "../../core/stores/startup/startup.actions";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  p: number = 1;
  startups$: Observable<Startup[]>;
  constructor(private store: Store) {
    this.startups$ = this.store.select(selectFilteredStartups);
  }
  ngOnInit() {
    this.store.dispatch(StartupActions.loadStartups());

  }

}
