import React, {useState, useEffect} from "react"
import axios from "axios"
import {BASE_URL} from "../../constants"
const JobForm = ({job, onSubmit, onCancel}) => {
	const [categories, setCategories] = useState([])
	const [formData, setFormData] = useState({
		title: "",
		category: "",
		description: "",
		requirements: "",
		location: "",
		initiator: localStorage.getItem("user").id,
	})

	useEffect(() => {
		if (job) {
			setFormData({
				title: job.title,
				category: job.category,
				description: job.description,
				requirements: job.requirements,
				location: job.location,
				initiator: localStorage.getItem("user").id
			})
		}
		axios
			.get(`${BASE_URL}/job/job-categories`)
			.then((res) => setCategories(res.data))
	}, [job])

	const handleChange = (e) => {
		const {name, value} = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		onSubmit(formData)
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label
					htmlFor="title"
					className="block text-sm font-medium text-gray-700"
				>
					Job Title
				</label>
				<input
					type="text"
					id="title"
					name="title"
					value={formData.title}
					onChange={handleChange}
					required
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
				/>
			</div>

			<div>
				<label
					htmlFor="category"
					className="block text-sm font-medium text-gray-700"
				>
					Category
				</label>
				<select
					id="category"
					name="category"
					value={formData.category}
					default={`Select category`}
					onChange={handleChange}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
				>
					{categories.map((category) => (
						<option key={category.id} value={category.name}>
							{category.name}
						</option>
					))}
				</select>
			</div>

			<div>
				<label
					htmlFor="location"
					className="block text-sm font-medium text-gray-700"
				>
					Location
				</label>
				<input
					type="text"
					id="location"
					name="location"
					value={formData.location}
					onChange={handleChange}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
				/>
			</div>

			<div>
				<label
					htmlFor="description"
					className="block text-sm font-medium text-gray-700"
				>
					Job Description
				</label>
				<textarea
					id="description"
					name="description"
					rows={4}
					value={formData.description}
					onChange={handleChange}
					required
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
				/>
			</div>

			<div>
				<label
					htmlFor="requirements"
					className="block text-sm font-medium text-gray-700"
				>
					Requirements
				</label>
				<textarea
					id="requirements"
					name="requirements"
					rows={4}
					value={formData.requirements}
					onChange={handleChange}
					required
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
				/>
			</div>

			<div className="flex justify-end space-x-3 pt-4">
				<button
					type="button"
					onClick={onCancel}
					className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					Cancel
				</button>
				<button
					type="submit"
					className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					{job ? "Update" : "Add"} Job Description
				</button>
			</div>
		</form>
	)
}
export default JobForm
