using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/* 
<div className="mt-3">
                  <h2 className="sr-only">Product information</h2>
                  <p className="mt-10 text-2xl text-gray-900">
                    Ücret: {estate.price} ₺
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>

                  <div
                    className="text-base text-gray-700 space-y-6"
                    dangerouslySetInnerHTML={{ __html: estate.description }}
                  />
                </div>

                <form className=" flex justify-center">
                  <div className="mt-10">
                    <button
                      type="submit"
                      className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                    >
                      Favorilere Ekle
                    </button>
                  </div>
                </form>
*/

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
    public Guid UserId {get; set;}

}
