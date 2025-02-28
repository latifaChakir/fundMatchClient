import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Event, EventType} from "../../../core/models/event/event.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {createEventValidator} from "../../../core/validators/event/event-validators";
import {EventActions} from "../../../core/stores/event/event.actions";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent implements OnInit{
  @Output() closePopup = new EventEmitter<void>();
  @Output() openPopup = new EventEmitter<void>();
  @Input() initialRequestData: Event | null = null;
  eventForm!: FormGroup;
  eventTypes = Object.values(EventType);

  constructor(private fb: FormBuilder, private store: Store) { }
  ngOnInit() {
    this.eventForm = createEventValidator(this.fb);
    if (this.initialRequestData) {
      this.eventForm.patchValue(this.initialRequestData);
    }
  }
  onSubmit() {
    const formValues = this.eventForm.getRawValue();
    const event : Event = {
      id: this.initialRequestData ? this.initialRequestData.id : undefined,
      title : formValues.title,
      description : formValues.description,
      location : formValues.location,
      date : formValues.date,
      maxParticipants : formValues.maxParticipants,
      type : formValues.type,
      cost : formValues.cost,
    }
    if (this.initialRequestData) {
      this.store.dispatch(EventActions.updateEvent({ event }));
    }else {
      this.store.dispatch(EventActions.addEvent({ event }));
    }
    this.eventForm.reset();
    this.cancel();
    this.initialRequestData = null;
  }

  cancel(): void {
    this.closePopup.emit();
  }
}
