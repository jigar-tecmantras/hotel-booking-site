# Hotel Booking Site

Production-ready single-hotel experience featuring React frontend and ASP.NET Core backend.

## Structure
- `frontend/` – Create React App (with React Router) powering UI (Home, Rooms, Room Details, booking flow).
- `backend/` – ASP.NET Core 8 Web API exposing rooms, availability, and booking endpoints.

## Running Locally
1. **Backend**
   ```bash
   cd backend
   dotnet restore
   dotnet run
   ```
   The API listens on the default .NET ports (e.g., `https://localhost:7040`).

2. **Frontend**
   ```bash
   cd frontend
   npm install
   REACT_APP_API_BASE_URL=http://localhost:5040 npm start
   ```
   Use `REACT_APP_API_BASE_URL` to point to the backend if not serving them together.

## Features
- Hero-focused home page for Azure Harbor Resort with amenities carousel.
- Rooms listing page with cards for Standard, Deluxe, and Suite stays.
- Room details page with full gallery, amenities, and booking form.
- Check availability form that queries the ASP.NET Core API.
- Booking form collecting guest contact info, with confirmation messaging.
- RESTful backend services with in-memory room/booking storage (no auth).
- Swagger UI available during development (`/swagger`).

## Notes
- Backend uses singleton `HotelService` and in-memory lists for rooms/bookings.
- Booking conflict detection ensures no overlapping reservations.
- Frontend uses fetch-based helpers under `src/services/api.js`.
- React Router handles navigation between pages.
