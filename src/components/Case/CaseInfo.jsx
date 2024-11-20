import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editCase, createCase, getCase } from "../../apis/case/caseapi";

const CaseInfo = ({ editing = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    problemTitle: "",
    product: "",
    version: "",
    serialNumber: "",
    severity: "",
  });

  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    if (editing) {
      const fetchData = async () => {
        try {
          const res = await getCase(id);
          console.log(res);
          const { problemTitle, product, version, serialNumber, severity } =
            res;
          const fetchedData = {
            problemTitle,
            product,
            version,
            serialNumber,
            severity,
          };
          setFormData(fetchedData);
          setOriginalData(fetchedData);
        } catch (error) {
          console.error("Error fetching case data:", error);
        }
      };
      fetchData();
    }
  }, [editing, id]);

  const isEdited = () => {
    return formData !== originalData;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };
      return updatedFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await editCase(
          caseId,
          formData.problemTitle,
          formData.product,
          formData.version,
          formData.serialNumber,
          formData.severity
        );
        alert("Case updated successfully!"); // 성공 알림
      } else {
        await createCase(
          formData.problemTitle,
          formData.product,
          formData.version,
          formData.serialNumber,
          formData.severity
        );
        alert("Case created successfully!"); // 성공 알림
      }
      navigate("/dashboard"); // 대시보드로 이동
    } catch (error) {
      console.error("Error saving case:", error);
      alert("An error occurred while saving the case."); // 오류 알림
    }
  };

  const handleClose = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-[#D9D9D9] p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {editing ? "Update" : "Create"} Case
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Problem Title:</label>
            <input
              type="text"
              name="problemTitle"
              value={formData.problemTitle}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Product:</label>
            <input
              type="text"
              name="product"
              value={formData.product}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Version:</label>
            <input
              type="text"
              name="version"
              value={formData.version}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Serial Number:</label>
            <input
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Severity:</label>
            <select
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Severity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
              disabled={!isEdited() && editing}
            >
              {editing ? "Update" : "Create"}
            </button>
            <button
              type="button"
              className="w-full ml-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition duration-200"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaseInfo;
