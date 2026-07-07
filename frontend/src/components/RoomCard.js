import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  return (
    <article className="room-card">
      <img src={room.images[0]} alt={room.name} />
      <div className="room-card-content">
        <h3>{room.name}</h3>
        <p>{room.highlight}</p>
        <p>
          <strong>${room.pricePerNight.toFixed(0)}</strong> / night · Sleeps {room.capacity}
        </p>
        <ul>
          {room.amenities.slice(0, 4).map((amenity) => (
            <li key={amenity}>{amenity}</li>
          ))}
        </ul>
        <Link to={`/rooms/${room.id}`}>
          <button type="button">View Details</button>
        </Link>
      </div>
    </article>
  );
};

export default RoomCard;
