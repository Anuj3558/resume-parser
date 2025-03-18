import {React, useEffect, useState} from "react"
import axios from "axios"
import StatsCard from "./StatsCard"
import RecentActivities from "./RecentActivities"
import ShortlistingOverview from "./ShortlistingOverview"
import {Briefcase, FileText, Users, CheckCircle, XCircle} from "lucide-react"
const UserDashboard = () => {
	const [analytics, setAnalytics] = useState({
		shortListed: 0,
		rejected: 0,
		categories: 0,
		descriptions: 0,
		candidates: 0,
	})

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const u = JSON.parse(localStorage.getItem("user"))
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND_URL}/api/user/analytics/${u.userId}`
				)
				setAnalytics(response.data)
			} catch (error) {
				console.error("Error fetching analytics data:", error)
			}
		}

		fetchAnalyticsData()
	}, [])

	// Mock data
	const stats = [
		{
			title: "Job Categories",
			value: analytics?.categories,
			icon: <Briefcase size={24} />,
			color: "bg-blue-500",
		},
		{
			title: "Job Descriptions",
			value: analytics?.descriptions,
			icon: <FileText size={24} />,
			color: "bg-green-500",
		},
		{
			title: "Candidates",
			value: analytics?.candidates,
			icon: <Users size={24} />,
			color: "bg-purple-500",
		},
		{
			title: "Shortlisted",
			value: analytics?.shortListed,
			icon: <CheckCircle size={24} />,
			color: "bg-yellow-500",
		},
	]

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">Dashboard</h1>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				{stats.map((stat, index) => (
					<StatsCard key={index} stat={stats} />
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
				<ShortlistingOverview />
			</div>
		</div>
	)
}

export default UserDashboard
