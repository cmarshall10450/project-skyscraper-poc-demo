import React from 'react'
import createEngine, {
	DiagramModel,
	PortModelAlignment,
	RightAngleLinkFactory,
} from '@projectstorm/react-diagrams'
import { CanvasWidget } from '@projectstorm/react-canvas-core'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedNode } from '../slices/selectedNodeSlice'
import SimplePortFactory from '../app/nodes/common/SimplePortFactory'
import {
	ResourceNodePortModel,
	ResourceNodeFactory,
	ResourceNodeModel,
} from '../app/nodes/resouece-node/'
import { setEditorModel } from '../slices/editorModelSlice'

const Editor = () => {
	const dispatch = useDispatch()

	const engine = createEngine()
	const model = new DiagramModel()

	useSelector((state) => {
		state.editorSettings.gridSnapping
			? model.setGridSize(60)
			: model.setGridSize(0)
	})

	model.setGridSize(60)
	dispatch(setEditorModel(model.serialize()))

	const onDrop = (event) => {
		const { resourceType, defaultPrefix, nodeConfig } = JSON.parse(
			event.dataTransfer.getData('storm-diagram-node')
		)

		const node = new ResourceNodeModel(resourceType, defaultPrefix, nodeConfig)
		console.log(node)
		node.registerListener({
			selectionChanged: (e) => dispatch(setSelectedNode(e.entity.serialize())),
		})
		const point = engine.getRelativeMousePoint(event)
		node.setPosition(point)
		model.addNode(node)
		engine.repaintCanvas()
		dispatch(setEditorModel(model.serialize()))
	}

	const onDragOver = (event) => {
		event.preventDefault()
	}

	engine
		.getPortFactories()
		.registerFactory(
			new SimplePortFactory(
				'resource',
				(config) => new ResourceNodePortModel(PortModelAlignment.LEFT)
			)
		)
	engine.getLinkFactories().registerFactory(new RightAngleLinkFactory())
	engine.getNodeFactories().registerFactory(new ResourceNodeFactory())
	engine.setModel(model)

	return (
		<div onDrop={onDrop} onDragOver={onDragOver}>
			<CanvasWidget className="editor" engine={engine} />
		</div>
	)
}

export default Editor
