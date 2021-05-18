import { NodeModel, PortModelAlignment } from '@projectstorm/react-diagrams'
import ResourceNodePortModel from '../../ports/resource-node/ResourceNodePortModel'

export default class ResourceNodeModel extends NodeModel {
	constructor(apiVersion, resourceType, resourceName, config = {}) {
		super({
			type: 'resource',
		})

		this.apiVersion = apiVersion
		this.resourceType = resourceType
		this.name = resourceName
		this.config = { ...config, templateData: {} }

		this.addPort(
			new ResourceNodePortModel(
				`${PortModelAlignment.TOP}-${PortModelAlignment.LEFT}`
			)
		)
		this.addPort(new ResourceNodePortModel(PortModelAlignment.TOP))
		this.addPort(
			new ResourceNodePortModel(
				`${PortModelAlignment.TOP}-${PortModelAlignment.RIGHT}`
			)
		)

		this.addPort(
			new ResourceNodePortModel(
				`${PortModelAlignment.BOTTOM}-${PortModelAlignment.LEFT}`
			)
		)
		this.addPort(new ResourceNodePortModel(PortModelAlignment.BOTTOM))
		this.addPort(
			new ResourceNodePortModel(
				`${PortModelAlignment.BOTTOM}-${PortModelAlignment.RIGHT}`
			)
		)

		this.addPort(
			new ResourceNodePortModel(
				`${PortModelAlignment.LEFT}-${PortModelAlignment.TOP}`
			)
		)
		this.addPort(new ResourceNodePortModel(PortModelAlignment.LEFT))
		this.addPort(
			new ResourceNodePortModel(
				`${PortModelAlignment.LEFT}-${PortModelAlignment.BOTTOM}`
			)
		)

		this.addPort(
			new ResourceNodePortModel(
				`${PortModelAlignment.RIGHT}-${PortModelAlignment.TOP}`
			)
		)
		this.addPort(new ResourceNodePortModel(PortModelAlignment.RIGHT))
		this.addPort(
			new ResourceNodePortModel(
				`${PortModelAlignment.RIGHT}-${PortModelAlignment.BOTTOM}`
			)
		)
	}

	serialize() {
		return {
			...super.serialize(),
			name: this.name,
			resourceType: this.resourceType,
			configuration: this.config,
		}
	}

	deserialize(event) {
		super.deserialize(event)
		this.name = event.data.name
		this.resourceType = event.data.resourceType
		this.config = event.data.configuration
	}

	getAllLinks() {
		return Object.values(this.getPorts())
			.map((port) => port.getMainLink())
			.filter((link) => !!link)
			.reduce((arr, link) => [...arr, link], [])
	}

	setTemplateDataProperty(property, value) {
		if (!this.templateData) {
			this.config = {
				...this.config,
				templateData: {},
			}
		}

		this.config = {
			...this.config,
			templateData: {
				...this.config.templateData,
				[property]: value,
			},
		}
	}

	getTemplateData() {
		return {
			...this.config.templateData,
			type: this.resourceType,
			apiVersion: this.apiVersion,
			dependsOn: this.getDependencies().map(
				(dep) => dep?.config?.templateData?.resourceName
			),
		}
	}

	getDependencies() {
		const ports = this.getPorts()
		return Object.values(ports).flatMap((port) => port.getConnectedNodes())
	}

	getConfig() {
		return this.config
	}
}
