import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import JobCategoriesTable from "./JobCategoriesTable";
import AddEditCategoryModal from "./AddEditCategoryModal";
import { BASE_URL } from "../../constants";

const API_BASE_URL = `${BASE_URL}/job/job-categories`;

const JobCategories = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [newCategory, setNewCategory] = useState("");
	const [editingId, setEditingId] = useState(null);

	/** ✅ Fetch Job Categories on Mount */
	useEffect(() => {
		const fetchCategories = async () => {
			setLoading(true);
			try {
				const res = await fetch(API_BASE_URL);
				const data = await res.json();

				// ✅ Ensure data follows correct schema
				const formattedData = data.map((category) => ({
					id: category.id,
					name: category.name,
					createdAt: category.createdAt,
				}));

				setCategories(formattedData);
			} catch (err) {
				setError("Failed to fetch categories");
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	/** ✅ Add or Edit Job Category */
	const handleSaveCategory = async () => {
		if (newCategory.trim() === "") return;

		const method = editingId ? "PUT" : "POST";
		const url = editingId ? `${API_BASE_URL}/${editingId}` : API_BASE_URL;

		try {
			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: newCategory }), // ✅ FIX: Send "name" instead of "title"
			});
			const updatedCategory = await res.json();

			if (editingId) {
				setCategories(categories.map(cat => (cat.id === editingId ? updatedCategory : cat)));
				setEditingId(null);
			} else {
				setCategories([...categories, updatedCategory]);
			}

			setNewCategory("");
			setShowModal(false);
		} catch (err) {
			console.error("Error saving category:", err);
		}
	};

	/** ✅ Open Modal */
	const handleOpenModal = () => {
		setNewCategory("");
		setEditingId(null);
		setShowModal(true);
	};

	/** ✅ Delete Job Category */
	const handleDeleteCategory = async (id) => {
		try {
			await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
			setCategories(categories.filter(cat => cat.id !== id));
		} catch (err) {
			console.error("Error deleting category:", err);
		}
	};

	/** ✅ Open Modal for Editing */
	const handleEditCategory = (category) => {
		setNewCategory(category.name);
		setEditingId(category.id);
		setShowModal(true);
	};

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

			{loading && <p>Loading...</p>}
			{error && <p className="text-red-500">{error}</p>}

			<JobCategoriesTable categories={categories} onEdit={handleEditCategory} onDelete={handleDeleteCategory} />

			{showModal && (
				<AddEditCategoryModal
					newCategory={newCategory}
					setNewCategory={setNewCategory}
					editingId={editingId}
					handleAddCategory={handleSaveCategory}
					setShowModal={setShowModal}
				/>
			)}
		</div>
	);
};

export default JobCategories;
