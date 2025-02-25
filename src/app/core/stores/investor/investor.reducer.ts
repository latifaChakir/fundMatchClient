import { createFeature, createReducer, on } from '@ngrx/store';
import {InvestorActions} from "./investor.actions";
import {Investor} from "../../models/investor/investor.model";

export interface InvestorState {
  investors: Investor[];
  filteredInvestors: Investor[];
  searchTerm: string;
  error: string | null;
}

const initialState: InvestorState = {
  investors: [],
  filteredInvestors: [],
  searchTerm: '',
  error: null,
};

export const InvestorsFeature = createFeature({
  name: 'InvestorsFeatureKey',
  reducer: createReducer(
    initialState,

    on(InvestorActions.loadInvestors, (state) => ({
      ...state,
      error: null
    })),
    on(InvestorActions.loadInvestorsSuccess, (state, { investors }) => ({
      ...state,
      filteredInvestors: investors,
      investors,

    })),
    on(InvestorActions.loadInvestorsFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(InvestorActions.addInvestor, (state) => ({
      ...state,
      error: null
    })),
    on(InvestorActions.addInvestorSuccess, (state, { investor }) => ({
      ...state,
      investors: [...state.investors, investor],
      error: null
    })),

    on(InvestorActions.addInvestorFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(InvestorActions.getInvestorById, (state) => ({
      ...state,
      error: null
    })),
    on(InvestorActions.getInvestorByIdSuccess, (state, { investor }) => ({
      ...state,
      investors: state.investors.map(s => s.id === investor.id ? investor : s),
      error: null
    })),
    on(InvestorActions.getInvestorByIdFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(InvestorActions.updateInvestor, (state) => ({
      ...state,
      error: null
    })),
    on(InvestorActions.updateInvestorSuccess, (state, { investor }) => ({
      ...state,
      investors: state.investors.map(s => s.id === investor.id ? investor : s),
      error: null
    })),
  on(InvestorActions.updateInvestorFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(InvestorActions.deleteInvestor, (state) => ({
      ...state,
      error: null
    })),
    on(InvestorActions.deleteInvestorSuccess, (state, { id }) => ({
      ...state,
      investors: state.investors.filter(s => s.id !== id),
      error: null
    })),
    on(InvestorActions.deleteInvestorFailure, (state, { error }) => ({
      ...state,
      error
    })),
    on(InvestorActions.filterInvestors, (state, { searchTerm }) => ({
      ...state,
      searchTerm,
      filteredInvestors: state.investors.filter(investor =>
        investor.organization.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
  )
});

export const { name: investorsFeatureKey, reducer: investorReducer, selectInvestors, selectFilteredInvestors } = InvestorsFeature;
