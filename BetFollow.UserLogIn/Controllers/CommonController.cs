// --------------------------------------------------------------------------
// <copyright file="CommonController.cs" >

// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2012.12.07">Created</change>
// </history>

namespace Fanex.BetFollow.UserLogIn.Controllers
{
    using Fanex.BetFollow.Infrastructure.Constants;
    using Fanex.BetFollow.Infrastructure.Controllers;
    using Fanex.BetFollow.Infrastructure.Models;
    using Fanex.BetFollow.Infrastructure.Services;
    using Fanex.BetFollow.UserLogIn.Resources;
    using ONEbook.UM.Services;
    using ONEbook.UM.Services.Impl;
    using System.Web.Mvc;
    using System.Web.Security;

    public class CommonController : BaseController
    {
        private readonly IMaintenanceService _maintenanceService;

        public CommonController()
            : this(null)
        {
        }

        public CommonController(MaintenanceService maintenanceService)
        {
            _maintenanceService = maintenanceService ?? new MaintenanceService();
        }

        /// <summary>
        /// The denied access.
        /// </summary>
        /// <returns>The denied access result.</returns>
        public ActionResult AccessDenied()
        {
            var previousHttpMethod = string.IsNullOrEmpty(AppSession.CurrentHttpMethod) ?
                HttpMethodConstants.Get :
                AppSession.CurrentHttpMethod;
            switch (previousHttpMethod)
            {
                case HttpMethodConstants.Get:
                    return View("~/Areas/User/Common/AccessDenied.cshtml");
                default:
                    var errorInfo = new ResultModel
                    {
                        Code = ErrorCodeConstants.NoPermission,
                        Message = Labels.NoPermission
                    };
                    return Json(errorInfo, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult ErrorPage()
        {
            return View("~/Areas/User/Common/ErrorPage.cshtml");
        }

        /// <summary>
        /// Checking down time.
        /// </summary>
        /// <returns>Return result.</returns>
        public ActionResult Offline()
        {
            var isDownTime = _maintenanceService.IsUnderMaintenance();
            if (!isDownTime)
            {
                FormsAuthentication.RedirectToLoginPage();
            }

            var downTime = _maintenanceService.GetUnderMaintenanceTime();

            ViewBag.UmtFrom = downTime.From;
            ViewBag.UmtTo = downTime.To;

            return View("~/Areas/User/Common/Offline.cshtml");
        }
    }
}
