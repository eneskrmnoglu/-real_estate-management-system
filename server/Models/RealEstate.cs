using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class RealEstate 
{

    public Guid Id {get; set;} = Guid.NewGuid();
    public DateTime CreatedAt { get; set; } = DateTime.Now.Date;
    public string Name { get; set; } // Konut Adı
    public string ListingStatus { get; set; } // Konut Tipi
    public string PropertyType { get; set; } // İlan Türü (Satılık - Kiralık)
    public string NumberOfRooms { get; set; } // Oda Sayısı
    public int BuildingAge { get; set; } // İlan Yaşı
    public int GrossSquareMeters { get; set; } // Metrekare
    public int FloorNumber { get; set; } // Kaçıncı kat
    public string TotalFloors { get; set; } // Toplam kat sayısı
    public string HeatingType { get; set; } // Isıtma türü
    public string FurnishingStatus { get; set; } // Eşya durumu
    public string Deposit { get; set; } // Depozito
    public string Facade { get; set; } // Cephe
    public int BalconyCount { get; set; } // Balkon sayısı
    public string MonthlyFee { get; set; } // Aidat ücreti
    public int BathroomCount { get; set; } // Tuvalet sayısı
    public string ThumbnailUrl { get; set; } // Vitrin fotoğrafı
    public string City { get; set; } // Şehir
    public string PhotoUrl1 { get; set; } // Fotoğraf
    public string PhotoUrl2 { get; set; } // Fotoğraf
    public string PhotoUrl3 { get; set; } // Fotoğraf
    public string Description { get; set; } // İlan bilgileri
    public int Price { get; set; } // Fiyat

    [ForeignKey("User")]
    public Guid UserId {get; set;}
    public virtual User User {get; set;}

}
