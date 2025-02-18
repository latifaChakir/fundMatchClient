import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {Stage} from "../../../core/models/stage/stage.model";
import {createStageValidator} from "../../../core/validators/stage/stage-validators";
import {StageActions} from "../../../core/stores/stage/stage.actions";

@Component({
  selector: 'app-add-stage',
  templateUrl: './add-stage.component.html',
  styleUrl: './add-stage.component.css'
})
export class AddStageComponent implements OnInit{
  @Output() closePopup = new EventEmitter<void>();
  @Output() openPopup = new EventEmitter<void>();
  @Input() initialRequestData: Stage | null = null;
  stageForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) { }
  ngOnInit() {
    this.stageForm = createStageValidator(this.fb);
    if (this.initialRequestData) {
      this.stageForm.patchValue(this.initialRequestData);
    }
  }
  onSubmit() {
    const formValues = this.stageForm.getRawValue();
    const stage : Stage = {
      id: this.initialRequestData ? this.initialRequestData.id : undefined,
      name : formValues.name,
    }
    if (this.initialRequestData) {
      this.store.dispatch(StageActions.updateStage({ stage }));
    }else {
      this.store.dispatch(StageActions.addStage({ stage }));
    }
    this.stageForm.reset();
    this.cancel();
    this.initialRequestData = null;
  }

  cancel(): void {
    this.closePopup.emit();
  }
}
