import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import { getSelectedNode } from '../slices/selectedNodeSlice'

const Inspector = ({ engine }) => {
	const [formState, setFormState] = useState({})
	const selectedNode = useSelector(getSelectedNode)

	const handleChange = (e) => {
		e.stopPropagation()
		e.preventDefault()
		setFormState({ ...formState, [e.target.id]: e.target.value })
	}

	const handleNodeNameBlur = (e) => {
		const model = engine.getModel()
		const node = model.getNode(selectedNode.id)
		node.name = e.target.value
		engine.repaintCanvas()
	}

	const handleNodeDataBlur = (e) => {
		const model = engine.getModel()
		const node = model.getNode(selectedNode.id)
		node.setTemplateDataProperty(e.target.id, e.target.value)
		engine.repaintCanvas()
	}

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	const renderForm = () => (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="nodeName">
				<Form.Label>Node Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Node name"
					value={formState.nodeName || selectedNode.name || ''}
					onChange={handleChange}
					onBlur={handleNodeNameBlur}
				/>
			</Form.Group>

			<Form.Group controlId="resourceName">
				<Form.Label>Resource Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Resource name"
					value={formState.resourceName}
					onChange={handleChange}
					onBlur={handleNodeDataBlur}
				/>
			</Form.Group>
		</Form>
	)

	return selectedNode ? renderForm() : null
}

export default Inspector
