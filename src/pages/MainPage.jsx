import { Link } from "react-router-dom";

const MainPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-[#d9d9d9]">
            <Link 
                to="/login" 
                className="bg-[#BEACEB] text-white text-xl font-bold py-4 px-8 rounded shadow-lg hover:bg-[#AFA5C8] transition duration-300"
            >
                Login
            </Link>
        </div>
    );
}

export default MainPage;
