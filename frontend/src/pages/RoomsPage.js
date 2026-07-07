import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRooms } from '../services/api';
import RoomCard from '../components/RoomCard';
import AvailabilityForm from '../components/AvailabilityForm';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [available, setAvailable] = useState([]);

  useEffect(() => {
    fetchRooms()
      .then((data) => {
        setRooms(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="section-title">Rooms</h1>
      <AvailabilityForm onResults={setAvailable} />

      {available.length > 0 && (
        <section className="availability-results">
          <h3>Available rooms</h3>
          {available.map((room) => (
            <article key={room.roomId} className="availability-result">
              <h4>{room.roomName}</h4>
              <p>{room.description}</p>
              <p>
                {room.totalNights} nights · ${room.totalPrice.toFixed(0)} · Sleeps {room.capacity}
              </p>
              <Link to={`/rooms/${room.roomId}`}>
                <button type="button">Reserve this room</button>
              </Link>
            </article>
          ))}
        </section>
      )}

      {loading && <p>Loading rooms…</p>}
      {error && <p className="status error">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomsPage;
