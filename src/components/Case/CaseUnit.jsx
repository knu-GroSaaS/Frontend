import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { getCase } from "../../apis/case/caseapi";
import LoadingSpinner from "../LoadingSpinner";

const CaseUnit = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!post) {
    return <div>Case data not found.</div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold">{post.subject}</h1>
        <p className="text-lg">Product: {post.product}</p>
        <p>Version: {post.version}</p>
        <p>Status: {post.caseStatus}</p>
        <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
        <p>Updated At: {new Date(post.updatedAt).toLocaleString()}</p>
        <p>Description:</p>
        <p>{post.description}</p>
        <div>
          <Link className="btn btn-primary" to={`/dashboard/${id}/edit`}>
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaseUnit;
