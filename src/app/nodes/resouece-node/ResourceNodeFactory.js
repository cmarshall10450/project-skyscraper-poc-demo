import * as React from 'react'
import ResourceNodeWidget from './ResourceNodeWidget'
import ResourceNodeModel from './ResourceNodeModel'
import { AbstractReactFactory } from '@projectstorm/react-canvas-core'

export default class ResourceNodeFactory extends AbstractReactFactory {
	constructor() {
		super('resource')
	}

	generateReactWidget(event) {
		return (
			<ResourceNodeWidget
				engine={this.engine}
				height={64}
				width={64}
				node={event.model}
			/>
		)
	}

	generateModel(event) {
		return new ResourceNodeModel()
	}
}
