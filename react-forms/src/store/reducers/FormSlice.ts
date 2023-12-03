import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type FileObject = {
    size: number;
    type: string;
  };

export type FileType = FileObject | null | string;

export interface FormsData {
    Name: string;
    Age: number;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    Gender: string;
    AcceptTerms?: boolean;
    Picture?: FileType;
    Country: string;
}

export interface FormState {
    forms: FormsData[];
}

const initialState: FormState = {
    forms: [],
}

export const postSlice = createSlice({
    name: 'Form',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<FormsData>) {
            state.forms.push(action.payload);
        }
    }
})

export default postSlice.reducer;