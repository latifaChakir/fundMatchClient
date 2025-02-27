import { createFeature, createReducer, on } from '@ngrx/store';
import { ProjectActions } from './project.actions';
import {Project} from "../../models/project/project.model";

export interface ProjectState {
  projects: Project[];
  filteredProjects: Project[];
  searchTerm: string;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  filteredProjects: [],
  searchTerm: '',
  error: null,
};

export const ProjectsFeature = createFeature({
  name: 'ProjectsFeatureKey',
  reducer: createReducer(
    initialState,

    on(ProjectActions.loadProjects, (state) => ({
      ...state,
      error: null
    })),
    on(ProjectActions.loadProjectsSuccess, (state, { projects }) => ({
      ...state,
      filteredProjects: projects,
      projects
    })),
    on(ProjectActions.loadProjectsFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(ProjectActions.addProject, (state) => ({
      ...state,
      error: null
    })),
    on(ProjectActions.addProjectSuccess, (state, { project }) => ({
      ...state,
      projects: [...state.projects, project],
      filteredProjects: [...state.filteredProjects, project],
      error: null
    })),

    on(ProjectActions.addProjectFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(ProjectActions.getProjectById, (state) => ({
      ...state,
      error: null
    })),
    on(ProjectActions.getProjectByIdSuccess, (state, { project }) => ({
      ...state,
      projects: state.projects.map(s => s.id === project.id ? project : s),
      error: null
    })),
    on(ProjectActions.getProjectByIdFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(ProjectActions.updateProject, (state) => ({
      ...state,
      error: null
    })),
    on(ProjectActions.updateProjectSuccess, (state, { project }) => ({
      ...state,
      projects: state.projects.map(s => s.id === project.id ? project : s),
      filteredProjects: state.filteredProjects.map(s => s.id === project.id ? project : s),
      error: null
    })),
  on(ProjectActions.updateProjectFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(ProjectActions.deleteProject, (state) => ({
      ...state,
      error: null
    })),
    on(ProjectActions.deleteProjectSuccess, (state, { id }) => ({
      ...state,
      projects: state.projects.filter(s => s.id !== id),
      filteredProjects: state.filteredProjects.filter(s => s.id !== id),
      error: null
    })),
    on(ProjectActions.deleteProjectFailure, (state, { error }) => ({
      ...state,
      error
    })),
    on(ProjectActions.filterProjects, (state, { searchTerm }) => ({
      ...state,
      searchTerm,
      filteredProjects: state.projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
  )
});

export const { name: projectsFeatureKey, reducer: projectReducer, selectProjects , selectFilteredProjects} = ProjectsFeature;
