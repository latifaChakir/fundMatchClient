import { createFeature, createReducer, on } from '@ngrx/store';
import { SectorActions } from './sector.actions';
import { Sector } from '../../models/sector/sector.model';

export interface SectorState {
  sectors: Sector[];
  error: string | null;
}

const initialState: SectorState = {
  sectors: [],
  error: null,
};

export const sectorsFeature = createFeature({
  name: 'sectorsFeatureKey',
  reducer: createReducer(
    initialState,

    on(SectorActions.loadSectors, (state) => ({
      ...state,
      error: null
    })),
    on(SectorActions.loadSectorsSuccess, (state, { sectors }) => ({
      ...state,
      sectors
    })),
    on(SectorActions.loadSectorsFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(SectorActions.addSector, (state) => ({
      ...state,
      error: null
    })),
    on(SectorActions.addSectorSuccess, (state, { sector }) => ({
      ...state,
      sectors: [...state.sectors, sector],
      error: null
    })),

    on(SectorActions.addSectorFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(SectorActions.getSectorById, (state) => ({
      ...state,
      error: null
    })),
    on(SectorActions.getSectorByIdSuccess, (state, { sector }) => ({
      ...state,
      sectors: state.sectors.map(s => s.id === sector.id ? sector : s),
      error: null
    })),
    on(SectorActions.getSectorByIdFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(SectorActions.updateSector, (state) => ({
      ...state,
      error: null
    })),
    on(SectorActions.updateSectorSuccess, (state, { sector }) => ({
      ...state,
      sectors: state.sectors.map(s => s.id === sector.id ? sector : s),
      error: null
    })),
  on(SectorActions.updateSectorFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(SectorActions.deleteSector, (state) => ({
      ...state,
      error: null
    })),
    on(SectorActions.deleteSectorSuccess, (state, { id }) => ({
      ...state,
      sectors: state.sectors.filter(s => s.id !== id),
      error: null
    })),
    on(SectorActions.deleteSectorFailure, (state, { error }) => ({
      ...state,
      error
    }))
  )
});

export const { name: sectorsFeatureKey, reducer: sectorReducer, selectSectors } = sectorsFeature;
