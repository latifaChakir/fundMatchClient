import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Project, ProjectStatus} from "../../models/project/project.model";


export const ProjectActions = createActionGroup({
  source: 'Project/API',
  events: {
    'Load Projects':  emptyProps(),
    'Load Projects Success': props<{ projects: Project[] }>(),
    'Load Projects Failure': props<{ error: string }>(),

    'Add Project': props<{ project: Project }>(),
    'Add Project Success': props<{ project: Project }>(),
    'Add Project Failure': props<{ error: string }>(),

    'Get Project By Id ': props<{id: number}>(),
    'Get Project By Id Success': props<{ project: Project }>(),
    'Get Project By Id Failure': props<{ error: string }>(),

    'Update Project': props<{ project: Project }>(),
    'Update Project Success': props<{ project: Project }>(),
    'Update Project Failure': props<{ error: string }>(),

    'Delete Project': props<{ id: number }>(),
    'Delete Project Success': props<{ id: number }>(),
    'Delete Project Failure': props<{ error: string }>(),

    'Filter Projects': props<{ searchTerm: string }>(),

    'Update Project Status': props<{ projectId: number, status: ProjectStatus }>(),
    'Update Project Status Success': emptyProps(),
    'Update Project Status Failure': props<{ error: string }>(),
  }
});
