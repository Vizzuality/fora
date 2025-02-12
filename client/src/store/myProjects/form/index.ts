import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { STORE_WRAPPER } from 'store';
import qs from 'query-string';

export interface ProjectFormState {
  draftProject: {
    name: string;
    description: string;
    logo: File | null;
    contact_first_name: string;
    contact_last_name: string;
    website: string;
    country_id: number | null;
    state_id: number | null;
    city: string;
    leadership_demographics_other: string;
    recipient_legal_status: string;
    leadership_demographics: string[];
  };
}

const initialState: ProjectFormState = {
  draftProject: {
    name: '',
    description: '',
    logo: null,
    contact_first_name: '',
    contact_last_name: '',
    website: '',
    country_id: null,
    state_id: null,
    city: '',
    leadership_demographics_other: '',
    recipient_legal_status: '',
    leadership_demographics: [],
  },
};

const slice = createSlice({
  name: '/createProjectForm',
  initialState,
  reducers: {
    //  updateField: <K extends keyof ProjectFormState>(
    //   state: ProjectFormState,
    //   action: PayloadAction<{ field: K; value: ProjectFormState[K] }>
    // ) => {
    //   state[action.payload.field] = action.payload.value;
    // },
    // setForm: (state, action: PayloadAction<ProjectFormState>) => {
    //   return action.payload;
    // },

    updateDraft: (state, action: PayloadAction<Partial<ProjectFormState['draftProject']>>) => {
      state.draftProject = { ...state.draftProject, ...action.payload };
    },

    clearDraft: (state) => {
      state.draftProject = initialState.draftProject;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload['/createProjectForm'],
      };
    },
  },
});

export const { updateDraft, clearDraft } = slice.actions;

export default slice.reducer;
