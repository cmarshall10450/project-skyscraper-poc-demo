import * as React from 'react'
import { PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams'
import { useContextMenu } from 'react-contexify'
import ResourceIcon from '../../../components/ResourceIcon'
import styled from '@emotion/styled'

export const Port = styled.div`
	width: 16px;
	height: 16px;
	z-index: 10;
	background: transparent;
	border-radius: 8px;
	cursor: pointer;
	transition: 0.25s;
	&:hover {
		background: rgba(0, 0, 0, 1);
	}
`

const ResourceNodeWidget = ({ node, engine, height, width }) => {
	const { show } = useContextMenu({
		id: 'resource',
	})

	const paddingY = 10
	const paddingX = 20

	return (
		<div
			onContextMenu={show}
			className="resource-node"
			style={{
				minHeight: height,
				minWidth: width,
				maxHeight: height * 1.5,
				maxWidth: width * 1.5,
				padding: `${paddingY}px ${paddingX}px`,
				background: node?.config?.colors?.backgroundColor || 'transparent',
				borderRadius: '10px',
				border: node.isSelected()
					? `4px solid ${node?.config?.colors?.borderColor || 'transparent'}`
					: '4px solid transparent',
				color: node?.config?.colors?.textColor || '#000',
				boxSizing: 'border-box',
				fontFamily: 'Segoe UI, Verdana, Helvetica, sans-serif',
			}}>
			<div>
				<ResourceIcon size={64} resourceType={node.type} />
				{/* Top ports */}
				<PortWidget
					style={{
						top: '-8px',
						left: 'calc(25% - 8px)',
						position: 'absolute',
					}}
					port={node.getPort(
						`${PortModelAlignment.TOP}-${PortModelAlignment.LEFT}`
					)}
					engine={engine}>
					<Port />
				</PortWidget>
				<PortWidget
					style={{
						top: '-8px',
						left: 'calc(50% - 8px)',
						position: 'absolute',
					}}
					port={node.getPort(PortModelAlignment.TOP)}
					engine={engine}>
					<Port />
				</PortWidget>
				<PortWidget
					style={{
						top: '-8px',
						left: 'calc(75% - 8px)',
						position: 'absolute',
					}}
					port={node.getPort(
						`${PortModelAlignment.TOP}-${PortModelAlignment.RIGHT}`
					)}
					engine={engine}>
					<Port />
				</PortWidget>

				{/* Bottom ports */}
				<PortWidget
					style={{
						bottom: '-8px',
						left: 'calc(25% - 8px)',
						position: 'absolute',
					}}
					port={node.getPort(
						`${PortModelAlignment.BOTTOM}-${PortModelAlignment.LEFT}`
					)}
					engine={engine}>
					<Port />
				</PortWidget>
				<PortWidget
					style={{
						bottom: '-8px',
						left: 'calc(50% - 8px)',
						position: 'absolute',
					}}
					port={node.getPort(PortModelAlignment.BOTTOM)}
					engine={engine}>
					<Port />
				</PortWidget>
				<PortWidget
					style={{
						bottom: '-8px',
						left: 'calc(75% - 8px)',
						position: 'absolute',
					}}
					port={node.getPort(
						`${PortModelAlignment.BOTTOM}-${PortModelAlignment.RIGHT}`
					)}
					engine={engine}>
					<Port />
				</PortWidget>

				{/* Left ports */}
				<PortWidget
					style={{
						top: 'calc(25% - 8px)',
						left: '-8px',
						position: 'absolute',
					}}
					port={node.getPort(
						`${PortModelAlignment.LEFT}-${PortModelAlignment.TOP}`
					)}
					engine={engine}>
					<Port />
				</PortWidget>
				<PortWidget
					style={{
						top: 'calc(50% - 8px)',
						left: '-8px',
						position: 'absolute',
					}}
					port={node.getPort(PortModelAlignment.LEFT)}
					engine={engine}>
					<Port />
				</PortWidget>
				<PortWidget
					style={{
						top: 'calc(75% - 8px)',
						left: '-8px',
						position: 'absolute',
					}}
					port={node.getPort(
						`${PortModelAlignment.LEFT}-${PortModelAlignment.BOTTOM}`
					)}
					engine={engine}>
					<Port />
				</PortWidget>

				{/* Right ports */}
				<PortWidget
					style={{
						top: 'calc(25% - 8px)',
						right: '-8px',
						position: 'absolute',
					}}
					port={node.getPort(
						`${PortModelAlignment.RIGHT}-${PortModelAlignment.TOP}`
					)}
					engine={engine}>
					<Port />
				</PortWidget>
				<PortWidget
					style={{
						top: 'calc(50% - 8px)',
						right: '-8px',
						position: 'absolute',
					}}
					port={node.getPort(PortModelAlignment.RIGHT)}
					engine={engine}>
					<Port />
				</PortWidget>
				<PortWidget
					style={{
						top: 'calc(75% - 8px)',
						right: '-8px',
						position: 'absolute',
					}}
					port={node.getPort(
						`${PortModelAlignment.RIGHT}-${PortModelAlignment.BOTTOM}`
					)}
					engine={engine}>
					<Port />
				</PortWidget>

				<p className="mb-0 mt-2 text-center">{node.name}</p>
			</div>
		</div>
	)
}

export default ResourceNodeWidget
