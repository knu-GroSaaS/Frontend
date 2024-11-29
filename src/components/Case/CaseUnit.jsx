import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { deleteCase, getCase } from "../../apis/case/caseapi";
import LoadingSpinner from "../LoadingSpinner";

const CaseUnit = () => {
  const { id } = useParams(); // URL에서 케이스 ID를 가져옴
  const [post, setPost] = useState(null); // 케이스 데이터를 저장하는 상태 변수
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리하는 상태 변수
  const navi = useNavigate(); // 페이지 이동을 위한 네비게이션 훅

  // ID가 없는 경우, 잘못된 요청임을 알림
  if (!id) {
    return (
      <div className="text-center text-gray-600 mt-8">Invalid case ID.</div>
    );
  }

  // 서버에서 케이스 데이터를 가져오는 함수
  const getPost = async (id) => {
    try {
      console.log("Fetching case data...");
      const res = await getCase(id); // getCase API 호출
      setPost(res); // 가져온 데이터를 상태에 저장
      console.log("Fetched data:", res);
    } catch (error) {
      console.error("Failed to fetch case data:", error);
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  // 컴포넌트가 마운트되거나 ID가 변경될 때 데이터를 가져옴
  useEffect(() => {
    getPost(id);
  }, [id]);

  // 케이스 삭제 버튼 클릭 시 실행되는 함수
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this case?")) {
      try {
        await deleteCase(id); // deleteCase API 호출
        alert("Case deleted successfully."); // 삭제 성공 알림
        navi("/dashboard"); // 대시보드 페이지로 이동
      } catch (error) {
        console.error("Error deleting case:", error);
        alert("Failed to delete the case. Please try again."); // 삭제 실패 알림
      }
    }
  };

  // UTC 시간을 한국 표준시(KST)로 변환하는 함수
  const formatKST = (dateString) => {
    const date = new Date(dateString); // UTC 시간 문자열을 Date 객체로 변환
    const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC 기준 9시간 추가
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Seoul", // 한국 표준시 기준
    };
    return new Intl.DateTimeFormat("ko-KR", options).format(kstDate);
  };

  // 로딩 중일 때 로딩 스피너 표시
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  // 데이터가 없는 경우 에러 메시지 표시
  if (!post) {
    return (
      <div className="text-center text-gray-600 mt-8">Case data not found.</div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      {/* 케이스 상세 정보 */}
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {post.problemTitle} {/* 케이스 제목 */}
        </h1>

        {/* 케이스 상세 정보 */}
        <div className="mb-4">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Product:</span> {post.product}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Version:</span> {post.version}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Serial Number:</span>{" "}
            {post.serialNumber}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Severity:</span> {post.severity}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Status:</span> {post.caseStatus}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Created At:</span>{" "}
            {formatKST(post.createdAt)}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Updated At:</span>{" "}
            {formatKST(post.updatedAt)}
          </p>
        </div>

        {/* 편집 및 삭제 버튼 */}
        <div className="flex justify-center mt-6">
          <Link
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition"
            to={`/update/${id}`}
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
