// --------------------------------------------------------------------------
// <copyright file="HomeController.cs" >

// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="" date="2012.12.07">Created</change>
// </history>

namespace Fanex.BetFollow.Website.Controllers
{
    using System.Web.Mvc;
    using Fanex.BetFollow.Infrastructure.Controllers;
    using Fanex.BetFollow.Infrastructure.Services;

    /// <summary>
    /// Home Controller.
    /// </summary>
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            if (AppSession.CurrentUserMenu == null || AppSession.CurrentUser == null)
            {
                return new RedirectResult("~/UserLogin/SignIn", true);
            }
            else
            {
                return new RedirectResult("~/Home/Default");
            }
        }

        /// <summary>
        /// Access default page.
        /// </summary>
        /// <returns>Default page.</returns>
        public ActionResult Default()
        {
            if (AppSession.CurrentUserMenu == null || AppSession.CurrentUser == null)
            {
                return new RedirectResult("~/UserLogin/SignIn");
            }

            ViewBag.RedirectUrl = string.Empty;
            ViewBag.AccUsername = AppSession.CurrentUser.Username;
            if (!string.IsNullOrEmpty(AppSession.RedirectLink))
            {
                ViewBag.RedirectUrl = AppSession.RedirectLink;
                AppSession.RedirectLink = null;
            }

            return View("~/Areas/Home/Default.cshtml");
        }

        [ChildActionOnly]
        public PartialViewResult GettingUserMenu()
        {
            ViewBag.MenuItemList = CurrentSession.MenuItemList;
            return PartialView("~/Areas/Home/_Menu.cshtml");
        }

        public ActionResult BlankPage()
        {
            return View("~/Areas/Home/BlankPage.cshtml");
        }
    }
}
