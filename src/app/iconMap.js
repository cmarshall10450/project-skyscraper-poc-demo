import * as icons from '../components/icons'

const iconMap = {
	'Microsoft.Analytics': {
		databricks: icons.DatabricksIcon,
		dataLakeStorageGen1: icons.DataLakeStorageGen1Icon,
		eventHubCluster: icons.EventHubClusterIcon,
		eventHub: icons.EventHubIcon,
		hdInsightCluster: icons.HDInsightClusterIcon,
		logAnalyticsWorkspace: icons.LogAnalyticsWorkspaceIcon,
		streamAnalyticsJob: icons.StreamAnalyticsJobIcon,
		synapseAnalytics: icons.SynapseAnalyticsIcon,
	},
	'Microsoft.Compute': {
		appPlan: icons.AppPlanIcon,
		autoManagedVm: icons.AutoManagedVmIcon,
		availabilitySet: icons.AvailabilitySetIcon,
		containerInstance: icons.ContainerInstancesIcon,
		disk: icons.DiskIcon,
		functionApp: icons.FunctionAppIcon,
		virtualMachine: icons.VirtualMachineIcon,
	},
}

export default iconMap
