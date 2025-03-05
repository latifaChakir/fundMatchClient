import { Component, OnInit } from '@angular/core';
import { Observable, take } from "rxjs";
import { Startup } from "../../core/models/startup/startup.model";
import { Store } from "@ngrx/store";
import { selectFilteredStartups, selectStartups } from "../../core/stores/startup/startup.reducer";
import { StartupActions } from "../../core/stores/startup/startup.actions";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  p: number = 1;
  startups$: Observable<Startup[]>;
  showModal = false;
  selectedStartup: Startup | null = null;

  constructor(private store: Store) {
    this.startups$ = this.store.select(selectFilteredStartups);
  }

  ngOnInit() {
    this.store.dispatch(StartupActions.loadStartups());
  }

  closePopup(): void {
    this.showModal = false;
    this.selectedStartup = null;
  }

  openPopup(): void {
    this.showModal = true;
  }

  loadStartup(startupId: number): void {
    this.store.select(selectStartups).pipe(
      take(1)
    ).subscribe(startups => {
      const startupToEdit = startups.find(str => str.id === startupId);
      if (startupToEdit) {
        this.selectedStartup = startupToEdit;
        this.showModal = true;
      }
    });
  }
}
