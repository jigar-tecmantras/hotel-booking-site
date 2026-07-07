import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRoomDetails } from '../services/api';
import BookingForm from '../components/BookingForm';

const RoomDetailsPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    fetchRoomDetails(id)
      .then((data) => {
        setRoom(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading room details…</p>;
  }

  if (error) {
    return (
      <div>
        <p className="status error">{error}</p>
        <Link to="/rooms">
          <button type="button">Back to rooms</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="section-title">{room.name}</h1>
      <p className="section-card">{room.description}</p>
      <div className="grid grid-2" style={{ marginTop: '1.5rem' }}>
        <div>
          {room.images &&
            room.images.map((image, index) => (
              <img key={`${image}-${index}`} src={image} alt={`${room.name}-${index}`} style={{ marginBottom: '1rem' }} />
            ))}
        </div>
        <div>
          <section className="section-card">
            <h2>Highlights</h2>
            <p>
              {room.highlight}
            </p>
            <p>
              Capacity: {room.capacity} guests · ${room.pricePerNight.toFixed(0)} / night
            </p>
            <h3>Amenities</h3>
            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
              {room.amenities.map((amenity) => (
                <li key={amenity}>{amenity}</li>
              ))}
            </ul>
          </section>
          <BookingForm roomId={room.id} />
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
