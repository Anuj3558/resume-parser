import React, {useState} from "react"
import {Upload, Plus, FileText, Download, Trash2} from "lucide-react"

const JobDescriptions = () => {
	// Mock data
	const [categories] = useState([
		{id: "1", name: "Software Engineering", createdAt: "2023-05-15T10:30:00Z"},
		{id: "2", name: "Product Management", createdAt: "2023-06-20T14:45:00Z"},
		{id: "3", name: "Data Science", createdAt: "2023-07-10T09:15:00Z"},
		{id: "4", name: "UX Design", createdAt: "2023-08-05T11:20:00Z"},
	])

	const [jobDescriptions, setJobDescriptions] = useState([
		{
			id: "1",
			categoryId: "1",
			title: "Senior Frontend Developer",
			description:
				"We are looking for a Senior Frontend Developer with 5+ years of experience in React...",
			uploadedAt: "2023-09-10T08:30:00Z",
			fileName: "senior_frontend_dev_jd.pdf",
			type: "Created",
		},
		{
			id: "2",
			categoryId: "1",
			title: "Backend Engineer",
			description:
				"Backend Engineer with strong knowledge of Node.js, Express, and MongoDB...",
			uploadedAt: "2023-09-15T14:20:00Z",
			fileName: "backend_engineer_jd.pdf",
			type: "Allocated",
		},
		{
			id: "3",
			categoryId: "2",
			title: "Product Manager - Mobile Apps",
			description:
				"Product Manager with experience in mobile app development and user research...",
			uploadedAt: "2023-09-20T11:45:00Z",
			fileName: "product_manager_mobile_jd.pdf",
			type: "Created",
		},
		{
			id: "4",
			categoryId: "3",
			title: "Data Scientist",
			description:
				"Data Scientist with expertise in machine learning, statistical analysis, and Python...",
			uploadedAt: "2023-09-25T09:15:00Z",
			fileName: "data_scientist_jd.pdf",
			type: "Allocated",
		},
	])

	const [candidates, setCandidates] = useState([
		{
			id: "1",
			resumeId: "r1",
			candidateName: "John Smith",
			shortlisted: true,
			matchingScore: 85,
			reason: "Strong experience in React, Redux, and TypeScript. 6 years of frontend development experience.",
		},
		{
			id: "2",
			resumeId: "r2",
			candidateName: "Emily Johnson",
			shortlisted: true,
			matchingScore: 92,
			reason: "Perfect match for required skills. 8 years of experience with modern frontend frameworks.",
		},
		{
			id: "3",
			resumeId: "r3",
			candidateName: "Michael Brown",
			shortlisted: false,
			matchingScore: 65,
			reason: "Missing key experience with TypeScript and state management libraries.",
		},
		{
			id: "4",
			resumeId: "r4",
			candidateName: "Sarah Wilson",
			shortlisted: true,
			matchingScore: 78,
			reason: "Good match for core skills, but limited experience with required testing frameworks.",
		},
		{
			id: "5",
			resumeId: "r5",
			candidateName: "David Lee",
			shortlisted: false,
			matchingScore: 45,
			reason: "Insufficient experience and missing several key required skills.",
		},
	])

	const [selectedJob, setSelectedJob] = useState("1")
	const [resumeFiles, setResumeFiles] = useState([])
	const [showUploadFile, setShowUploadFile] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState("")
	const [jobTitle, setJobTitle] = useState("")
	const [jobFile, setJobFile] = useState(null)
	const [selectedFilter, setSelectedFilter] = useState("all")

	const handleAddJobDescription = () => {
		if (!selectedCategory || !jobTitle || !jobFile) return

		const newJobDescription = {
			id: Date.now().toString(),
			categoryId: selectedCategory,
			title: jobTitle,
			description: "Job description content would be extracted from the file...",
			uploadedAt: new Date().toISOString(),
			fileName: jobFile.name,
		}

		setJobDescriptions([...jobDescriptions, newJobDescription])
		setShowModal(false)
		setSelectedCategory("")
		setJobTitle("")
		setJobFile(null)
	}

	const handleDeleteJobDescription = (id) => {
		setJobDescriptions(jobDescriptions.filter((jd) => jd.id !== id))
	}

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		})
	}

	const getCategoryName = (categoryId) => {
		const category = categories.find((cat) => cat.id === categoryId)
		return category ? category.name : "Unknown Category"
	}

	const filteredJobDescriptions =
		selectedFilter === "all"
			? jobDescriptions
			: jobDescriptions.filter((jd) => jd.categoryId === selectedFilter)

	const handleUploadResumes = () => {
		// In a real application, this would upload the files to a server
		// and process them against the selected job description

		// Mock implementation: add random candidates
		if (resumeFiles.length > 0) {
			const newCandidates = resumeFiles.map((file, index) => ({
				id: `new-${Date.now()}-${index}`,
				resumeId: `r-new-${Date.now()}-${index}`,
				candidateName: file.name.split(".")[0].replace(/_/g, " "),
				shortlisted: Math.random() > 0.5,
				matchingScore: Math.floor(Math.random() * 60) + 40,
				reason:
					Math.random() > 0.5
						? "Good match for required skills, but limited experience."
						: "Missing some key required skills and experience.",
			}))

			setCandidates([...candidates, ...newCandidates])
			setShowUploadFile(false)
			setResumeFiles([])
		}
	}

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Job Descriptions</h1>
				<button
					onClick={() => setShowModal(true)}
					className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
				>
					<Plus size={20} className="mr-2" />
					Upload Job Description
				</button>
			</div>

			{/* Filter */}
			<div className="mb-6">
				<label
					htmlFor="categoryFilter"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Filter by Category
				</label>
				<select
					id="categoryFilter"
					value={selectedFilter}
					onChange={(e) => setSelectedFilter(e.target.value)}
					className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
				>
					<option value="all">All Categories</option>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
			</div>

			{/* Job Descriptions Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredJobDescriptions.map((job) => (
					<div
						key={job.id}
						className="bg-white rounded-lg shadow overflow-hidden"
					>
						<div className="p-5">
							<div className="flex justify-between items-start">
								<div className="flex items-center">
									<FileText
										size={24}
										className="text-indigo-600 mr-3"
									/>
									<h3 className="text-lg font-semibold">
										{job.title}
									</h3>
								</div>
								<div className="flex items-center">
									<span
										className={`font-semibold ${
											job.type === "Created"
												? "text-indigo-600 "
												: "text-green-500"
										} mr-4`}
									>
										{job.type}
									</span>
									<button
										onClick={() =>
											handleDeleteJobDescription(job.id)
										}
										className="text-red-600 hover:text-red-900"
									>
										<Trash2 size={18} />
									</button>
								</div>
							</div>
							<div className="mt-2">
								<span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
									{getCategoryName(job.categoryId)}
								</span>
							</div>
							<p className="mt-3 text-sm text-gray-600 line-clamp-3">
								{job.description}
							</p>
							<div className="mt-4 flex justify-between items-center">
								<span className="text-xs text-gray-500">
									Uploaded: {formatDate(job.uploadedAt)}
								</span>
								<button className="flex items-center text-indigo-600 hover:text-indigo-900 text-sm">
									<Download size={16} className="mr-1" />
									Download
								</button>
							</div>
						</div>
						<div className="bg-gray-50 px-5 py-3 border-t">
							<button
								onClick={setShowUploadFile}
								className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
							>
								Upload Resumes
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Upload Job Description Modal */}
			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 w-full max-w-md">
						<h2 className="text-xl font-semibold mb-4">
							Upload Job Description
						</h2>

						<div className="mb-4">
							<label
								htmlFor="category"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Job Category
							</label>
							<select
								id="category"
								value={selectedCategory}
								onChange={(e) => setSelectedCategory(e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							>
								<option value="">Select a category</option>
								{categories.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</select>
						</div>

						<div className="mb-4">
							<label
								htmlFor="jobTitle"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Job Title
							</label>
							<input
								type="text"
								id="jobTitle"
								value={jobTitle}
								onChange={(e) => setJobTitle(e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								placeholder="Enter job title"
							/>
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Upload File
							</label>
							<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
								<div className="space-y-1 text-center">
									<FileText
										size={24}
										className="mx-auto text-gray-400"
									/>
									<div className="flex text-sm text-gray-600">
										<label
											htmlFor="file-upload"
											className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
										>
											<span>Upload a file</span>
											<input
												id="file-upload"
												name="file-upload"
												type="file"
												className="sr-only"
												accept=".pdf,.doc,.docx"
												onChange={(e) => {
													if (
														e.target.files &&
														e.target.files[0]
													) {
														setJobFile(e.target.files[0])
													}
												}}
											/>
										</label>
										<p className="pl-1">or drag and drop</p>
									</div>
									<p className="text-xs text-gray-500">
										PDF, DOC, DOCX up to 10MB
									</p>
									{jobFile && (
										<p className="text-sm text-indigo-600">
											{jobFile.name}
										</p>
									)}
								</div>
							</div>
						</div>

						<div className="flex justify-end space-x-3">
							<button
								onClick={() => setShowModal(false)}
								className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
							>
								Cancel
							</button>
							<button
								onClick={handleAddJobDescription}
								className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
								disabled={!selectedCategory || !jobTitle || !jobFile}
							>
								Upload
							</button>
						</div>
					</div>
				</div>
			)}
			{showUploadFile && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 w-full max-w-md">
						<h2 className="text-xl font-semibold mb-4">Upload Resumes</h2>

						<div className="mb-4">
							<p className="text-sm text-gray-600 mb-2">
								Selected Job:{" "}
								<span className="font-medium">
									{
										jobDescriptions.find(
											(job) => job.id === selectedJob
										)?.title
									}
								</span>
							</p>

							<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
								<div className="space-y-1 text-center">
									<Upload
										size={24}
										className="mx-auto text-gray-400"
									/>
									<div className="flex text-sm text-gray-600">
										<label
											htmlFor="resume-upload"
											className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
										>
											<span>Upload files</span>
											<input
												id="resume-upload"
												name="resume-upload"
												type="file"
												className="sr-only"
												multiple
												accept=".pdf,.doc,.docx"
												onChange={(e) => {
													if (e.target.files) {
														setResumeFiles(
															Array.from(e.target.files)
														)
													}
												}}
											/>
										</label>
										<p className="pl-1">or drag and drop</p>
									</div>
									<p className="text-xs text-gray-500">
										PDF, DOC, DOCX up to 10MB each
									</p>
									{resumeFiles.length > 0 && (
										<div className="mt-2 text-sm text-indigo-600">
											<p>{resumeFiles.length} file(s) selected</p>
											<ul className="text-left mt-1 ml-4 list-disc">
												{resumeFiles
													.slice(0, 3)
													.map((file, index) => (
														<li key={index}>{file.name}</li>
													))}
												{resumeFiles.length > 3 && (
													<li>
														...and {resumeFiles.length - 3}{" "}
														more
													</li>
												)}
											</ul>
										</div>
									)}
								</div>
							</div>
						</div>

						<div className="flex justify-end space-x-3">
							<button
								onClick={() => {
									setShowUploadFile(false)
									setResumeFiles([])
								}}
								className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
							>
								Cancel
							</button>
							<button
								onClick={handleUploadResumes}
								className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
								disabled={resumeFiles.length === 0}
							>
								Process Resumes
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default JobDescriptions
