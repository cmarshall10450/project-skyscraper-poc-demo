import React from 'react'
import iconMap from '../app/iconMap'

const ResourceIcon = (props) => {
	const { resourceType } = props

	const [namespace, type] = resourceType.split('/')
	const Icon = iconMap[namespace][type]
	return <Icon {...props} />
}

export default ResourceIcon
