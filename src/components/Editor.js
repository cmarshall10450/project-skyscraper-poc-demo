import React from 'react'
import createEngine, {
	DiagramModel,
	PortModelAlignment,
	RightAngleLinkFactory,
	DagreEngine,
} from '@projectstorm/react-diagrams'
import { CanvasWidget } from '@projectstorm/react-canvas-core'
import { useDispatch } from 'react-redux'
import { useContextMenu } from 'react-contexify'
import { setSelectedNode } from '../slices/selectedNodeSlice'
import SimplePortFactory from '../app/nodes/common/SimplePortFactory'
import {
	ResourceNodeFactory,
	ResourceNodeModel,
} from '../app/nodes/resouece-node/'
import { ResourceNodePortModel } from '../app/ports/resource-node/'
import { setEditorModel } from '../slices/editorModelSlice'
import {
	Container,
	Col,
	Row,
	Button,
	ButtonGroup,
	ButtonToolbar,
} from 'react-bootstrap'
import ls from 'local-storage'
import ResourcesList from './ResourcesList'
import Inspector from './Inspector'
import ContextMenus from './menus/ContextMenus'
import {
	ClipboardAction,
	DeleteAction,
	DuplicateAction,
	UndoRedoAction,
	ZoomAction,
} from '../app/actions'
import { CommandManager, commandHandlers } from '../app/commands'

import { ResourceNodeLinkFactory } from '../app/links/resource-node/'

const Editor = () => {
	const dispatch = useDispatch()
	const { show } = useContextMenu({
		id: 'diagram',
	})

	const engine = createEngine({
		registerDefaultDeleteItemsAction: false,
		registerDefaultZoomCanvasAction: false,
	})
	const dagreEngine = new DagreEngine({
		graph: {
			rankdir: 'RL',
			ranker: 'longest-path',
			marginx: 25,
			marginy: 25,
		},
		includeLinks: true,
	})
	const model = new DiagramModel()

	engine
		.getPortFactories()
		.registerFactory(
			new SimplePortFactory(
				'resource',
				(config) => new ResourceNodePortModel(PortModelAlignment.LEFT)
			)
		)
	engine.getLinkFactories().registerFactory(new RightAngleLinkFactory())
	engine.getLinkFactories().registerFactory(new ResourceNodeLinkFactory())
	engine.getNodeFactories().registerFactory(new ResourceNodeFactory())

	engine.getActionEventBus().registerAction(new DeleteAction())

	engine.commands = new CommandManager()
	engine.registerListener(commandHandlers(engine))

	model.setGridSize(60)
	dispatch(setEditorModel(model.serialize()))

	model.registerListener({
		offsetUpdated: (e) => {
			setSelectedNode(null)
		},
	})

	const onDrop = (event) => {
		const { apiVersion, resourceType, defaultPrefix, nodeConfig } = JSON.parse(
			event.dataTransfer.getData('storm-diagram-node')
		)

		const node = new ResourceNodeModel(
			apiVersion,
			resourceType,
			defaultPrefix,
			nodeConfig
		)
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

	const actions = [
		DuplicateAction,
		ClipboardAction,
		DeleteAction,
		UndoRedoAction,
		ZoomAction,
	]
	actions.forEach((Action) =>
		engine.getActionEventBus().registerAction(new Action())
	)

	const autoAlignNodes = () => {
		dagreEngine.redistribute(model)
		engine.repaintCanvas()
	}

	const exportTemplateData = () => {
		const nodes = model.getActiveNodeLayer().getNodes()

		const resources = Object.entries(nodes).map(([id, data]) =>
			data.getTemplateData()
		)

		console.log(resources)
		return resources
	}

	const saveDiagram = () => {
		ls.set('merkle-arm-ui-diagram', model.serialize())
	}

	const loadDiagram = () => {
		const savedDiagram = ls.get('merkle-arm-ui-diagram')
		model.deserializeModel(savedDiagram, engine)
		console.log(model)
		engine.setModel(model)
		engine.repaintCanvas()
	}

	const fireAction = (event) => {
		return engine.getActionEventBus().fireAction({
			event: {
				...event,
				key: '',
				preventDefault: () => {},
				stopPropagation: () => {},
			},
		})
	}

	const duplicateSelected = () =>
		fireAction({ type: 'keydown', ctrlKey: true, code: 'KeyD' })
	const cutSelected = () =>
		fireAction({ type: 'keydown', ctrlKey: true, code: 'KeyX' })
	const copySelected = () =>
		fireAction({ type: 'keydown', ctrlKey: true, code: 'KeyC' })
	const pasteSelected = () =>
		fireAction({ type: 'keydown', ctrlKey: true, code: 'KeyV' })
	const deleteSelected = () => fireAction({ type: 'keydown', code: 'Delete' })
	const undo = () =>
		fireAction({ type: 'keydown', ctrlKey: true, code: 'KeyZ' })
	const redo = () =>
		fireAction({
			type: 'keydown',
			ctrlKey: true,
			shiftKey: true,
			code: 'KeyZ',
		})
	const zoomIn = ({ event }) =>
		fireAction({
			clientX: event.clientX,
			clientY: event.clientY,
			type: 'wheel',
			deltaY: +1,
		})
	const zoomOut = ({ event }) =>
		fireAction({
			clientX: event.clientX,
			clientY: event.clientY,
			type: 'wheel',
			deltaY: -1,
		})

	engine.setModel(model)

	return (
		<Container fluid>
			<Row>
				<Col md={2} className="sidebar resources-list">
					<ResourcesList />
				</Col>
				<Col>
					<Row>
						<ButtonToolbar className="my-2">
							<ButtonGroup className="mr-2" aria-label="First group">
								<Button onClick={autoAlignNodes}>Auto-align</Button>
							</ButtonGroup>
							<ButtonGroup className="mr-2" aria-label="First group">
								<Button onClick={exportTemplateData}>Export Template</Button>
							</ButtonGroup>
							<ButtonGroup className="mr-2" aria-label="First group">
								<Button onClick={saveDiagram}>Save Diagram</Button>
							</ButtonGroup>
							<ButtonGroup className="mr-2" aria-label="First group">
								<Button onClick={loadDiagram}>Load Diagram</Button>
							</ButtonGroup>
						</ButtonToolbar>
					</Row>
					<Row>
						<div onDrop={onDrop} onDragOver={onDragOver} onContextMenu={show}>
							<CanvasWidget className="editor" engine={engine} />
						</div>
					</Row>
				</Col>
				<Col md={2} className="sidebar inspector">
					<Inspector engine={engine} />
				</Col>
			</Row>
			<ContextMenus
				duplicateSelected={duplicateSelected}
				cutSelected={cutSelected}
				copySelected={copySelected}
				pasteSelected={pasteSelected}
				deleteSelected={deleteSelected}
				undo={undo}
				redo={redo}
				zoomIn={zoomIn}
				zoomOut={zoomOut}
			/>
		</Container>
	)
}

export default Editor
