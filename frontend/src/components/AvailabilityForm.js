import { useState } from 'react';
import { checkAvailability } from '../services/api';

const AvailabilityForm = ({ onResults }) => {
  const [form, setForm] = useState({ checkIn: '', checkOut: '', guests: 1 });
  const [status, setStatus] = useState({ loading: false, message: '', error: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: name === 'guests' ? Number(value) : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, message: '', error: '' });

    try {
      const available = await checkAvailability({
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guestCount: form.guests,
      });

      onResults(available);
      setStatus({ loading: false, message: `${available.length} rooms available`, error: '' });
    } catch (error) {
      onResults([]);
      setStatus({ loading: false, message: '', error: error.message });
    }
  };

  return (
    <section className="availability-form section-card">
      <h2 className="section-title">Check availability</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Check-in
          <input type="date" name="checkIn" value={form.checkIn} onChange={handleChange} required />
        </label>
        <label>
          Check-out
          <input type="date" name="checkOut" value={form.checkOut} onChange={handleChange} required />
        </label>
        <label>
          Guests
          <input type="number" name="guests" value={form.guests} min="1" max="10" onChange={handleChange} required />
        </label>
        <button type="submit" disabled={status.loading}>
          {status.loading ? 'Checking…' : 'Check availability'}
        </button>
      </form>
      {status.error && <p className="status error">{status.error}</p>}
      {status.message && !status.error && <p className="status success">{status.message}</p>}
    </section>
  );
};

export default AvailabilityForm;
