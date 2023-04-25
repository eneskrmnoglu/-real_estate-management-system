using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stripe;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CheckoutController : ControllerBase
    {
        private readonly ILogger<CheckoutController> _logger;
        private readonly StripeClient _stripeClient;

        public CheckoutController(ILogger<CheckoutController> logger, StripeClient stripeClient)
        {
            _logger = logger;
            _stripeClient = stripeClient;
        }

        [HttpPost]
        public async Task<IActionResult> Checkout([FromBody] CheckoutRequest request)
        {
            try
            {
                // Ödeme işlemini gerçekleştirin.
                var paymentIntentService = new PaymentIntentService(_stripeClient);
                var options = new PaymentIntentCreateOptions
                {
                    PaymentMethod = request.PaymentMethodId,
                    Amount = Convert.ToInt64(request.Amount * 100), // Kuruş olarak belirtilmelidir.
                    Currency = "try",
                    Confirm = true,
                };
                var paymentIntent = await paymentIntentService.CreateAsync(options);

                // Ödeme işlemi başarılı mı?
                if (paymentIntent.Status == "succeeded")
                {
                    return Ok(new { success = true });
                }
                else
                {
                    return BadRequest(new { success = false });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ödeme sırasında hata oluştu.");
                return BadRequest(new { success = false });
            }
        }
    }

    public class CheckoutRequest
    {
        public string? PaymentMethodId { get; set; }
        public decimal Amount { get; set; }
    }

    public class StripeOptions
{
    public string? SecretKey { get; set; }

}
}