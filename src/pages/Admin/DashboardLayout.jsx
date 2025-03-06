import React, {useEffect, useState} from "react"
import {Header} from "./components/Header"
import AdminDashboard from "./AdminDashboard"
import UserManagement from "./UserManagement"
import {Sidebar} from "./components/Sidebar"
import ResumeMatching from "./ResumeMatching"
import {JobDescriptions} from "./components/JobDescriptions"
import JobCategories from "./components/JobCategories"

function DashboardLayout() {
	const [activeTab, setActiveTab] = useState("dashboard")
	const user = JSON.parse(localStorage.getItem("user"));
    
		useEffect(() => {
			if (!user || user.status === "INACTIVE" || user.role !== "ADMIN") {
			  // Redirect to login if not authenticated
			  window.location.href = "/login";
			}
		  }, []);
	 
	return (
		<div className="flex h-screen bg-gray-100 ">
			<Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className="flex-1 flex flex-col overflow-hidden">
				<Header />
				<main className="flex-1 overflow-y-auto p-4">
					{activeTab === "dashboard" && <AdminDashboard />}
					{activeTab === "users" && <UserManagement />}
					{activeTab === "jobcat" && <JobCategories />}
					{activeTab === "jobs" && <JobDescriptions />}
					{activeTab === "resumes" && <ResumeMatching />}
				</main>
			</div>
		</div>
	)
}

export default DashboardLayout
