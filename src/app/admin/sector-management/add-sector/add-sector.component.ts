import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {createSectorValidator} from "../../../core/validators/sector/sector-validators";
import {Sector} from "../../../core/models/sector/sector.model";
import {SectorActions} from "../../../core/stores/sector/sector.actions";

@Component({
  selector: 'app-add-sector',
  templateUrl: './add-sector.component.html',
  styleUrl: './add-sector.component.css'
})
export class AddSectorComponent implements OnInit{
  @Output() closePopup = new EventEmitter<void>();
  @Output() openPopup = new EventEmitter<void>();
  @Input() initialRequestData: Sector | null = null;
  sectorForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) { }
 ngOnInit() {
    this.sectorForm = createSectorValidator(this.fb);
   if (this.initialRequestData) {
     this.sectorForm.patchValue(this.initialRequestData);
   }
 }
 onSubmit() {
   const formValues = this.sectorForm.getRawValue();
   const sector : Sector = {
     id: this.initialRequestData ? this.initialRequestData.id : undefined,
     name : formValues.name,
   }
   if (this.initialRequestData) {
     this.store.dispatch(SectorActions.updateSector({ sector }));
   }else {
     this.store.dispatch(SectorActions.addSector({ sector }));
   }
   this.sectorForm.reset();
   this.cancel();
   this.initialRequestData = null;
 }

  cancel(): void {
    this.closePopup.emit();
  }
}
