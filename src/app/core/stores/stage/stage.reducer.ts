import { createFeature, createReducer, on } from '@ngrx/store';
import { StageActions } from './stage.actions';
import {Stage} from "../../models/stage/stage.model";

export interface StageState {
  stages: Stage[];
  filteredStages: Stage[];
  searchTerm: string;
  error: string | null;
}

const initialState: StageState = {
  stages: [],
  filteredStages: [],
  searchTerm: '',
  error: null,
};

export const StagesFeature = createFeature({
  name: 'stagesFeatureKey',
  reducer: createReducer(
    initialState,

    on(StageActions.loadStages, (state) => ({
      ...state,
      error: null
    })),
    on(StageActions.loadStagesSuccess, (state, { stages }) => ({
      ...state,
      filteredStages: stages,
      stages
    })),
    on(StageActions.loadStagesFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(StageActions.addStage, (state) => ({
      ...state,
      error: null
    })),
    on(StageActions.addStageSuccess, (state, { stage }) => ({
      ...state,
      stages: [...state.stages, stage],
      error: null
    })),

    on(StageActions.addStageFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(StageActions.getStageById, (state) => ({
      ...state,
      error: null
    })),
    on(StageActions.getStageByIdSuccess, (state, { stage }) => ({
      ...state,
      stages: state.stages.map(s => s.id === stage.id ? stage : s),
      error: null
    })),
    on(StageActions.getStageByIdFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(StageActions.updateStage, (state) => ({
      ...state,
      error: null
    })),
    on(StageActions.updateStageSuccess, (state, { stage }) => ({
      ...state,
      stages: state.stages.map(s => s.id === stage.id ? stage : s),
      error: null
    })),
  on(StageActions.updateStageFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(StageActions.deleteStage, (state) => ({
      ...state,
      error: null
    })),
    on(StageActions.deleteStageSuccess, (state, { id }) => ({
      ...state,
      stages: state.stages.filter(s => s.id !== id),
      error: null
    })),
    on(StageActions.deleteStageFailure, (state, { error }) => ({
      ...state,
      error
    })),
    on(StageActions.filterStages, (state, { searchTerm }) => ({
      ...state,
      searchTerm,
      filteredStages: state.stages.filter(stage =>
        stage.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
  )
});

export const { name: stagesFeatureKey, reducer: stageReducer, selectStages , selectFilteredStages} = StagesFeature;
