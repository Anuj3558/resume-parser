import React from 'react';
import { X } from 'lucide-react';

 const Modal = ({ isOpen, onClose, title, children, className }) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto `}>
      <div className={`flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0`}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div className={`inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle ${className}`}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-lg font-medium leading-6  text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mt-2">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;