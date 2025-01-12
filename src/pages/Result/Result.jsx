import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, CheckCircle, XCircle, FileText, Upload } from 'lucide-react';
import axios from 'axios';

const Notification = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -50, x: "50%" }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
    } border ${
      type === 'success' ? 'border-emerald-200' : 'border-red-200'
    } backdrop-blur-sm`}
  >
    <div className="flex items-center">
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5 mr-2" />
      ) : (
        <XCircle className="w-5 h-5 mr-2" />
      )}
      <p className="text-sm font-medium">{message}</p>
    </div>
  </motion.div>
);

const TableHeader = ({ children, ...props }) => (
  <motion.th
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider bg-gray-50"
    {...props}
  >
    {children}
  </motion.th>
);

const TableRow = ({ children, index }) => (
  <motion.tr
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="hover:bg-gray-50 border-b border-gray-100"
  >
    {children}
  </motion.tr>
);

export default function ResultsDisplay() {
  const [results, setResults] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleProcessFiles = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/results/process-resumes`);
      setResults(response.data.results);
      showNotification('Files processed successfully!');
    } catch (error) {
      console.error('Error processing files:', error);
      showNotification(error.response?.data?.error || 'Error processing files', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    try {
      const headers = ['Name', 'College', 'Degree', 'GPA', 'Result', 'Summary'];
      const csvContent = [
        headers.join(','),
        ...results.map(({ response }) => [
          `"${response.name}"`,
          `"${response.college}"`,
          `"${response.degree}"`,
          response.gpa,
          `"${response.result}"`,
          `"${response.summary.replace(/"/g, '""')}"`,
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume_results.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showNotification('CSV downloaded successfully!');
    } catch (error) {
      console.error('Error downloading CSV:', error);
      showNotification('Error downloading CSV', 'error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-3 pt-24 bg-gradient-to-br from-gray-50 via-white to-gray-50"
    >
      <AnimatePresence>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>

      <div className="sm:flex sm:items-center mb-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="sm:flex-auto"
        >
          <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient">
            Resume Processing Results
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            View and download analysis of processed resumes
          </p>
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-4"
        >
          <button
            onClick={handleProcessFiles}
            disabled={isProcessing}
            className="inline-flex items-center px-6 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isProcessing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Upload className="h-5 w-5" />
              </motion.div>
            ) : (
              <>
                <Upload className="-ml-1 mr-2 h-5 w-5" />
                Process Files
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            disabled={results.length === 0 || isProcessing}
            className="inline-flex items-center px-6 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Download className="-ml-1 mr-2 h-5 w-5" />
            Download CSV
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8"
      >
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="overflow-hidden rounded-2xl shadow-xl bg-white">
              <AnimatePresence>
                {results.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <TableHeader>Name</TableHeader>
                        <TableHeader>College</TableHeader>
                        <TableHeader>Degree</TableHeader>
                        <TableHeader>GPA</TableHeader>
                        <TableHeader>Status</TableHeader>
                        <TableHeader>Summary</TableHeader>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {results.map((result, index) => (
                        <TableRow key={index} index={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {result.response.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {result.response.college}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {result.response.degree}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {result.response.gpa}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              result.response.result === 'Success'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {result.response.result === 'Success' ? (
                                <CheckCircle className="mr-1 h-4 w-4" />
                              ) : (
                                <XCircle className="mr-1 h-4 w-4" />
                              )}
                              {result.response.result}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <div className="max-w-xs truncate" title={result.response.summary}>
                              {result.response.summary}
                            </div>
                          </td>
                        </TableRow>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-600">No results</h3>
                    <p className="mt-1 text-sm text-gray-500">Process some resumes to see results</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s linear infinite;
        }
      `}</style>
    </motion.div>
  );
}