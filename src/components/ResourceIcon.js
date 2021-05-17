import React from 'react'
import iconMap from '../app/iconMap'

const ResourceIcon = (props) => {
	const { resourceType } = props

	const [namespace, type] = resourceType.split('/')
	const Icon = iconMap[namespace][type]
	return (
		<div className="resource-icon">
			<Icon {...props} />
		</div>
	)
}

export default ResourceIcon
