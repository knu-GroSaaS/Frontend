import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { deleteCase, getCase } from "../../apis/case/caseapi";
import LoadingSpinner from "../LoadingSpinner";

const CaseUnit = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navi = useNavigate();

  if (!id) {
    return (
      <div className="text-center text-gray-600 mt-8">Invalid case ID.</div>
    );
  }

  const getPost = async (id) => {
    try {
      console.log("Fetching case data...");
      const res = await getCase(id); // getCase 함수 호출
      setPost(res); // res에 바로 데이터를 설정합니다.
      console.log("Fetched data:", res);
    } catch (error) {
      console.error("Failed to fetch case data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost(id);
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this case?")) {
      try {
        await deleteCase(id); // API 호출
        alert("Case deleted successfully.");
        navi("/dashboard");
      } catch (error) {
        console.error("Error deleting case:", error);
        alert("Failed to delete the case. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center text-gray-600 mt-8">Case data not found.</div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {post.subject}
        </h1>

        <div className="mb-4">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Product:</span> {post.product}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Version:</span> {post.version}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Status:</span> {post.caseStatus}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(post.createdAt).toLocaleString()}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Updated At:</span>{" "}
            {new Date(post.updatedAt).toLocaleString()}
          </p>
        </div>

        <div className="mb-6">
          <p className="font-semibold text-lg text-gray-700">Description:</p>
          <p className="text-gray-600">{post.description}</p>
        </div>

        <div className="flex justify-center mt-6">
          <Link
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition"
            to={{
              pathname: "/update",
              state: { id },
            }}
          >
            Edit
          </Link>
          <button
            className="ml-4 px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseUnit;
