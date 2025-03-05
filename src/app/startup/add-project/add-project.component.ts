import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project, ProjectStage, ProjectStatus} from "../../core/models/project/project.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {createprojectValidator} from "../../core/validators/project/project-validators";
import {ProjectActions} from "../../core/stores/project/project.actions";
import {EventType} from "../../core/models/event/event.model";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent implements OnInit{
  @Output() closePopup = new EventEmitter<void>();
  @Output() openPopup = new EventEmitter<void>();
  @Input() initialRequestData: Project | null = null;
  projectForm!: FormGroup;
  projectStages = Object.values(ProjectStage);


  constructor(private fb: FormBuilder, private store: Store) { }
  ngOnInit() {
    this.projectForm = createprojectValidator(this.fb);
    if (this.initialRequestData) {
      this.projectForm.patchValue(this.initialRequestData);
    }
  }
  onSubmit() {
    const formValues = this.projectForm.getRawValue();
    const project : Project = {
      id: this.initialRequestData ? this.initialRequestData.id : undefined,
      title : formValues.title,
      description : formValues.description,
      fundingAmount : formValues.fundingAmount,
      stage : formValues.stage,
      createdAt : formValues.createdAt,
      viewCount : formValues.viewCount,
      status : ProjectStatus.PENDING
    }
    if (this.initialRequestData) {
      this.store.dispatch(ProjectActions.updateProject({ project }));
    }else {
      this.store.dispatch(ProjectActions.addProject({ project }));
    }
    this.projectForm.reset();
    this.cancel();
    this.initialRequestData = null;
  }

  cancel(): void {
    this.closePopup.emit();
  }

}
