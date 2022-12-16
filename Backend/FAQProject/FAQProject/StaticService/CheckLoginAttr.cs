using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using System;

namespace FAQProject.StaticService
{
    public class LoginCheckAttr : Attribute, IActionFilter
    {
        public string Action { get; set; }

        public void OnActionExecuted(ActionExecutedContext context)
        {

        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (context.HttpContext.User.Identity.IsAuthenticated)
            {
                var user = context.HttpContext.User.Identity.AdUserAttrText();
                var json = HalicEduDLL.Crypto.DecryptString(user, HalicEduDLL.SecretKey.GetKey("325410"));
                var adUserData = JsonConvert.DeserializeObject<HalicEduDLL.ADDUserAttribute>(json);
                var isValid = false;

                isValid = HalicEduDLL.AdLoginControl.LoginTest(adUserData.Email, adUserData.Password);

                if (!isValid)
                {
                    context.HttpContext.Response.StatusCode = 403;
                    throw new MethodAccessException("Yetkisiz İşlem");
                }
            }
        }

    }
}
