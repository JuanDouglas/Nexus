using System.ComponentModel.DataAnnotations;

namespace Nexus.Web.Models;

public class Contact
{
    [Required]
    public string Name { get; set; }

    [EmailAddress]
    [Required]
    public string Email { get; set; }
    [Required]
    public string Company { get; set; }
    [Phone]
    public string? Phone { get; set; }

    [Required]
    public string Project { get; set; }
    public string? hCaptchaToken { get; set; }
}