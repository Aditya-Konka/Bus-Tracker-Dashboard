import { useState, useEffect } from "react";
import axios from "axios";

function StudentPanel() {
  const [buses, setBuses] = useState([]);
  const [filters, setFilters] = useState({ route: "", timing: "" });

  const token = localStorage.getItem("token");

  const fetchBuses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bus/search", {
        params: filters,
      });
      setBuses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const bookSeat = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/bus/book/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Seat booked successfully!");
      fetchBuses();
    } catch (err) {
      alert(err.response?.data?.msg || "Error booking seat");
    }
  };

  useEffect(() => {
    fetchBuses();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Available Buses 🚌</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by route"
          value={filters.route}
          onChange={(e) => setFilters({ ...filters, route: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Filter by timing"
          value={filters.timing}
          onChange={(e) => setFilters({ ...filters, timing: e.target.value })}
          className="border p-2"
        />
        <button
          onClick={fetchBuses}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Bus List */}
      <div className="bg-white p-4 rounded shadow w-full">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Bus No.</th>
              <th className="border p-2">Route</th>
              <th className="border p-2">Timing</th>
              <th className="border p-2">Seats</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus._id}>
                <td className="border p-2">{bus.busNumber}</td>
                <td className="border p-2">{bus.route}</td>
                <td className="border p-2">{bus.timing}</td>
                <td className="border p-2">{bus.seats}</td>
                <td className="border p-2">
                  {bus.seats > 0 ? (
                    <button
                      onClick={() => bookSeat(bus._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Book
                    </button>
                  ) : (
                    <span className="text-red-500">Full</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentPanel;
