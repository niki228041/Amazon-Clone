namespace Services; 
public class ServiceResponse
{
    public string AccessToken { get; set; } = null;
    public string RefreshToken { get; set; } = null;
    public string? Message { get; set; }
    public object? Payload { get; set; }
    public bool IsSuccess { get; set; }
    public IEnumerable<string>? Errors { get; set; }   
}