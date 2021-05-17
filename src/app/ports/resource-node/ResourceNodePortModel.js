import { PortModel } from '@projectstorm/react-diagrams'
import ResourceNodeLinkModel from '../../links/resource-node/ResourceNodeLinkModel'

export default class ResourceNodePortModel extends PortModel {
	constructor(alignment) {
		super({
			type: 'resource',
			name: alignment,
			alignment: alignment,
		})
	}

	createLinkModel(factory) {
		let link = super.createLinkModel()
		if (!link && factory) {
			return factory.generateModel({})
		}
		return link || new ResourceNodeLinkModel()
	}

	getMainLink() {
		const links = Object.values(this.getLinks())
		return links.length > 0 ? links[0] : null
	}

	getConnectedNodes() {
		const links = Object.values(this.getLinks())
		const connectedNodes = links
			.filter((link) => link.sourcePort.options.id !== this.options.id)
			.map((link) => link.sourcePort.parent)

		return connectedNodes
	}

	canLinkToPort(port) {
		const sourceNode = this.getNode()
		const targetNode = port.getNode()

		const deps = sourceNode.getDependencies()
		return !deps.includes(targetNode)
	}
}
