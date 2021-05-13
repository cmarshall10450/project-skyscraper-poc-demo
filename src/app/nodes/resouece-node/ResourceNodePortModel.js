import { PortModel, RightAngleLinkModel } from '@projectstorm/react-diagrams'

export default class ResourceNodePortModel extends PortModel {
	constructor(alignment) {
		super({
			type: 'resource',
			name: alignment,
			alignment: alignment,
		})
	}

	createLinkModel() {
		return new RightAngleLinkModel()
	}
}
