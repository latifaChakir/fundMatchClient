import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project, ProjectStage, ProjectStatus} from "../../core/models/project/project.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {createprojectValidator} from "../../core/validators/project/project-validators";
import {ProjectActions} from "../../core/stores/project/project.actions";

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
  imageFile: File | null = null;



  constructor(private fb: FormBuilder, private store: Store) { }
  ngOnInit() {
    this.projectForm = createprojectValidator(this.fb);
    if (this.initialRequestData) {
      this.projectForm.patchValue(this.initialRequestData);
    }
    console.log("Stages disponibles :", this.projectStages);

  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
      console.log('Fichier image sélectionné :', this.imageFile);
    }
  }
  onSubmit() {
    if (this.projectForm.valid) {
      const formValues = this.projectForm.getRawValue();
      const formData = new FormData();

      formData.append('title', formValues.title);
      formData.append('description', formValues.description);
      formData.append('fundingAmount', formValues.fundingAmount);
      formData.append('stage', formValues.stage);
      formData.append('createdAt', formValues.createdAt);
      formData.append('viewCount', formValues.viewCount);
      formData.append('status', ProjectStatus.PENDING);

      if (this.imageFile) {
        formData.append('file', this.imageFile);
      } else {
        console.error('Aucun fichier image sélectionné.');
      }

      if (this.initialRequestData) {
        this.store.dispatch(ProjectActions.updateProject({ project: formData }));
      } else {
        this.store.dispatch(ProjectActions.addProject({ project: formData }));
      }

      this.projectForm.reset();
      this.cancel();
      this.initialRequestData = null;
    } else {
      console.log('Formulaire invalide', this.projectForm.errors);
    }
  }
  cancel(): void {
    this.closePopup.emit();
  }


}
