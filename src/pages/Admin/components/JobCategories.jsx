import React, {useState} from "react"
import {Plus} from "lucide-react"
import JobCategoriesTable from "./JobCategoriesTable"
import AddEditCategoryModal from "./AddEditCategoryModal"

const JobCategories = () => {
	const [categories, setCategories] = useState([
		{id: "1", name: "Software Engineering", createdAt: "2023-05-15T10:30:00Z"},
		{id: "2", name: "Product Management", createdAt: "2023-06-20T14:45:00Z"},
		{id: "3", name: "Data Science", createdAt: "2023-07-10T09:15:00Z"},
		{id: "4", name: "UX Design", createdAt: "2023-08-05T11:20:00Z"},
	])

	const [showModal, setShowModal] = useState(false)
	const [newCategory, setNewCategory] = useState("")
	const [editingId, setEditingId] = useState(null)

	const handleAddCategory = () => {
		if (newCategory.trim() === "") return

		const newCategoryObj = {
			id: Date.now().toString(),
			name: newCategory,
			createdAt: new Date().toISOString(),
		}

		if (editingId) {
			setCategories(
				categories.map((cat) =>
					cat.id === editingId ? {...cat, name: newCategory} : cat
				)
			)
			setEditingId(null)
		} else {
			setCategories([...categories, newCategoryObj])
		}

		setNewCategory("")
		setShowModal(false)
	}

	const handleEditCategory = (category) => {
		setNewCategory(category.name)
		setEditingId(category.id)
		setShowModal(true)
	}

	const handleDeleteCategory = (id) => {
		setCategories(categories.filter((cat) => cat.id !== id))
	}

	const handleOpenModal = () => {
		setNewCategory("")
		setEditingId(null)
		setShowModal(true)
	}

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Job Categories</h1>
				<button
					onClick={handleOpenModal}
					className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
				>
					<Plus size={20} className="mr-2" />
					Add Category
				</button>
			</div>

			<JobCategoriesTable
				categories={categories}
				onEdit={handleEditCategory}
				onDelete={handleDeleteCategory}
			/>

			{showModal && (
				<AddEditCategoryModal
					newCategory={newCategory}
					setNewCategory={setNewCategory}
					editingId={editingId}
					handleAddCategory={handleAddCategory}
					setShowModal={setShowModal}
				/>
			)}
		</div>
	)
}

export default JobCategories
