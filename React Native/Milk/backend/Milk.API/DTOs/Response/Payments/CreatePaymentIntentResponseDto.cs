namespace Milk.API.DTOs.Response.Payments;

public class CreatePaymentIntentResponseDto
{
    public string PaymentId { get; set; } = string.Empty;
    public string PaymentIntentId { get; set; } = string.Empty;
    public string ClientSecret { get; set; } = string.Empty; // для фронта
    public string Amount { get; set; } = string.Empty;
    public string Currency { get; set; } = string.Empty;
}