import React, {useState, useEffect} from "react"

import {Plus, Search} from "lucide-react"
import {UserTable} from "./components/UserTable"
import {Modal} from "antd"
import {UserForm} from "./components/UserForm"
import EditUserForm from "./components/EditUserForm"

const UserManagement = () => {
	const [users, setUsers] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [currentUser, setCurrentUser] = useState(undefined)
	const [searchTerm, setSearchTerm] = useState("")
	const [isModalForEditOpen, setIsModalForEditOpen] = useState(false)

	const fetchUsers = async () => {
		try {
			const response = await fetch(
				`${
					process.env.REACT_APP_BACKEND_URL || "http://localhost:4000"
				}/user/getUsers`
			)
			const data = await response.json()
			setUsers(data)
		} catch (error) {
			console.error("Error fetching users:", error)
		}
	}

	useEffect(() => {
		fetchUsers()
	}, [isModalOpen])

	const handleAddUser = async () => {
		setCurrentUser(undefined)
		fetchUsers()
		setIsModalOpen(true)
	}

	const handleEditUser = async (user) => {
		setCurrentUser(user)
		fetchUsers()
		setIsModalForEditOpen(true)
	}

	const deleteUser = async (id) => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/user/deleteUser/${id}`,
				{
					method: "DELETE",
				}
			)
			const data = await response.json()
		} catch (error) {
			console.error("Error deleting users:", error)
		}
	}

	const handleDeleteUser = async (id) => {
		await deleteUser(id)
		await fetchUsers()
	}

	const handleToggleStatus = async (id) => {
		const response = await fetch(
			`${process.env.REACT_APP_BACKEND_URL}/user/updateUserStatus/${id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(),
			}
		)

		if (!response.ok) throw new Error("Failed to update user status")
		console.log("User status updated successfully")

		fetchUsers()
	}

	const handleSubmitUser = (userData) => {
		if (currentUser) {
			// Update existing user
			setUsers(
				users.map((user) =>
					user.id === currentUser.id ? {...user, ...userData} : user
				)
			)
		} else {
			// Add new user
			const newUser = {
				id: Math.max(0, ...users.map((u) => u.id)) + 1,
				...userData,
			}
			setUsers([...users, newUser])
		}
		setIsModalOpen(false)
	}

	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.role.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold text-gray-900">User Management</h1>
				<button
					onClick={handleAddUser}
					className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					<Plus className="mr-2 h-4 w-4" />
					Add User
				</button>
			</div>

			<div className="flex items-center rounded-md bg-white px-4 py-2 shadow-sm w-full md:w-96">
				<Search size={18} className="text-gray-500 mr-2" />
				<input
					type="text"
					placeholder="Search users..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="border-none outline-none w-full text-sm"
				/>
			</div>

			<div className="bg-white shadow rounded-lg overflow-hidden">
				<div className="p-4 border-b border-gray-200">
					<h2 className="text-lg font-medium text-gray-900">Users</h2>
					<p className="mt-1 text-sm text-gray-500">
						Manage user accounts and permissions
					</p>
				</div>
				<UserTable
					users={filteredUsers}
					onToggleStatus={handleToggleStatus}
					onEdit={handleEditUser}
					onDelete={handleDeleteUser}
				/>
			</div>

			<Modal
				visible={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				footer={null}
				title={"Add New User"}
			>
				<UserForm onSuccess={() => setIsModalOpen(false)} />
			</Modal>

			<Modal
				visible={isModalForEditOpen}
				onCancel={() => setIsModalForEditOpen(false)}
				footer={null}
				title="Edit User"
			>
				<EditUserForm
					user={currentUser}
					onEdit={() => {
						setIsModalForEditOpen(false)
						fetchUsers()
					}}
				/>
			</Modal>
		</div>
	)
}
export default UserManagement
