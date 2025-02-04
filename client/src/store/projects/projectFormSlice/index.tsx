import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';


interface ProjectFormState {
  step: number;
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
}

const initialState: ProjectFormState = {
  step: 1,
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
};

const slice = createSlice({
  name: '/projectForm',
  initialState,
  // reducers: {
  //   // updateField: (
  //   //   state,
  //   //   action: PayloadAction<{ field: keyof ProjectFormState; value: any }>
  //   // ) => {
  //   //   state[action.payload.field] = action.payload.value;
  //   // },
  //   nextStep: (state) => {
  //     if (state.step < 4) state.step += 1;
  //   },
  //   prevStep: (state) => {
  //     if (state.step > 1) state.step -= 1;
  //   },
  //   saveFormData: (state, action: PayloadAction<Partial<ProjectFormState['formData']>>) => {
  //     state.formData = { ...state.formData, ...action.payload };
  //   },
  //   resetForm: () => initialState, // Resets form to initial state
  // },
  reducers: {
    updateField: <K extends keyof ProjectFormState>(
      state: ProjectFormState,
      action: PayloadAction<{ field: K; value: ProjectFormState[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    nextStep: (state) => {
      if (state.step < 4) state.step += 1;
    },
    prevStep: (state) => {
      if (state.step > 1) state.step -= 1;
    },
    resetForm: () => initialState,
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload['/projectForm'],
      };
    },
  },
});

export const { updateField, nextStep, prevStep, resetForm } = slice.actions;

export default slice.reducer;
