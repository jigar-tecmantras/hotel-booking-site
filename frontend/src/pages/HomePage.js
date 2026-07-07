import { useEffect, useState } from 'react';
import { fetchRooms } from '../services/api';
import RoomCard from '../components/RoomCard';
import AvailabilityForm from '../components/AvailabilityForm';

const heroGallery = [
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
];

const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    fetchRooms().then(setRooms).catch(() => setRooms([]));
  }, []);

  return (
    <div>
      <section className="hero">
        <p>Monterey • Coastal luxury</p>
        <h1>Azure Harbor Resort</h1>
        <p>
          A boutique escape overlooking Monterey Bay—sunrise balconies, artisan dining, and curated adventures for
          couples, families, and friends.
        </p>
        <button onClick={() => window.scrollTo({ top: 900, behavior: 'smooth' })}>View rooms</button>
        <div className="gallery">
          {heroGallery.map((image) => (
            <div key={image} className="hero-gallery">
              <img src={image} alt="Resort gallery" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title">Featured rooms</h2>
        <div className="grid grid-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      <section className="section-card">
        <h2 className="section-title">Resort amenities</h2>
        <div className="grid grid-3">
          {['Rooftop pool', 'Wellness spa', 'Coastal dining', 'Concierge adventures', 'Microbrewery', 'EV charging'].map(
            (amenity) => (
              <div key={amenity} className="section-card">
                <h3>{amenity}</h3>
                <p>Curated service and thoughtful touches complement every stay.</p>
              </div>
            )
          )}
        </div>
      </section>

      <AvailabilityForm onResults={setAvailableRooms} />

      {availableRooms.length > 0 && (
        <section className="availability-results">
          <h2 className="section-title">Available rooms</h2>
          {availableRooms.map((item) => (
            <div key={item.roomId} className="availability-result">
              <h4>{item.roomName}</h4>
              <p>{item.description}</p>
              <p>
                {item.totalNights} nights · ${item.totalPrice} total
              </p>
              <p>Capacity: {item.capacity}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default HomePage;
