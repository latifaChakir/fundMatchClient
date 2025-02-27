import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Project} from "../../core/models/project/project.model";
import {Store} from "@ngrx/store";
import {selectFilteredProjects} from "../../core/stores/project/project.reducer";
import {ProjectActions} from "../../core/stores/project/project.actions";

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent implements OnInit{
  projects$: Observable<Project[]>;
  p: number = 1;

  constructor(private store: Store) {
    this.projects$ = this.store.select(selectFilteredProjects);
  }
  ngOnInit() {
    this.store.dispatch(ProjectActions.loadProjects());
  }
  onSearchChange(event: any) {
    console.log(event.target.value);
    const value = event.target.value;
    this.store.dispatch(ProjectActions.filterProjects({ searchTerm: value }));
  }
  updateStatus(projectId: number) {
    this.store.dispatch(ProjectActions.updateProjectStatus({ projectId }));
  }
}
