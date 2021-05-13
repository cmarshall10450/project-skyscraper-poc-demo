import React from 'react'
import { Accordion, Card, ListGroup } from 'react-bootstrap'

import resourceConfig from '../app/resourceConfig.json'

const ResourcesList = () => {
	console.log(resourceConfig)
	return (
		<Accordion defaultActiveKey="0">
			{Object.entries(resourceConfig).map(([namespace, data], i) => (
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey={i.toString()}>
						{namespace}
					</Accordion.Toggle>
					<Accordion.Collapse eventKey={i.toString()}>
						<ListGroup flush>
							{data.resources
								.sort((a, b) => (a.label > b.label ? 1 : -1))
								.map((resource) => (
									<ListGroup.Item
										draggable
										onDragStart={(event) => {
											event.dataTransfer.setData(
												'storm-diagram-node',
												JSON.stringify({
													resourceType: `${namespace}/${resource.name}`,
													defaultPrefix: resource.defaultPrefix,
													nodeConfig: data.nodeConfig,
												})
											)
										}}
										action
										variant="light">
										{resource.label}
									</ListGroup.Item>
								))}
						</ListGroup>
					</Accordion.Collapse>
				</Card>
			))}
		</Accordion>
	)
}

export default ResourcesList
