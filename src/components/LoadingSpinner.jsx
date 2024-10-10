const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-16"> {/* 부모 컴포넌트에 맞게 높이 조정 */}
      <div className="animate-spin rounded-full border-t-2 border-b-2 border-gray-900 h-8 w-8" role="status"> {/* 스피너 크기 조정 */}
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;