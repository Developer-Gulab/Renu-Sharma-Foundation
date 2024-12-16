import { useEffect, useState, useCallback, useMemo } from "react";
import api from "../api/api";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import {
  Download,
  LogOut,
  FileText,
  Calendar,
  CheckCircle2,
  FileUp,
  Trash2,
  Link as LinkIcon,
  Loader,
} from "lucide-react";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const MAX_FILES = 4;
const ALLOWED_FILE_TYPES = {
  pdf: ["application/pdf"],
  images: ["image/jpeg", "image/png"],
};

const InternDashboard = () => {
  const [tasks, setTasks] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [weekNumber, setWeekNumber] = useState(1);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [userProgress, setUserProgress] = useState([]);
  const [submission, setSubmission] = useState({
    links: "",
    notes: "",
    files: [],
  });

  const navigate = useNavigate();
  const { user, setUser } = useUser();

  // Memoized file validation functions
  const validateFileSize = useMemo(
    () => (file) => {
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File ${file.name} exceeds 3MB size limit`);
      }
      return true;
    },
    []
  );

  const validateFileType = useMemo(
    () => (file) => {
      const isValidType = [
        ...ALLOWED_FILE_TYPES.pdf,
        ...ALLOWED_FILE_TYPES.images,
      ].includes(file.type);
      if (!isValidType) {
        throw new Error(`File ${file.name} must be PDF, JPEG, or PNG`);
      }
      return true;
    },
    []
  );

  const validateFileCounts = useMemo(
    () => (files) => {
      const pdfCount = files.filter((file) =>
        ALLOWED_FILE_TYPES.pdf.includes(file.type)
      ).length;
      const imageCount = files.filter((file) =>
        ALLOWED_FILE_TYPES.images.includes(file.type)
      ).length;

      if (pdfCount > 1) {
        throw new Error("Only 1 PDF file allowed");
      }
      if (imageCount > 3) {
        throw new Error("Maximum 3 images allowed");
      }
      if (files.length > MAX_FILES) {
        throw new Error(`Maximum ${MAX_FILES} files allowed`);
      }
      return true;
    },
    []
  );

  // Enhanced file handling
  const handleFileValidation = useCallback(
    (files) => {
      try {
        files.forEach(validateFileSize);
        files.forEach(validateFileType);
        validateFileCounts(files);
        return true;
      } catch (error) {
        setError(error.message);
        return false;
      }
    },
    [validateFileSize, validateFileType, validateFileCounts]
  );

  // Prevent default drag behaviors
  const preventDefaults = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Handle drag enter event
  const handleDragEnter = useCallback(
    (e) => {
      preventDefaults(e);
      setIsDragging(true);
    },
    [preventDefaults]
  );

  // Handle drag leave event
  const handleDragLeave = useCallback(
    (e) => {
      preventDefaults(e);
      setIsDragging(false);
    },
    [preventDefaults]
  );

  // Handle drop event
  const handleDrop = useCallback(
    (e) => {
      preventDefaults(e);
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      const allFiles = [...submission.files, ...droppedFiles];

      if (!handleFileValidation(allFiles)) {
        return;
      }

      setSubmission((prev) => ({
        ...prev,
        files: allFiles,
      }));
    },
    [preventDefaults, handleFileValidation, submission.files]
  );

  const handleSubmissionChange = useCallback(
    (e) => {
      const { name, value, files } = e.target;
      setError("");

      if (name === "files" && files) {
        const newFiles = Array.from(files);
        const allFiles = [...submission.files, ...newFiles];

        if (!handleFileValidation(allFiles)) {
          e.target.value = "";
          return;
        }

        setSubmission((prev) => ({
          ...prev,
          files: allFiles,
        }));
      } else {
        setSubmission((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    },
    [submission.files, handleFileValidation]
  );

  const removeFile = useCallback((index) => {
    setSubmission((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  }, []);

  // Enhanced certificate download function
  const downloadCertificate = useCallback(
    async (endpoint, prefix) => {
      try {
        setLoading(true);
        const { data, headers } = await api.get(endpoint, {
          params: { email: user?.email },
          responseType: "blob",
        });

        const fileName =
          headers["content-disposition"]
            ?.split("filename=")[1]
            ?.replace(/"/g, "") || `${user?.name}_${prefix}.pdf`;

        const blob = new Blob([data], {
          type: headers["content-type"] || "application/pdf",
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (err) {
        setError(`Error downloading ${prefix}: ${err.message}`);
        console.error(`Error downloading ${prefix}:`, err);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  const handleOfferLetterDownload = useCallback(() => {
    downloadCertificate("/certificate/offerLetter", "offerletter");
  }, [downloadCertificate]);

  const handleCompletionCertDownload = useCallback(async () => {
    console.log(userProgress);
    if (userProgress.length < 4) {
      await fetchUserSubmission();
      setError("ALL Week Should Be completed");
      console.log("hellllooooooo");
      return;
    }
    try {
      await api.post("/certificate/generateICC", user);
      await downloadCertificate(
        "/certificate/icc",
        "IntershipCompletionCertificate"
      );
    } catch (err) {
      setError("Error generating completion certificate");
      console.error("Error generating ICC:", err);
    }
  }, [user, downloadCertificate]);

  const handleLogout = useCallback(() => {
    Cookies.remove("authToken");
    setUser(null);
    navigate("/login");
  }, [navigate, setUser]);

  const fetchTasks = useCallback(
    async (week) => {
      try {
        setLoading(true);
        const response = await api.get("/task/particularweek", {
          params: {
            title: user?.department,
            weekNumber: week,
          },
        });
        setTasks(response.data.weekTask[0]);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    },
    [user?.department]
  );

  const fetchUserSubmission = async () => {
    try {
      const rsp = await api.get("/submission", {
        params: { userId: user.userId },
      });
      setUserProgress(rsp.data.data.completedWeek || []);
    } catch (error) {
      console.error("Error fetching user submission:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = useCallback(async () => {
    if (isSubmitting || isWeekCompleted(weekNumber)) return;

    try {
      if (!submission.links.trim()) {
        throw new Error("Please provide at least one project link");
      }
      if (!submission.notes.trim()) {
        throw new Error("Please provide some notes about your submission");
      }

      setIsSubmitting(true);
      setError("");
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("weekNumber", weekNumber);
      formData.append("links", submission.links.trim());
      formData.append("notes", submission.notes.trim());
      formData.append("departmentName", user?.department);
      formData.append("username", user?.name);

      submission.files.forEach((file) => {
        formData.append(
          ALLOWED_FILE_TYPES.pdf.includes(file.type) ? "files" : "images",
          file
        );
      });

      await api.post("/submission", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      alert("Submission Successful!");
      setSubmission({ links: "", notes: "", files: [] });
      setUploadProgress(0);
      // Fetch updated user progress after submission
      fetchUserSubmission();
    } catch (error) {
      setError(error.message || "Error submitting task");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, submission, weekNumber, user]);

  // Function to check if a week is completed
  const isWeekCompleted = (week) => {
    return userProgress.includes(week);
  };

  useEffect(() => {
    fetchUserSubmission();
  }, [user?.userId]);

  useEffect(() => {
    if (user?.department) {
      fetchTasks(weekNumber);
    }
  }, [weekNumber, user?.department, fetchTasks]);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const initializeDashboard = async () => {
      if (!user) {
        try {
          const response = await api.get("/user");
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
          navigate("/login");
        }
      }
    };

    initializeDashboard();
  }, [navigate, user, setUser]);

  if (isLoading || !tasks || !user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-purple-100">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-500 h-12 w-12 mx-auto mb-4 animate-spin"></div>
          <h1 className="text-2xl font-medium text-gray-700">
            Loading Dashboard...
          </h1>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <motion.header
        className="bg-blue-800 shadow-lg sticky top-0 z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-3">
            <FileText className="text-white" size={32} />
            <h1 className="text-2xl font-bold text-white">
              Intern Dashboard
            </h1>
          </div>
          <div className="flex flex-wrap gap-4">
            <motion.button
              onClick={handleOfferLetterDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              disabled={isLoading}
            >
              <Download size={18} />
              <span className="text-white">Offer Letter</span>
            </motion.button>
            <motion.button
              onClick={handleCompletionCertDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              disabled={isLoading}
            >
              <CheckCircle2 size={18} />
              <span className="text-white">Completion Cert</span>
            </motion.button>
            <motion.button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              whileHover={{ scale: 1.05 }}
            >
              <LogOut size={18} />
              <span className="text-white">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <motion.h2
          className="text-4xl font-bold mb-6 text-blue-800 text-center flex items-center justify-center space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Calendar size={36} className="text-purple-600" />
          <span>{tasks.weekTitle}</span>
        </motion.h2>

        <div className="flex justify-center mb-8">
          <Link
            to="/overview"
            className="px-6 py-2 rounded-full shadow-md bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition transform hover:scale-105"
          >
            Overview
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((week) => (
            <motion.button
              key={week}
              className={`py-3 px-6 rounded-full shadow-md transform transition 
                ${
                  isWeekCompleted(week)
                    ? "bg-green-500 text-white"
                    : weekNumber === week
                    ? "bg-blue-800 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                }
                ${isWeekCompleted(week) ? "cursor-not-allowed" : ""}`}
              onClick={() => setWeekNumber(week)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              // disabled={isWeekCompleted(week) || isLoading}
            >
              {isWeekCompleted(week) ? (
                <span className="flex items-center">
                  Week {week}{" "}
                  <CheckCircle2 className="ml-2 text-green-500" size={18} />
                </span>
              ) : (
                `Week ${week}`
              )}
            </motion.button>
          ))}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          >
            <span className="block sm:inline">{error}</span>
            <button
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setError("")}
            >
              <span className="sr-only">Dismiss</span>
              <svg
                className="h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </button>
          </motion.div>
        )}

        <AnimatePresence mode="sync">
          <motion.div
            key={weekNumber}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="border rounded-lg p-4 sm:p-6 shadow-lg bg-white"
          >
            {isWeekCompleted(weekNumber) ? (
              <div className="text-center text-lg text-gray-700">
                <CheckCircle2
                  className="mx-auto mb-2 text-green-500"
                  size={48}
                />
                Week {weekNumber} is already completed.
              </div>
            ) : (
              tasks.taskList.map((taskItem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-6 bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-2xl font-semibold text-blue-800 mb-2 flex items-center">
                    <FileUp className="mr-2 text-blue-500" size={24} />
                    {taskItem.taskTitle}
                  </h3>
                  <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                    {taskItem.taskDescription}
                  </p>
                  <ul className="space-y-2">
                    {taskItem.attributes.map((tsk, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="mt-1 text-blue-500">•</span>
                        <div>
                          <span className="font-bold">{tsk.label}:</span>{" "}
                          <span className="text-gray-700">
                            {tsk.taskDescription}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))
            )}
          </motion.div>

          <motion.div
            className="mt-8 p-4 sm:p-6 bg-gray-100 rounded-lg shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <FileUp className="mr-2 text-blue-500" size={24} />
              Submit Your Work
            </h3>

            {isSubmitting && (
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    className="bg-blue-800 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-center text-sm text-gray-600 mt-1">
                  {uploadProgress}% Uploaded
                </p>
              </div>
            )}

            <div className="space-y-6">
              {isWeekCompleted(weekNumber) ? (
                <div className="text-center text-lg text-gray-700 mb-4">
                  <p>
                    You have already completed the tasks for Week {weekNumber}.
                  </p>
                </div>
              ) : (
                <div>
                  <div>
                    <label className="text-lg text-gray-700 mb-2 flex items-center">
                      <LinkIcon className="mr-2 text-blue-500" size={20} />
                      Links (e.g., GitHub, project URLs):
                    </label>
                    <input
                      type="text"
                      name="links"
                      value={submission.links}
                      onChange={handleSubmissionChange}
                      className="w-full p-3 border-2 border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="https://github.com/your-project"
                      disabled={isSubmitting || isWeekCompleted(weekNumber)}
                    />
                  </div>

                  <div>
                    <label className="text-lg text-gray-700 mb-2 flex items-center">
                      <FileText className="mr-2 text-blue-500" size={20} />
                      Notes:
                    </label>
                    <textarea
                      name="notes"
                      value={submission.notes}
                      onChange={handleSubmissionChange}
                      className="w-full p-3 border-2 border-blue-100 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                      placeholder="Add any relevant notes about your submission"
                      disabled={isSubmitting || isWeekCompleted(weekNumber)}
                    />
                  </div>

                  <div>
                    <label className="text-lg text-gray-700 mb-2 flex items-center">
                      <FileUp className="mr-2 text-blue-500" size={20} />
                      Upload Files (1 PDF, 3 Images, max 3MB each):
                    </label>
                    <div
                      className="flex items-center justify-center w-full"
                      onDragEnter={handleDragEnter}
                      onDragOver={preventDefaults}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <label
                        className={`flex flex-col w-full h-32 border-4 border-dashed rounded-lg group transition-colors duration-200 
                          ${isDragging ? "border-blue-800 bg-blue-50" : ""}
                          ${
                            isSubmitting || isWeekCompleted(weekNumber)
                              ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                              : "border-blue-200 hover:bg-gray-100 hover:border-blue-300 cursor-pointer"
                          }`}
                      >
                        <div className="flex flex-col items-center justify-center pt-7">
                          <svg
                            className={`w-10 h-10 transition-colors duration-200 
                              ${
                                isSubmitting || isWeekCompleted(weekNumber)
                                  ? "text-gray-400"
                                  : "text-blue-400 group-hover:text-blue-600"
                              }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p
                            className={`pt-1 text-sm tracking-wider transition-colors duration-200
                            ${
                              isSubmitting || isWeekCompleted(weekNumber)
                                ? "text-gray-400"
                                : "text-gray-400 group-hover:text-blue-600"
                            }`}
                          >
                            {isSubmitting || isWeekCompleted(weekNumber)
                              ? "Upload not allowed"
                              : isDragging
                              ? "Drop files here"
                              : "Select files or drag and drop"}
                          </p>
                        </div>
                        <input
                          type="file"
                          multiple
                          name="files"
                          accept=".pdf,image/jpeg,image/png"
                          onChange={handleSubmissionChange}
                          className="opacity-0"
                          disabled={isSubmitting || isWeekCompleted(weekNumber)}
                        />
                      </label>
                    </div>

                    {submission.files.length > 0 && (
                      <motion.div
                        className="mt-4 space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {submission.files.map((file, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center justify-between p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex items-center space-x-2">
                              {file.type === "application/pdf" ? (
                                <FileText className="text-red-500" size={20} />
                              ) : (
                                <FileUp className="text-green-500" size={20} />
                              )}
                              <span className="text-sm text-gray-700 truncate max-w-xs">
                                {file.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <button
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-100"
                              disabled={
                                isSubmitting || isWeekCompleted(weekNumber)
                              }
                            >
                              <Trash2 size={20} />
                            </button>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    <motion.button
                      onClick={handleSubmit}
                      className="w-full py-3 px-4 bg-blue-800 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting || isWeekCompleted(weekNumber)}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="animate-spin" size={20} />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <FileUp size={20} />
                          <span>Submit Work</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InternDashboard;