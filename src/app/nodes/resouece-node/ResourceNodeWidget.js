import * as React from 'react'
import { PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams'
import { ResizableBox } from 'react-resizable'
import ResourceIcon from '../../../components/ResourceIcon'
import styled from '@emotion/styled'

export const Port = styled.div`
	width: 16px;
	height: 16px;
	z-index: 10;
	background: rgba(0, 0, 0, 0.5);
	border-radius: 8px;
	cursor: pointer;
	&:hover {
		background: rgba(0, 0, 0, 1);
	}
`

const ResourceNodeWidget = ({ node, engine, height, width }) => {
	return (
		<div
			className="resource-node"
			style={{
				height: height + 40,
				width: width + 80,
				background: node?.config?.colors?.backgroundColor || 'transparent',
				borderRadius: '10px',
				border: node.isSelected()
					? `4px solid ${node?.config?.colors?.borderColor || 'transparent'}`
					: 'none',
			}}>
			<div>
				<ResourceIcon size={64} resourceType={node.resourceType} />
				<PortWidget
					style={{
						top: (height + 40) / 2 - 8,
						left: -8,
						position: 'absolute',
					}}
					port={node.getPort(PortModelAlignment.LEFT)}
					engine={engine}>
					<Port />
				</PortWidget>
				<PortWidget
					style={{
						left: width + 80 - 8,
						top: (height + 40) / 2 - 8,
						position: 'absolute',
					}}
					port={node.getPort(PortModelAlignment.RIGHT)}
					engine={engine}>
					<Port />
				</PortWidget>
				<p className="mb-0 mt-2 text-center">{node.resourceName}</p>
			</div>
		</div>
	)
}

export default ResourceNodeWidget
