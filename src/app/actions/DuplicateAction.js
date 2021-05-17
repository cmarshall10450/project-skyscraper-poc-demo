import { Action, InputType } from '@projectstorm/react-canvas-core'

export default class DuplicateAction extends Action {
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

	matchesInput = (event) => event.ctrlKey && event.code === 'KeyD'

	handleAction = () => {
		const model = this.engine.getModel()

		const clones = model
			.getSelectedEntities()
			.filter((entity) => !entity.isLocked())
			.map((entity) => entity.clone())

		model.clearSelection()

		clones.forEach((clone) => {
			clone.setPosition(clone.getX() + 150, clone.getY() + 150)
			model.addNode(clone)
			clone.setSelected(true)
		})

		this.engine.fireEvent({ nodes: clones }, 'componentsAdded')

		this.engine.repaintCanvas()
	}
}
