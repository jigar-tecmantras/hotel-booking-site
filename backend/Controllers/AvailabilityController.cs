using HotelBooking.Backend.Models;
using HotelBooking.Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelBooking.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AvailabilityController : ControllerBase
{
    private readonly HotelService _hotelService;

    public AvailabilityController(HotelService hotelService)
    {
        _hotelService = hotelService;
    }

    [HttpPost]
    public IActionResult CheckAvailability([FromBody] AvailabilityRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var checkIn = request.CheckIn?.Date;
        var checkOut = request.CheckOut?.Date;
        if (checkIn == null || checkOut == null)
        {
            return BadRequest("Check-in and check-out dates are required.");
        }

        if (checkOut <= checkIn)
        {
            return BadRequest("Check-out must be after check-in.");
        }

        if (checkIn < DateTime.UtcNow.Date)
        {
            return BadRequest("Check-in cannot be in the past.");
        }

        if (request.GuestCount < 1)
        {
            return BadRequest("Guest count must be at least 1.");
        }

        var availability = _hotelService.CheckAvailability(request);
        return Ok(availability);
    }
}
