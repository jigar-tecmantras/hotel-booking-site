using System.ComponentModel.DataAnnotations;

namespace HotelBooking.Backend.Models;

public class BookingRequest
{
    [Required]
    public int RoomId { get; set; }

    [Required]
    public DateTime? CheckIn { get; set; }

    [Required]
    public DateTime? CheckOut { get; set; }

    [Range(1, 10)]
    public int GuestCount { get; set; } = 1;

    [Required]
    public string GuestName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string GuestEmail { get; set; } = string.Empty;

    [Required]
    public string GuestPhone { get; set; } = string.Empty;

    public string SpecialRequests { get; set; } = string.Empty;
}
