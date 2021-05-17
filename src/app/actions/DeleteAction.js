import { Action, InputType } from '@projectstorm/react-canvas-core'
import { LinkModel, NodeModel } from '@projectstorm/react-diagrams'

export default class DeleteAction extends Action {
	constructor() {
		super({
			type: InputType.KEY_DOWN,
			fire: ({ event }) => {
				if (this.engine.getModel().isLocked()) return

				if (this.matchesInput(event)) {
					event.preventDefault()
					this.handleAction()
				}
			},
		})
	}

	matchesInput = (event) => event.code === 'Delete'

	handleAction = () => {
		const entities = this.engine
			.getModel()
			.getSelectedEntities()
			.filter((model) => !model.isLocked())

		this.fireEvent(entities)

		entities.forEach((model) => model.remove())

		this.engine.repaintCanvas()
	}

	fireEvent = (entities) => {
		const nodes = entities.filter((model) => model instanceof NodeModel)
		const links = entities.filter((model) => model instanceof LinkModel)
		const nodesLinks = nodes.reduce(
			(arr, node) => [...arr, ...node.getAllLinks()],
			[]
		)

		this.engine.fireEvent(
			{ nodes, links: [...nodesLinks, ...links] },
			'entitiesRemoved'
		)
	}
}
