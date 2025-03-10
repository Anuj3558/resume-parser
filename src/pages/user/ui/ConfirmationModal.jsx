import React from "react"

const ConfirmationModal = ({
	isOpen,
	onClose,
	onConfirm,
	title,
	message,
	confirmText,
	cancelText,
}) => {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-md">
				<h2 className="text-xl font-semibold mb-4 text-black">{title}</h2>
				<p className="text-sm text-gray-600 mb-6">{message}</p>
				<div className="flex justify-end space-x-3">
					<button
						onClick={onClose}
						className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
					>
						{cancelText || "Cancel"}
					</button>
					<button
						onClick={onConfirm}
						className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
					>
						{confirmText || "Confirm"}
					</button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmationModal