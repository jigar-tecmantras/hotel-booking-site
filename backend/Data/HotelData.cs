using System.Collections.Generic;
using HotelBooking.Backend.Models;

namespace HotelBooking.Backend.Data;

public static class HotelData
{
    public static List<Room> Rooms => new()
    {
        new Room
        {
            Id = 1,
            Name = "Sunrise Standard Room",
            Type = "Standard",
            Highlight = "Coastal views + king bed",
            Description = "Bright and airy room with coastal accents, a plush king bed, ergonomic workspace, and smart amenities for a restful stay.",
            Capacity = 2,
            PricePerNight = 180,
            Images = new List<string>
            {
                "https://images.unsplash.com/photo-1501117716987-c8e1ecb7e60c?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=800&q=80"
            },
            Amenities = new List<string>
            {
                "King size bed",
                "Smart lighting",
                "Mini fridge",
                "Rain shower",
                "Complimentary high-speed Wi-Fi"
            },
            IsFeatured = false
        },
        new Room
        {
            Id = 2,
            Name = "Coastal Deluxe Room",
            Type = "Deluxe",
            Highlight = "Private balcony + living area",
            Description = "Spacious suite-style room with separate seating, private balcony facing the ocean, and curated minibar.",
            Capacity = 3,
            PricePerNight = 260,
            Images = new List<string>
            {
                "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1442406964439-e46ab8eff7c4?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=800&q=80"
            },
            Amenities = new List<string>
            {
                "Balcony with ocean view",
                "Living area with sleeper sofa",
                "Deep soaking tub",
                "Espresso bar",
                "Complimentary bottled water"
            },
            IsFeatured = true
        },
        new Room
        {
            Id = 3,
            Name = "Oceanfront Suite",
            Type = "Suite",
            Highlight = "Panoramic terrace",
            Description = "Two-room suite with private terrace, curated art, and dedicated concierge service for elevated comfort.",
            Capacity = 4,
            PricePerNight = 420,
            Images = new List<string>
            {
                "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1551888413-37b7dde29d17?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80"
            },
            Amenities = new List<string>
            {
                "Separate bedroom + lounge",
                "Terrace with fire pit",
                "Private check-in",
                "Butler service",
                "In-suite dining"
            },
            IsFeatured = true
        }
    };
}
