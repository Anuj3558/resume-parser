import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Upload, FileText, Loader2, XCircle, CheckCircle2, AlertCircle, Trash2, ArrowRight } from 'lucide-react'
import { notification } from 'antd'
import axios from "axios"
import { GlassCard } from "./components/glowcard"
import { GlowButton } from "./components/glowbutton"

const UploadPage = () => {
  const [files, setFiles] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const navigate = useNavigate()

  const [api, contextHolder] = notification.useNotification()

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/files/list`)
      setUploadedFiles(response.data.files)
    } catch (error) {
      api.error({
        message: 'Error',
        description: 'Failed to fetch uploaded files',
        placement: 'topRight',
      })
      console.error('Error fetching files:', error)
    }
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const validateFiles = (fileList) => {
    return Array.from(fileList).filter(file => {
      if (file.type !== 'application/pdf') {
        api.warning({
          message: 'Invalid File Type',
          description: 'Only PDF files are allowed',
          placement: 'topRight',
        })
        return false
      }
      if (file.size > 10 * 1024 * 1024) {
        api.warning({
          message: 'File Too Large',
          description: 'File size should not exceed 10MB',
          placement: 'topRight',
        })
        return false
      }
      return true
    })
  }

  const handleFileDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const droppedFiles = validateFiles(e.dataTransfer.files)
    if (droppedFiles.length === 0) return
    
    setFiles(prevFiles => [...prevFiles, ...droppedFiles])
    api.success({
      message: 'Files Added',
      description: 'Files have been added successfully',
      placement: 'topRight',
    })
  }

  const handleFileSelect = (e) => {
    const selectedFiles = validateFiles(e.target.files)
    if (selectedFiles.length === 0) return
    
    setFiles(prevFiles => [...prevFiles, ...selectedFiles])
    api.success({
      message: 'Files Added',
      description: 'Files have been added successfully',
      placement: 'topRight',
    })
  }

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove))
    api.info({
      message: 'File Removed',
      description: 'File has been removed from the upload list',
      placement: 'topRight',
    })
  }

  const simulateProgress = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 5
      })
    }, 100)
    return interval
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      api.warning({
        message: 'No Files',
        description: 'Please select files to upload',
        placement: 'topRight',
      })
      return
    }

    setUploading(true)
    const progressInterval = simulateProgress()

    const formData = new FormData()
    files.forEach(file => formData.append('pdf', file))

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/files/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })

      clearInterval(progressInterval)
      setUploadProgress(100)
      setUploadedFiles(prev => [...prev, ...response.data.files])
      setFiles([])
      
      api.success({
        message: 'Upload Success',
        description: 'Files have been uploaded successfully',
        placement: 'topRight',
      })

      setTimeout(() => {
        setUploadProgress(0)
      }, 2000)
    } catch (error) {
      clearInterval(progressInterval)
      api.error({
        message: 'Upload Failed',
        description: 'Failed to upload files. Please try again.',
        placement: 'topRight',
      })
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteFile = async (filename) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/files/${filename}`)
      setUploadedFiles(prev => prev.filter(file => file.name !== filename))
      api.success({
        message: 'File Deleted',
        description: 'File has been deleted successfully',
        placement: 'topRight',
      })
    } catch (error) {
      api.error({
        message: 'Delete Failed',
        description: 'Failed to delete file',
        placement: 'topRight',
      })
      console.error('Delete error:', error)
    }
  }

  const handleProcessResumes = () => {
    navigate("/res")
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <>
      {contextHolder}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-4"
          >
            <h1 className="text-5xl  p  -11 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Resume Processing System
            </h1>
            <p className="text-lg text-gray-600">
              Upload your resumes and manage your documents efficiently
            </p>
          </motion.div>

          <GlassCard>
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Upload Resumes</h2>
              <motion.div
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                animate={{
                  borderColor: dragActive ? "rgb(59, 130, 246)" : "rgb(209, 213, 219)",
                  backgroundColor: dragActive ? "rgb(239, 246, 255)" : "transparent",
                }}
                className="relative block w-full rounded-xl border-2 border-dashed p-12 text-center"
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
                  <motion.div
                    animate={{
                      scale: dragActive ? 1.1 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Upload className="mx-auto h-12 w-12 text-blue-500" />
                  </motion.div>
                  <span className="mt-4 block text-sm font-medium text-gray-900">
                    {dragActive ? "Drop files here" : "Drop PDF files here, or click to upload"}
                  </span>
                </label>
              </motion.div>

              {files.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 space-y-4"
                >
                  <div className="space-y-4">
                    {files.map((file, index) => (
                      <motion.div
                        key={file.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-white/50"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <span className="font-medium">{file.name}</span>
                          <span className="text-sm text-gray-500">
                            {formatFileSize(file.size)}
                          </span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFile(index)}
                          className="text-red-500"
                        >
                          <XCircle className="h-5 w-5" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>

                  {uploadProgress > 0 && (
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-blue-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <p className="text-sm text-gray-500 text-right">{uploadProgress}%</p>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <GlowButton
                      onClick={handleUpload}
                      disabled={uploading}
                      className="flex-1"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 inline" />
                          Uploading...
                        </>
                      ) : (
                        "Upload Files"
                      )}
                    </GlowButton>
                    
                  </div>
                </motion.div>
              )}
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Uploaded Files</h2>
              {uploadedFiles.length > 0 ? (
                <div className="space-y-4">
                  {uploadedFiles.map((file) => (
                    <motion.div
                      key={file.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/50"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-500">
                            Uploaded {new Date(file.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <GlowButton
                          variant="secondary"
                          onClick={() => window.open(`${process.env.REACT_APP_BACKEND_URL}/files/pdf/${file.name}`, '_blank')}
                        >
                          View
                        </GlowButton>
                        <GlowButton
                          variant="danger"
                          onClick={() => handleDeleteFile(file.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </GlowButton>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-6"
                >
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No files uploaded</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Upload your first resume to get started
                  </p>
                </motion.div>
              )}
            </div>
          </GlassCard>
          <GlowButton
                      onClick={handleProcessResumes}
                      variant="primary"
                      className="flex items-center space-x-2"
                    >
                      <span>Process Resumes</span>
                      <ArrowRight className="h-4 w-4" />
                    </GlowButton>
        </motion.div>
      </div>
    </>
  )
}

export default UploadPage

