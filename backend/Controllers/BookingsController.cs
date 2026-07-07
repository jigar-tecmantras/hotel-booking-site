using HotelBooking.Backend.Models;
using HotelBooking.Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelBooking.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly HotelService _hotelService;

    public BookingsController(HotelService hotelService)
    {
        _hotelService = hotelService;
    }

    [HttpPost]
    public IActionResult CreateBooking([FromBody] BookingRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var checkIn = request.CheckIn?.Date;
        var checkOut = request.CheckOut?.Date;

        if (checkIn == null || checkOut == null)
        {
            return BadRequest("Check-in and Check-out dates are required.");
        }

        if (checkOut <= checkIn)
        {
            return BadRequest("Check-out must be after check-in.");
        }

        if (checkIn < DateTime.UtcNow.Date)
        {
            return BadRequest("Check-in cannot be in the past.");
        }

        var booking = _hotelService.CreateBooking(request);
        if (booking == null)
        {
            return Conflict(new { message = "Requested room is not available for the selected dates." });
        }

        return CreatedAtAction(
            actionName: nameof(RoomsController.GetRoom),
            routeValues: new { id = booking.RoomId },
            value: booking);
    }
}
