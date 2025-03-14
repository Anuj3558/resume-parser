import React, {useState} from "react"
import {LayoutDashboard, Users, FileText, FileSearch, LogOut, Menu} from "lucide-react"
import {useNavigate} from "react-router-dom"

export const Sidebar = ({activeTab, setActiveTab}) => {
	const [isCollapsed, setIsCollapsed] = useState(false)

	const menuItems = [
		{id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} />},
		{id: "users", label: "User Management", icon: <Users size={20} />},
		{id: "jobcat", label: "Job Categories", icon: <Users size={20} />},
		{id: "jobs", label: "Job Descriptions", icon: <FileText size={20} />},
	]
	const navigate = useNavigate()
	const handleLogout = () => {
		localStorage.removeItem("token")
		localStorage.removeItem("user")
		navigate("/login")
	}
	return (
		<div
			className={`bg-white text-black ${
				isCollapsed ? "w-16" : "w-64"
			} flex flex-col transition-all duration-300 ease-in-out`}
		>
			{/* Toggle Button for Small Screens */}
			<div className="p-4 border-b border-gray-700 flex justify-between items-center">
				{!isCollapsed && (
					<h1 className="text-xl font-bold flex items-center">
						<LayoutDashboard className="mr-2" /> Admin Dashboard
					</h1>
				)}
				<button
					onClick={() => setIsCollapsed(!isCollapsed)}
					className="text-gray-300 hover:text-white focus:outline-none"
				>
					<Menu size={20} />
				</button>
			</div>

			{/* Navigation Menu */}
			<nav className="flex-1 overflow-y-auto py-4">
				<ul>
					{menuItems.map((item) => (
						<li key={item.id} className="px-2">
							<button
								onClick={() => setActiveTab(item.id)}
								className={`flex items-center w-full p-3 rounded-lg text-left ${
									activeTab === item.id
										? "bg-blue-600 text-white"
										: "text-black hover:bg-gray-200"
								}`}
							>
								<span className="mr-3">{item.icon}</span>
								{!isCollapsed && item.label}
							</button>
						</li>
					))}
				</ul>
			</nav>

			{/* Logout Button */}
			<div className="p-4 border-t border-gray-700">
				<button
					className="flex items-center text-gray-300 hover:text-black w-full"
					onClick={handleLogout}
				>
					<LogOut size={20} className="mr-3" />
					{!isCollapsed && "Logout"}
				</button>
			</div>
		</div>
	)
}
