import React from 'react'
import { useSelector } from 'react-redux'
import { getSelectedNode } from '../slices/selectedNodeSlice'

const Inspector = () => {
	const selectedNode = useSelector(getSelectedNode)
	return selectedNode ? <h1>{selectedNode.resourceName}</h1> : null
}

export default Inspector
