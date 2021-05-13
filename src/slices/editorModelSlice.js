import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const editorModelSlice = createSlice({
	name: 'editorModel',
	initialState,
	reducers: {
		setEditorModel: (state, action) => {
			state.model = action.payload
		},
	},
})

export const { setEditorModel } = editorModelSlice.actions
export const getEditorModel = (state) => state.model.model
export default editorModelSlice.reducer
