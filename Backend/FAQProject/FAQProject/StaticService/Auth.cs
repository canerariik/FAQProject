using Newtonsoft.Json;
using System.Security.Claims;
using System.Security.Principal;

namespace FAQProject.StaticService
{
    public static class Auth
    {

        public static string AppCode(this IIdentity Identity)
        {
            ClaimsIdentity claimsIdentity = Identity as ClaimsIdentity;
            Claim claim = claimsIdentity?.FindFirst("AppCodes");

            return claim?.Value;
        }

        public static string AdUserAttrText(this IIdentity Identity)
        {
            ClaimsIdentity claimsIdentity = Identity as ClaimsIdentity;
            Claim claim = claimsIdentity?.FindFirst("ADUserAttributeEncripted");

            return claim?.Value;
        }

        public static HalicEduDLL.ADDUserAttribute AdUserAttr(this IIdentity Identity)
        {
            ClaimsIdentity claimsIdentity = Identity as ClaimsIdentity;
            Claim claim = claimsIdentity?.FindFirst("ADUserAttributeEncripted");
            var user = claim?.Value;
            var json = HalicEduDLL.Crypto.DecryptString(user, HalicEduDLL.SecretKey.GetKey("325410"));
            var adUserData = JsonConvert.DeserializeObject<HalicEduDLL.ADDUserAttribute>(json);

            return adUserData;
        }
    }
}
