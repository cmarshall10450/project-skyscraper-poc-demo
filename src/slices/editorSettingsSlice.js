import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	gridSnapping: false,
}

export const editorSettingsSlice = createSlice({
	name: 'editorModel',
	initialState,
	reducers: {
		toggleGridSnapping: (state) => {
			state.gridSnapping = !state.gridSnapping
		},
	},
})

export const { toggleGridSnapping } = editorSettingsSlice.actions
export const getGridSnapping = (state) => state.editorSettings.gridSnapping
export default editorSettingsSlice.reducer
