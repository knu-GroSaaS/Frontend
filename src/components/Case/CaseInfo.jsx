import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editCase } from '../../apis/case/caseapi';
import axios from 'axios';

const CaseInfo = ({ editing = false }) => {
  const navigate = useNavigate();
  const { id: caseId } = useParams();
  const [formData, setFormData] = useState({
    problemTitle: '',
    product: '',
    version: '',
    serialNumber: '',
    severity: '',
  });
  const [originalData, setOriginalData] = useState(null);

  // 데이터가 변경되었는지 확인하는 함수
  const isEdited = () => {
    return (
      formData.problemTitle !== originalData?.problemTitle ||
      formData.product !== originalData?.product ||
      formData.version !== originalData?.version ||
      formData.serialNumber !== originalData?.serialNumber ||
      formData.severity !== originalData?.severity
    );
  };

  // API를 통해 기존 데이터 불러오기
  useEffect(() => {
    if (editing) {
      axios.get(`/api/board/${caseId}`).then((response) => {
        const caseData = response.data;
        setFormData({
          problemTitle: caseData.subject,
          product: caseData.product,
          version: caseData.version,
          serialNumber: caseData.description,
          severity: caseData.severity,
        });
        setOriginalData({
          problemTitle: caseData.subject,
          product: caseData.product,
          version: caseData.version,
          serialNumber: caseData.description,
          severity: caseData.severity,
        });
      });
    }
  }, [editing, caseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        // editCase API 호출
        await editCase(
          caseId,
          formData.product,
          formData.version,
          formData.problemTitle,
          formData.serialNumber, // description으로 사용
          1 // 실제로는 사용자 ID를 동적으로 설정
        );
        navigate(`/dashboard/cases/${caseId}`); // 수정 후 상세 페이지로 이동
      } else {
        // 새 케이스 생성 로직 필요
      }
    } catch (error) {
      console.error('Error updating case:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-[#D9D9D9] p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {editing ? 'Edit Case Information' : 'Create Case Information'}
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            disabled={!isEdited()}
          >
            {editing ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CaseInfo;
