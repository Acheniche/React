import { combineReducers, configureStore } from "@reduxjs/toolkit"
import formReducer from './reducers/FormSlice'

const rootReducer = combineReducers({
    formReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
