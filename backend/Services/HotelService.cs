using System;
using System.Collections.Generic;
using System.Linq;
using HotelBooking.Backend.Data;
using HotelBooking.Backend.Models;

namespace HotelBooking.Backend.Services;

public class HotelService
{
    private readonly List<Room> _rooms;
    private readonly List<Booking> _bookings = new();
    private readonly object _bookingLock = new();

    public HotelService()
    {
        _rooms = HotelData.Rooms;
    }

    public IEnumerable<Room> GetRooms() => _rooms;

    public Room? GetRoomById(int id) => _rooms.FirstOrDefault(r => r.Id == id);

    private static bool DatesOverlap(DateTime startA, DateTime endA, DateTime startB, DateTime endB)
    {
        return startA < endB && startB < endA;
    }

    private bool IsRoomAvailable(int roomId, DateTime checkIn, DateTime checkOut)
    {
        lock (_bookingLock)
        {
            return !_bookings.Any(b => b.RoomId == roomId && DatesOverlap(b.CheckIn, b.CheckOut, checkIn, checkOut));
        }
    }

    public IEnumerable<AvailabilityResponse> CheckAvailability(AvailabilityRequest request)
    {
        if (request.CheckIn == null || request.CheckOut == null)
        {
            return Array.Empty<AvailabilityResponse>();
        }

        var checkIn = request.CheckIn.Value.Date;
        var checkOut = request.CheckOut.Value.Date;
        var nights = (checkOut - checkIn).Days;

        if (nights <= 0)
        {
            return Array.Empty<AvailabilityResponse>();
        }

        return _rooms
            .Where(room => room.Capacity >= request.GuestCount && IsRoomAvailable(room.Id, checkIn, checkOut))
            .Select(room => new AvailabilityResponse
            {
                RoomId = room.Id,
                RoomName = room.Name,
                Description = room.Description,
                Capacity = room.Capacity,
                PricePerNight = room.PricePerNight,
                TotalNights = nights,
                TotalPrice = room.PricePerNight * nights,
                Amenities = room.Amenities,
                Images = room.Images
            })
            .ToList();
    }

    public BookingResponse? CreateBooking(BookingRequest request)
    {
        if (request.CheckIn == null || request.CheckOut == null)
        {
            return null;
        }

        var checkIn = request.CheckIn.Value.Date;
        var checkOut = request.CheckOut.Value.Date;

        if (checkOut <= checkIn)
        {
            return null;
        }

        var room = GetRoomById(request.RoomId);
        if (room == null || request.GuestCount > room.Capacity)
        {
            return null;
        }

        if (!IsRoomAvailable(room.Id, checkIn, checkOut))
        {
            return null;
        }

        var nights = (checkOut - checkIn).Days;
        var booking = new Booking
        {
            RoomId = room.Id,
            CheckIn = checkIn,
            CheckOut = checkOut,
            GuestCount = request.GuestCount,
            GuestName = request.GuestName,
            GuestEmail = request.GuestEmail,
            GuestPhone = request.GuestPhone,
            SpecialRequests = request.SpecialRequests,
            TotalPrice = nights * room.PricePerNight
        };

        lock (_bookingLock)
        {
            _bookings.Add(booking);
        }

        return new BookingResponse
        {
            BookingId = booking.BookingId,
            RoomName = room.Name,
            CheckIn = booking.CheckIn,
            CheckOut = booking.CheckOut,
            GuestCount = booking.GuestCount,
            TotalPrice = booking.TotalPrice
        };
    }
}
