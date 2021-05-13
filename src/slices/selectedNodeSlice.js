import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	node: {},
}

export const selectedNodeSlice = createSlice({
	name: 'selectedNode',
	initialState,
	reducers: {
		setSelectedNode: (state, action) => {
			state.node = action.payload
		},
	},
})

export const { setSelectedNode } = selectedNodeSlice.actions
export const getSelectedNode = (state) => state.selectedNode.node
export default selectedNodeSlice.reducer
