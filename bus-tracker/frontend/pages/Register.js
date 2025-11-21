import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registration successful, please login!");
      navigate("/login");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input type="text" name="name" placeholder="Name"
          onChange={handleChange} className="border p-2 w-full mb-2" required />
        <input type="email" name="email" placeholder="Email"
          onChange={handleChange} className="border p-2 w-full mb-2" required />
        <input type="password" name="password" placeholder="Password"
          onChange={handleChange} className="border p-2 w-full mb-2" required />
        <select name="role" onChange={handleChange} className="border p-2 w-full mb-2">
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
