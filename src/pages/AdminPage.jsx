import React from "react";
import AdminForm from "../components/Admin/AdminForm";
import AdminSidebar from "../components/Admin/AdminSidebar";

const AdminPage = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <AdminForm />
    </div>
  );
};


export default AdminPage;
