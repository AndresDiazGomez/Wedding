using Microsoft.AspNetCore.Http;

namespace Wedding.Module.Vote;

public class DeviceIdProvider : IDeviceIdProvider
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public DeviceIdProvider(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
    }

    public string GetDeviceId()
    {
        const string deviceIdCookieName = "x-device-id";

        string? deviceId = null;
        bool exists = _httpContextAccessor!.HttpContext?.Request.Cookies.TryGetValue(deviceIdCookieName, out deviceId) ?? false;

        if (!exists)
        {
            deviceId = Guid.NewGuid().ToString();
            if (_httpContextAccessor is not null && _httpContextAccessor.HttpContext is not null)
            {
                _httpContextAccessor.HttpContext.Response.Cookies.Append(
                    deviceIdCookieName,
                    deviceId,
                    new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = true,
                        SameSite = SameSiteMode.Strict,
                        Path = "/"
                    }
                );
            }
        }

        return deviceId!;
    }
}