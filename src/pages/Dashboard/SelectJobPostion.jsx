import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BriefcaseIcon, FileTextIcon, AlertCircleIcon } from 'lucide-react';

const JobPositions = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  // Positions with corresponding job IDs
  const positions = [
    { id: 1, name: "Elasticsearch Architect and Designer" },
    { id: 2, name: "C++" },
    { id: 3, name: "Data Management Enterprise Software Architect" },
    { id: 4, name: "Dot Net" },
    { id: 5, name: "DevOps Architect" },
    { id: 6, name: "HR" },
    { id: 7, name: "QA Automation Engineer" },
    { id: 8, name: "Sr UI Developer" },
    { id: 9, name: "UX Designer" },
    { id: 10, name: "ML Architect" },
    { id: 11, name: "Postgres Architect and Database Designer" },
    { id: 12, name: "Python Developer" }
  ];

  const handlePositionSelect = async (jobId) => {
    setSelectedId(jobId);
    setIsProcessing(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/results/process-resume/${jobId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to process resumes');
      }

      setResults(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-6xl my-12 mx-auto px-4">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <BriefcaseIcon className="w-8 h-8 text-blue-600" />
            <span>Job Position Analyzer</span>
          </h2>
          <p className="text-gray-600 mt-2">Select a position to analyze resumes</p>
        </motion.div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 p-4 bg-red-50 rounded-lg flex items-center gap-3"
        >
          <AlertCircleIcon className="w-5 h-5 text-red-600" />
          <span className="text-red-600">{error}</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {positions.map((position, index) => (
          <motion.button
            key={position.id}
            onClick={() => handlePositionSelect(position.name)}
            disabled={isProcessing}
            className={`
              p-4 rounded-xl shadow-sm border
              transition-colors duration-200
              ${selectedId === position.id 
                ? 'bg-blue-600 border-blue-700 text-white' 
                : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-800'}
              ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
              flex flex-col items-center justify-center
              min-h-[100px] relative
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: isProcessing ? 1 : 1.02 }}
          >
            {isProcessing && selectedId === position.id && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full animate-ping" />
            )}
            <span className="font-medium text-center">{position.name}</span>
          </motion.button>
        ))}
      </div>

      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <FileTextIcon className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold">Analysis Results</h3>
            <span className="text-sm text-gray-500 ml-auto">
              {results.length} candidates processed
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium">Candidate</th>
                  <th className="text-left py-3 px-4 font-medium">Result</th>
                  <th className="text-left py-3 px-4 font-medium">Education</th>
                  <th className="text-left py-3 px-4 font-medium">GPA</th>
                  <th className="text-left py-3 px-4 font-medium">Summary</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">{result.response.name}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        result.response.result.toLowerCase() === 'pass' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {result.response.result}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span>{result.response.college}</span>
                        <span className="text-sm text-gray-500">
                          {result.response.degree}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{result.response.gpa}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {result.response.summary}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg flex items-center gap-3"
        >
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
          <span>Processing resumes...</span>
        </motion.div>
      )}
    </div>
  );
};

export default JobPositions;
