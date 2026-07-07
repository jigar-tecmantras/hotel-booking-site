using System.ComponentModel.DataAnnotations;

namespace HotelBooking.Backend.Models;

public class AvailabilityRequest
{
    [Required]
    public DateTime? CheckIn { get; set; }

    [Required]
    public DateTime? CheckOut { get; set; }

    [Range(1, 10)]
    public int GuestCount { get; set; } = 1;
}
