import { createFeature, createReducer, on } from '@ngrx/store';
import { StartupActions } from './startup.actions';
import {Startup} from "../../models/startup/startup.model";

export interface StartupState {
  startups: Startup[];
  filteredStartups: Startup[];
  searchTerm: string;
  error: string | null;
}

const initialState: StartupState = {
  startups: [],
  filteredStartups: [],
  searchTerm: '',
  error: null,
};

export const StartupsFeature = createFeature({
  name: 'StartupsFeatureKey',
  reducer: createReducer(
    initialState,

    on(StartupActions.loadStartups, (state) => ({
      ...state,
      error: null
    })),
    on(StartupActions.loadStartupsSuccess, (state, { startups }) => ({
      ...state,
      filteredStartups: startups,
      startups
    })),
    on(StartupActions.loadStartupsFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(StartupActions.addStartup, (state) => ({
      ...state,
      error: null
    })),
    on(StartupActions.addStartupSuccess, (state, { startup }) => ({
      ...state,
      startups: [...state.startups, startup],
      error: null
    })),

    on(StartupActions.addStartupFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(StartupActions.getStartupById, (state) => ({
      ...state,
      error: null
    })),
    on(StartupActions.getStartupByIdSuccess, (state, { Startup }) => ({
      ...state,
      startups: state.startups.map(s => s.id === startup.id ? startup : s),
      error: null
    })),
    on(StartupActions.getStartupByIdFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(StartupActions.updateStartup, (state) => ({
      ...state,
      error: null
    })),
    on(StartupActions.updateStartupSuccess, (state, { Startup }) => ({
      ...state,
      startups: state.startups.map(s => s.id === startup.id ? startup : s),
      error: null
    })),
  on(StartupActions.updateStartupFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(StartupActions.deleteStartup, (state) => ({
      ...state,
      error: null
    })),
    on(StartupActions.deleteStartupSuccess, (state, { id }) => ({
      ...state,
      startups: state.startups.filter(s => s.id !== id),
      error: null
    })),
    on(StartupActions.deleteStartupFailure, (state, { error }) => ({
      ...state,
      error
    })),
    on(StartupActions.filterStartups, (state, { searchTerm }) => ({
      ...state,
      searchTerm,
      filteredStartups: state.startups.filter(startup =>
        startup.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
  )
});

export const { name: startupsFeatureKey, reducer: startupReducer, selectStartups , selectFilteredStartups} = StartupsFeature;
