// Dashboard.jsx (Main Wrapper)
import React, { useState, useEffect } from "react";
import Header from "./Header";
import ApplicationForm from "./ApplicationForm";
import ApplicationTable from "./ApplicationTable";
import {
  fetchApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../services/api";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { isAdmin } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: "",
  });

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    jobTitle: "",
    candidateName: "",
    status: "Applied",
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await fetchApplications();
        setApplications(data);
      } catch (error) {
        console.error("Failed to fetch applications", error);
      } finally {
        setLoading(false);
      }
    };
    loadApplications();
  }, []);

  const handleCreate = async () => {
    try {
      const newApplication = await createApplication(formData);
      setApplications([...applications, newApplication]);
      resetForm();
    } catch (error) {
      console.error("Failed to create application", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedApplication = await updateApplication(editId, formData);
      setApplications(
        applications.map((app) =>
          app._id === editId ? updatedApplication : app
        )
      );
      resetForm();
      setEditing(false);
    } catch (error) {
      console.error("Failed to update application:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteApplication(id);
      setApplications(applications.filter((app) => app._id !== id));
    } catch (error) {
      console.error("Failed to delete application", error);
    }
  };

  const resetForm = () =>
    setFormData({ jobTitle: "", candidateName: "", status: "Applied" });
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const startEditing = (application) => {
    setFormData({
      jobTitle: application.jobTitle,
      candidateName: application.candidateName,
      status: application.status,
    });
    setEditing(true);
    setEditId(application._id);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Header
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        isAdmin={isAdmin}
        // setIsAdmin={setIsAdmin}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        adminCredentials={adminCredentials}
        setAdminCredentials={setAdminCredentials}
      />

      <main className="flex-1 p-6 w-full">
        <ApplicationForm
          darkMode={darkMode}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={editing ? handleUpdate : handleCreate}
          editing={editing}
        />

        <ApplicationTable
          darkMode={darkMode}
          applications={applications}
          isAdmin={isAdmin}
          startEditing={startEditing}
          handleDelete={handleDelete}
        />
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Dashboard;
