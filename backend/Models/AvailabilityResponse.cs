using System.Collections.Generic;

namespace HotelBooking.Backend.Models;

public class AvailabilityResponse
{
    public int RoomId { get; set; }
    public string RoomName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Capacity { get; set; }
    public decimal PricePerNight { get; set; }
    public int TotalNights { get; set; }
    public decimal TotalPrice { get; set; }
    public List<string> Amenities { get; set; } = new();
    public List<string> Images { get; set; } = new();
}
