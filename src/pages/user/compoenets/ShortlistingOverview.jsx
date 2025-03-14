import {useState, useEffect} from "react"
import {CheckCircle, XCircle} from "lucide-react"
import axios from "axios"

const ShortlistingOverview = () => {
	const [analytics, setAnalytics] = useState({
		shortListed: 0,
		rejected: 0,
		categories: 0,
		descriptions: 0,
		candidates: 0,
		jobs: [],
	})

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const u = JSON.parse(localStorage.getItem("user"))
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND_URL}/api/user/analytics/${u.userId}`
				)
				console.log("Fetched Jobs:", response.data.jobs)
				setAnalytics(response.data)
			} catch (error) {
				console.error("Error fetching analytics data:", error)
			}
		}

		fetchAnalyticsData()
	}, [])

	return (
		<div className="bg-white rounded-lg shadow p-6">
			<h2 className="text-lg font-semibold mb-4">Shortlisting Overview</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{analytics.jobs && analytics.jobs.length > 0 ? (
					analytics.jobs.map((job, index) => (
						<div
							key={index}
							className="flex justify-between items-center p-4 border rounded-lg shadow-sm"
						>
							<div>
								<p className="font-medium">{job.title}</p>
								<div className="flex items-center mt-1">
									<CheckCircle
										size={16}
										className="text-green-500 mr-1"
									/>
									<span className="text-sm text-gray-500">
										{job.resumeMatches} shortlisted
									</span>
									<XCircle
										size={16}
										className="text-red-500 ml-3 mr-1"
									/>
									<span className="text-sm text-gray-500">
										{job.totalResumes - job.resumeMatches} rejected
									</span>
								</div>
							</div>
							<div className="w-16 h-16 relative">
								<div className="absolute inset-0 flex items-center justify-center">
									<span className="text-sm font-bold">
										{(
											(job.resumeMatches / job.totalResumes) *
											100
										).toFixed(1)}
										%
									</span>
								</div>
								<svg className="w-full h-full" viewBox="0 0 36 36">
									<path
										d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
										fill="none"
										stroke="#eee"
										strokeWidth="3"
									/>
									<path
										d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
										fill="none"
										stroke="#4ade80"
										strokeWidth="3"
										strokeDasharray={`${
											(job.resumeMatches / job.totalResumes) * 100
										}, 100`}
									/>
								</svg>
							</div>
						</div>
					))
				) : (
					<p className="text-gray-500 col-span-2">No job data available.</p>
				)}
			</div>
		</div>
	)
}

export default ShortlistingOverview
