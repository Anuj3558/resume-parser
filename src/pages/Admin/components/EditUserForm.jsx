import React, {useState, useEffect} from "react"

const EditUserForm = ({user, onEdit}) => {
	const [formData, setFormData] = useState({
		name: user.name || "",
		email: user.email || "",
		role: user.role || "",
		status: user.status || "ACTIVE",
	})

	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name,
				email: user.email,
				role: user.role,
				status: user.status,
			})
		}
	}, [user])

	const handleChange = (e) => {
		const {name, value} = e.target
		setFormData((prev) => ({...prev, [name]: value}))
	}
	const updateUser = async () => {
		try {
			console.log("user", formData)
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/user/updateUser/${user._id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			)

			if (!response.ok) throw new Error("Failed to update user")
			console.log("User updated successfully")
			onEdit()
		} catch (error) {
			console.error("Error updating user:", error)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		updateUser()
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label className="block text-sm font-medium text-gray-700">Name</label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					className="w-full px-3 py-2 border rounded-lg"
					required
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">Email</label>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					className="w-full px-3 py-2 border rounded-lg"
					required
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">Role</label>
				<input
					type="text"
					name="role"
					value={formData.role}
					onChange={handleChange}
					className="w-full px-3 py-2 border rounded-lg"
					required
				/>
			</div>

			<button
				type="submit"
				className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
			>
				Save Changes
			</button>
		</form>
	)
}

export default EditUserForm
