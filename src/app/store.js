import { configureStore } from '@reduxjs/toolkit'
import selectedNodeReducer from '../slices/selectedNodeSlice'
import editorModelReducer from '../slices/editorModelSlice'
import editorSettingsReducer from '../slices/editorSettingsSlice'

export const store = configureStore({
	reducer: {
		selectedNode: selectedNodeReducer,
		model: editorModelReducer,
		editorSettings: editorSettingsReducer,
	},
})
