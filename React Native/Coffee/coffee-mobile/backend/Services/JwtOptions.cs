namespace Services;
public class JwtOptions
{
    public string Key { get; set; } = "";
    public string Issuer { get; set; } = "";
    public string Audience { get; set; } = "";
    public int AccessMinutes { get; set; }
    public int RefreshDays { get; set; }
}