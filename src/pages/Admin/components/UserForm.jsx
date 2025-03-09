import React, {useState, useEffect} from "react"

export const UserForm = ({user, onSuccess}) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		role: "",
		status: "ACTIVE",
	})

	useEffect(() => {
		if (user) {
			setFormData({
				name: "",
				email: "",
				role: "",
				status: "ACTIVE",
			})
		}
	}, [user])

	const handleChange = (e) => {
		const {name, value} = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const 	addUser = async (userData) => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/user/addUser`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			)

			if (!response.ok) {
				throw new Error(`Error: ${response.status} - ${response.statusText}`)
			}

			const data = await response.json()
			console.log("User added successfully:", data)

			return data
		} catch (error) {
			console.error("Error adding user:", error)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		addUser()
		onSuccess()
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
		>
			{/* Name */}
			<div>
				<label
					htmlFor="name"
					className="block text-sm font-medium text-gray-700"
				>
					Name
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					required
					className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
				/>
			</div>

			{/* Email */}
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700"
				>
					Email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					required
					className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
				/>
			</div>

			{/* Role */}
			<div>
				<label
					htmlFor="role"
					className="block text-sm font-medium text-gray-700"
				>
					Job Role
				</label>
				<input
					type="text"
					id="role"
					name="role"
					value={formData.role}
					onChange={handleChange}
					required
					className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
				/>
			</div>

			{/* Status */}
			<div>
				<label
					htmlFor="status"
					className="block text-sm font-medium text-gray-700"
				>
					Status
				</label>
				<select
					id="status"
					name="status"
					value={formData.status}
					onChange={handleChange}
					className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm appearance-none"
				>
					<option value="ACTIVE">ACTIVE</option>
					<option value="INACTIVE">INACTIVE</option>
				</select>
			</div>

			{/* Buttons */}
			<div className="flex justify-end space-x-3 pt-4">
				<button
					type="submit"
					className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					{user ? "Update" : "Add"} User
				</button>
			</div>
		</form>
	)
}
