using FAQProject.BindingModels;
using FAQProject.StaticService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FAQProject.Controllers.Base
{
    [Authorize]
    [LoginCheckAttr]
    public class GlobalIntegrationControllerBase : ControllerBase
    {
        public BaseResponseModel BaseResponseModel { get; set; } = new BaseResponseModel();
    }
}
