import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import {ProjectActions} from "./project.actions";
import {ProjectService} from "../../services/project/project.service";

@Injectable()
export class ProjectEffects {
  constructor(private actions$: Actions, private projectService: ProjectService) {}

  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.loadProjects),
      mergeMap(() =>
        this.projectService.getProjects().pipe(
          map((projects) => ProjectActions.loadProjectsSuccess({ projects })),
          catchError((error) => of(ProjectActions.loadProjectsFailure({ error: error.message })))
        )
      )
    )
  );

  getProjectById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.getProjectById),
      mergeMap((action) =>
        this.projectService.getProjectById(action.id).pipe(
          map((project) => {
            return ProjectActions.getProjectByIdSuccess({ project });
          }),
          catchError((error) => {
            return of(ProjectActions.getProjectByIdFailure({ error: error.message }));
          })
        )
      )
    )
  );

  addProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.addProject),
      mergeMap((action) =>
        this.projectService.saveProject(action.project).pipe(
          map((project) => ProjectActions.addProjectSuccess({ project })),
          catchError((error) => of(ProjectActions.addProjectFailure({ error: error.message })))
        )
      )
    )
  );


  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.updateProject),
      mergeMap((action) => {
        const projectId = action.project.id;
        if (!projectId) {
          console.error("Project ID is not valid:", action.project);
          return of(ProjectActions.updateProjectFailure({ error: "Invalid Project ID" }));
        }

        return this.projectService.updateProject(action.project, projectId).pipe(
          map((project) => ProjectActions.updateProjectSuccess({ project })),
          catchError((error) => of(ProjectActions.updateProjectFailure({ error: error.message })))
        );
      })
    )
  );

  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.deleteProject),
      mergeMap((action) =>
        this.projectService.deleteProject(action.id).pipe(
          map(() => ProjectActions.deleteProjectSuccess({ id: action.id })),
          catchError((error) => of(ProjectActions.deleteProjectFailure({ error: error.message })))
        )
      )
    )
  );

  updateProjectStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.updateProjectStatus),
      mergeMap((action) =>
        this.projectService.updateProjectStatus(action.projectId).pipe(
          map((success) => {
            if (success) {
              return ProjectActions.updateProjectStatusSuccess();
            } else {
              return ProjectActions.updateProjectStatusFailure({ error: 'Status update failed' });
            }
          }),
          catchError((error) => of(ProjectActions.updateProjectStatusFailure({ error: error.message })))
        )
      )
    )
  );

}
