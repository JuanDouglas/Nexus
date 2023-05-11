using BenjaminAbt.HCaptcha;
using Microsoft.AspNetCore.Mvc;
using Nexus.Web.Models;
using System.Net;

namespace Nexus.Web.Controllers;
public class HomeController : Controller
{
    private const string contactMail = "contact@mail.nexus-company.net";
    private protected readonly IHCaptchaApi captchaValidator;
    private protected readonly string hCaptchaKey;
    private protected readonly EmailMessageSender emailSender;
    public HomeController(IHCaptchaApi captchaValidator, IConfiguration config)
    {
        this.captchaValidator = captchaValidator;
        hCaptchaKey = config.GetSection("HCaptcha:SiteKey").Value ?? string.Empty;
        emailSender = new(config);
    }

    public IActionResult Index()
    {
        ViewBag.hCaptchaKey = hCaptchaKey;
        return View();
    }

    [HttpPost]
    [Route("Contact")]
    public async Task<IActionResult> ContactAsync(Contact contact)
    {
        ViewBag.hCaptchaKey = hCaptchaKey;

        if (!ModelState.IsValid)
            return View("Index", contact);

#if !DEBUG
        var captchaResp = await captchaValidator.Verify(hCaptchaKey, contact.hCaptchaToken);

        if (!(captchaResp?.Success ?? false))
            return StatusCode((int)HttpStatusCode.Unauthorized);
#endif

        await emailSender.SendEmailAsync($"Sou {contact.Name} da {contact.Company} é tenho o seguinte projeto: \n {contact.Project}",
            "Seu projeto",
            $"{contactMail},{contact.Email}", isHtml: false);

        string content = Properties.Resources.Contact
            .Replace("{name}", contact.Name)
            .Replace("{company}", contact.Company);

        await emailSender.SendEmailAsync(content, "Seu projeto", contact.Email, contactMail);

        return View("Index");
    }
}