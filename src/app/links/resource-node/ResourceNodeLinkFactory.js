import { DefaultLinkFactory } from '@projectstorm/react-diagrams'
import ResourceNodeLinkModel from './ResourceNodeLinkModel'
import ResourceNodeLinkWidget from '../../widgets/resource-node/ResourceNodeLinkWidget'

export default class ResourceNodeLinkFactory extends DefaultLinkFactory {
	static NAME = 'resource-node-link'

	constructor() {
		super(ResourceNodeLinkFactory.NAME)
	}

	generateModel() {
		return new ResourceNodeLinkModel()
	}

	generateReactWidget(event) {
		return (
			<ResourceNodeLinkWidget link={event.model} diagramEngine={this.engine} />
		)
	}
}
