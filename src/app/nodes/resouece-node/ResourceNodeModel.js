import { NodeModel, PortModelAlignment } from '@projectstorm/react-diagrams'
import ResourceNodePortModel from './ResourceNodePortModel'

export default class ResourceNodeModel extends NodeModel {
	resourceType = ''
	resourceName = ''
	config = {}

	constructor(resourceType, resourceName, config = {}) {
		super({
			type: 'resource',
		})

		this.resourceType = resourceType
		this.resourceName = resourceName
		this.config = config

		this.addPort(new ResourceNodePortModel(PortModelAlignment.LEFT))
		this.addPort(new ResourceNodePortModel(PortModelAlignment.RIGHT))
	}

	serialize() {
		return {
			...super.serialize(),
			resourceName: this.resourceName,
			resourceType: this.resourceType,
			configuration: this.config,
		}
	}
}
