using HotelBooking.Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelBooking.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoomsController : ControllerBase
{
    private readonly HotelService _hotelService;

    public RoomsController(HotelService hotelService)
    {
        _hotelService = hotelService;
    }

    [HttpGet]
    public IActionResult GetRooms()
    {
        var rooms = _hotelService.GetRooms();
        return Ok(rooms);
    }

    [HttpGet("{id}")]
    public IActionResult GetRoom(int id)
    {
        var room = _hotelService.GetRoomById(id);
        if (room == null)
        {
            return NotFound();
        }

        return Ok(room);
    }
}
