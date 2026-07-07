import { useState } from 'react';
import { bookRoom } from '../services/api';

const BookingForm = ({ roomId, dates, onConfirmation }) => {
  const [form, setForm] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    specialRequests: '',
    guests: dates?.guestCount || 1,
    checkIn: dates?.checkIn || '',
    checkOut: dates?.checkOut || '',
  });
  const [status, setStatus] = useState({ loading: false, message: '', error: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: name === 'guests' ? Number(value) : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, message: '', error: '' });

    try {
      const bookingPayload = {
        roomId,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guestCount: form.guests,
        guestName: form.guestName,
        guestEmail: form.guestEmail,
        guestPhone: form.guestPhone,
        specialRequests: form.specialRequests,
      };

      const result = await bookRoom(bookingPayload);
      setStatus({ loading: false, message: `Booking confirmed (${result.bookingId})`, error: '' });
      onConfirmation(result);
    } catch (error) {
      setStatus({ loading: false, message: '', error: error.message });
    }
  };

  return (
    <section className="booking-form">
      <h2 className="section-title">Reserve your stay</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input name="guestName" value={form.guestName} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input name="guestEmail" value={form.guestEmail} onChange={handleChange} required type="email" />
        </label>
        <label>
          Phone
          <input name="guestPhone" value={form.guestPhone} onChange={handleChange} required />
        </label>
        <label>
          Guests
          <input name="guests" type="number" min="1" max="10" value={form.guests} onChange={handleChange} required />
        </label>
        <label>
          Check-in
          <input type="date" name="checkIn" value={form.checkIn} onChange={handleChange} required />
        </label>
        <label>
          Check-out
          <input type="date" name="checkOut" value={form.checkOut} onChange={handleChange} required />
        </label>
        <label>
          Special requests
          <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange} rows="3" />
        </label>
        <button type="submit" className="booking-submit" disabled={status.loading}>
          {status.loading ? 'Booking…' : 'Confirm booking'}
        </button>
      </form>
      {status.error && <p className="status error">{status.error}</p>}
      {status.message && !status.error && <p className="status success">{status.message}</p>}
    </section>
  );
};

export default BookingForm;
