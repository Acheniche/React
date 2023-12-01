import { createSlice } from "@reduxjs/toolkit";

interface FormsData {
    name: string;
    age: number;
    email: string;
    password: string;
    gender: string;
    acceptTC: boolean;
    country: string;
}

interface FormState {
    forms: FormsData[];
}

const initialState: FormState = {
    forms: [],
}

export const postSlice = createSlice({
    name: 'Form',
    initialState,
    reducers: {

    }
})

export default postSlice.reducer;