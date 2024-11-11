import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import "./DoctorListPage.css";

export default function DoctorListPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load doctors. Please try again.");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="doctor-list-page">
      <h2>Doctor List</h2>

      {loading && <p>Loading doctors...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <ul className="doctor-list">
          {doctors.map((doctor) => (
            <li key={doctor.id} className="doctor-item">
              <h3>{doctor.name}</h3>
              <p>{doctor.specialty}</p>
              <p>Experience: {doctor.experience} years</p>
              <p>Rating: {doctor.rating}</p>
              <Link
                to={`/appointments/${doctor.id}`}
                className="book-appointment"
              >
                Book an Appointment
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
