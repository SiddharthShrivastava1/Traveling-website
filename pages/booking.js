import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings from backend
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <div key={index}>
            <h2>Booking {index + 1}</h2>
            <p>Flight: {booking.flight}</p>
            <p>Date: {booking.date}</p>
          </div>
        ))
      ) : (
        <p>No bookings available</p>
      )}
    </div>
  );
}
