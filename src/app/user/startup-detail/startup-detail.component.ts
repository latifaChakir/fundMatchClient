import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Startup } from "../../core/models/startup/startup.model";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-startup-detail',
  templateUrl: './startup-detail.component.html',
  styleUrls: ['./startup-detail.component.css']
})
export class StartupDetailComponent implements OnInit {
  @Output() closePopup = new EventEmitter<void>();
  @Input() initialRequestData: Startup | null = null;

  constructor(private store: Store) { }

  ngOnInit() {
    console.log(this.initialRequestData);
  }

  cancel(): void {
    this.closePopup.emit();
  }
}
