namespace HotelBooking.Backend.Models;

public class Booking
{
    public Guid BookingId { get; set; } = Guid.NewGuid();
    public int RoomId { get; set; }
    public DateTime CheckIn { get; set; }
    public DateTime CheckOut { get; set; }
    public int GuestCount { get; set; }
    public string GuestName { get; set; } = string.Empty;
    public string GuestEmail { get; set; } = string.Empty;
    public string GuestPhone { get; set; } = string.Empty;
    public string SpecialRequests { get; set; } = string.Empty;
    public decimal TotalPrice { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
