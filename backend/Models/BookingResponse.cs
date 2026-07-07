namespace HotelBooking.Backend.Models;

public class BookingResponse
{
    public Guid BookingId { get; set; }
    public string RoomName { get; set; } = string.Empty;
    public DateTime CheckIn { get; set; }
    public DateTime CheckOut { get; set; }
    public int GuestCount { get; set; }
    public decimal TotalPrice { get; set; }
}
