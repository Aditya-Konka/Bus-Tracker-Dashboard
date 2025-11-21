function Dashboard() {
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Welcome, {role} 👋</h1>
      {role === "admin" ? (
        <p className="mt-2 text-blue-500">You can manage buses and routes here.</p>
      ) : (
        <p className="mt-2 text-green-500">You can view buses and timings.</p>
      )}
      <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
