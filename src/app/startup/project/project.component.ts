import {Component, OnInit} from '@angular/core';
import {Observable, take} from "rxjs";
import {Store} from "@ngrx/store";
import {Project} from "../../core/models/project/project.model";
import {selectFilteredProjects, selectProjects} from "../../core/stores/project/project.reducer";
import {ProjectActions} from "../../core/stores/project/project.actions";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{
  p: number = 1;
  showModal = false;
  projects$: Observable<Project[]>;
  selectedProject: Project | null = null;
  visible: boolean = false;
  projectIdToDelete: number | null = null;
  constructor(private store: Store) {
    this.projects$ = this.store.select(selectFilteredProjects);
  }
  ngOnInit() {
    this.store.dispatch(ProjectActions.loadProjects());
  }
  closePopup(): void {
    this.showModal = false;
    this.selectedProject = null;
  }
  openPopup() : void{
    this.showModal = true;
  }
  editProject(projectId: number): void {
    this.store.dispatch(ProjectActions.getProjectById({ id: projectId }));
    this.store.select(selectProjects).pipe(
      take(1)
    ).subscribe(projects => {
      const projectToEdit = projects.find(project => project.id === projectId);
      if (projectToEdit) {
        this.selectedProject = projectToEdit;
        this.openPopup();
      }
    });
  }

  showDeleteConfirmation(id: number) {
    this.projectIdToDelete = id;
    this.visible = true;
  }

  confirmDeleteProject() {
    if (this.projectIdToDelete !== null) {
      this.store.dispatch(ProjectActions.deleteProject({ id: this.projectIdToDelete }));
    }
    this.visible = false;
  }

  onSearchChange(event: any) {
    console.log(event.target.value);
    const value = event.target.value;
    this.store.dispatch(ProjectActions.filterProjects({ searchTerm: value }));
  }

}
