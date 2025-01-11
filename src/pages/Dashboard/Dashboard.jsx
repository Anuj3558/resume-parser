import React, { useState } from 'react';
import axios from 'axios';
import { FolderInput, FolderOutput, Loader } from 'lucide-react';
import ResultsDisplay from '../Result/Result';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Upload, FileText, ChevronRight, Download, CheckCircle, XCircle, Loader2 } from 'lucide-react';



const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf'
    );
    setFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(
      file => file.type === 'application/pdf'
    );
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    setUploading(true);
    const formData = new FormData();
    files.forEach(file => formData.append('pdf', file));

    try {
      const response = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/results', { state: { results: response.data } });
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload files. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <div className="animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Resume Processing System
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Upload your resumes and let AI analyze them for you
          </p>
        </div>

        <div className="mt-8">
          <div 
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                Drop PDF files here, or click to upload
              </span>
            </label>
          </div>

          {files.length > 0 && (
            <div className="mt-4 animate-slide-up">
              <h3 className="text-sm font-medium text-gray-900">Selected files:</h3>
              <ul className="mt-2 divide-y divide-gray-200 rounded-md border border-gray-200">
                {files.map((file, index) => (
                  <li key={index} className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    <div className="flex w-0 flex-1 items-center">
                      <FileText className="h-5 w-5 flex-shrink-0 text-gray-400" />
                      <span className="ml-2 w-0 flex-1 truncate">{file.name}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                    Processing...
                  </>
                ) : (
                  <>
                    Process Resumes
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const Dashboard = () => {
  const [inputDir, setInputDir] = useState('');
  const [outputDir, setOutputDir] = useState('');
  const [results, setResults] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcessFiles = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.post('http://localhost:400/upload', {
        inputDir,
        outputDir,
      });
      setResults(response.data.results);
    } catch (error) {
      console.error('Error processing files:', error);
      alert('Error processing files. Please try again.');
    }
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br pt-32 from-blue-50 to-indigo-50 p-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
      </div>
<UploadPage />
      <div className="relative mt-3" >
       

        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-white/20">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="inputDir" className="block text-sm font-medium text-gray-700">
                Input Directory
              </label>
              <div className="relative">
                <FolderInput className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="inputDir"
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/50 border border-gray-200 
                           text-gray-800 placeholder-gray-400
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none
                           transition-colors duration-200"
                  value={inputDir}
                  onChange={(e) => setInputDir(e.target.value)}
                  placeholder="/path/to/input/directory"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="outputDir" className="block text-sm font-medium text-gray-700">
                Output Directory
              </label>
              <div className="relative">
                <FolderOutput className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="outputDir"
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/50 border border-gray-200 
                           text-gray-800 placeholder-gray-400
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none
                           transition-colors duration-200"
                  value={outputDir}
                  onChange={(e) => setOutputDir(e.target.value)}
                  placeholder="/path/to/output/directory"
                />
              </div>
            </div>

            <button
              onClick={handleProcessFiles}
              disabled={isProcessing || !inputDir || !outputDir}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 
                       text-white rounded-lg font-medium shadow-lg shadow-blue-500/25 
                       hover:shadow-blue-500/40 transform hover:-translate-y-0.5 
                       transition-all duration-150 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              <div className="flex items-center justify-center space-x-2">
                {isProcessing && (
                  <Loader className="animate-spin h-5 w-5" />
                )}
                <span>{isProcessing ? 'Processing Files...' : 'Process Files'}</span>
              </div>
            </button>
          </div>

          {/* Status indicator */}
          {isProcessing && (
            <div className="mt-4 text-sm text-gray-600 text-center animate-pulse">
              Processing your files. Please wait...
            </div>
          )}
        </div>

        {/* Results section with animation */}
        {results.length > 0 && (
          <div className="mt-8 animate-fade-in">
            <ResultsDisplay results={results} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;