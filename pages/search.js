import { useState } from "react";
import axios from "axios";

const Search = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/flights/search`, {
        params: { from, to, date },
      });
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights", error);
    }
  };

  return (
    <div>
      <h1>Search Flights</h1>
      <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="From" />
      <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="To" />
      <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" type="date" />
      <button onClick={handleSearch}>Search</button>
      {flights.length > 0 && <div>
        <h2>Flight Results</h2>
        <ul>
          {flights.map((flight, index) => (
            <li key={index}>{flight.route} - ${flight.price}</li>
          ))}
        </ul>
      </div>}
    </div>
  );
};

export default Search;
// write a code 
