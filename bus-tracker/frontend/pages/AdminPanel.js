import { useState, useEffect } from "react";
import axios from "axios";

function AdminPanel() {
  const [form, setForm] = useState({ busNumber: "", route: "", timing: "", seats: 40 });
  const [buses, setBuses] = useState([]);

  const token = localStorage.getItem("token");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addBus = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/bus/add", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Bus added successfully!");
      fetchBuses();
    } catch (err) {
      alert(err.response?.data?.msg || "Error adding bus");
    }
  };

  const fetchBuses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bus");
      setBuses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Panel 🚌</h1>

      {/* Add Bus Form */}
      <form onSubmit={addBus} className="bg-white p-4 rounded shadow mb-6 w-96">
        <h2 className="text-lg font-semibold mb-2">Add New Bus</h2>
        <input type="text" name="busNumber" placeholder="Bus Number"
          value={form.busNumber} onChange={handleChange}
          className="border p-2 w-full mb-2" required />
        <input type="text" name="route" placeholder="Route"
          value={form.route} onChange={handleChange}
          className="border p-2 w-full mb-2" required />
        <input type="text" name="timing" placeholder="Timing (e.g. 8:00 AM)"
          value={form.timing} onChange={handleChange}
          className="border p-2 w-full mb-2" required />
        <input type="number" name="seats" placeholder="Seats"
          value={form.seats} onChange={handleChange}
          className="border p-2 w-full mb-2" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Bus
        </button>
      </form>

      {/* Bus List */}
      <div className="bg-white p-4 rounded shadow w-full">
        <h2 className="text-lg font-semibold mb-2">All Buses</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Bus No.</th>
              <th className="border p-2">Route</th>
              <th className="border p-2">Timing</th>
              <th className="border p-2">Seats</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus._id}>
                <td className="border p-2">{bus.busNumber}</td>
                <td className="border p-2">{bus.route}</td>
                <td className="border p-2">{bus.timing}</td>
                <td className="border p-2">{bus.seats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;
