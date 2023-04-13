using System;
using System.ComponentModel.DataAnnotations;

public class User 
{
    [Key]
    public Guid Id {get; set;} = Guid.NewGuid();
    public string Email {get; set;}
    public string Password { get; set; }
    public string NameSurname { get; set; }
    public string PhoneNumber { get; set; }
    public string PhotoUrl { get; set; }
}
