import { createFeature, createReducer, on } from '@ngrx/store';
import { SectorActions } from './sector.actions';
import { Sector } from '../../models/sector/sector.model';

export interface SectorState {
  sectors: Sector[];
  filteredSectors: Sector[];
  searchTerm: string;
  error: string | null;
}

const initialState: SectorState = {
  sectors: [],
  filteredSectors: [],
  searchTerm: '',
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
      filteredSectors: sectors,
      sectors,

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
      filteredSectors: [...state.filteredSectors, sector],
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
      filteredSectors: state.filteredSectors.map(s => s.id === sector.id ? sector : s),
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
      filteredSectors: state.filteredSectors.filter(s => s.id !== id),
      error: null
    })),
    on(SectorActions.deleteSectorFailure, (state, { error }) => ({
      ...state,
      error
    })),
    on(SectorActions.filterSectors, (state, { searchTerm }) => ({
      ...state,
      searchTerm,
      filteredSectors: state.sectors.filter(sector =>
        sector.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
  )
});

export const { name: sectorsFeatureKey, reducer: sectorReducer, selectSectors, selectFilteredSectors } = sectorsFeature;
