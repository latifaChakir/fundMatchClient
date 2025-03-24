import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Event, EventType} from "../../../core/models/event/event.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {createEventValidator} from "../../../core/validators/event/event-validators";
import {EventActions} from "../../../core/stores/event/event.actions";
import {Observable} from "rxjs";
import {Sector} from "../../../core/models/sector/sector.model";
import {selectSectors} from "../../../core/stores/sector/sector.reducer";
import {SectorActions} from "../../../core/stores/sector/sector.actions";

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
  imageFile: File | null = null;
  eventTypes = Object.values(EventType);
  sectors$: Observable<Sector[]>;


  constructor(private fb: FormBuilder, private store: Store) {
    this.sectors$ = this.store.select(selectSectors);
  }

  ngOnInit() {
    this.store.dispatch(SectorActions.loadSectors());
    this.eventForm = createEventValidator(this.fb);
    if (this.initialRequestData) {
      this.eventForm.patchValue({
        ...this.initialRequestData,
        sector: this.initialRequestData.sector
      });
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
      console.log('Fichier image sélectionné :', this.imageFile);
    }
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const formValues = this.eventForm.value;
      const formData = new FormData();

      formData.append('title', formValues.title);
      formData.append('description', formValues.description);
      formData.append('location', formValues.location);
      formData.append('date', formValues.date);
      formData.append('maxParticipants', formValues.maxParticipants);
      formData.append('type', formValues.type);
      formData.append('cost', formValues.cost);
      formData.append('sector', String(formValues.sector));
      if (this.imageFile) {
        formData.append('file', this.imageFile);
      } else {
        console.error('Aucun fichier image sélectionné.');
      }

      if (this.initialRequestData) {
        formData.append('id', String(this.initialRequestData.id));
        this.store.dispatch(EventActions.updateEvent({ event: formData }));
      } else {
        this.store.dispatch(EventActions.addEvent({ event: formData }));
      }

      this.eventForm.reset();
      this.imageFile = null;
      this.cancel();
      this.initialRequestData = null;
    } else {
      console.log("Formulaire invalide", this.eventForm.errors);
    }
  }

  cancel(): void {
    this.closePopup.emit();
  }
}
