// --------------------------------------------------------------------------
// <copyright file="HomeController.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="" date="2012.12.07">Created</change>
// </history>

namespace BetFollow.Controllers
{
    using System.Web.Mvc;
    using BetFollow.Infrastructure.Services;

    /// <summary>
    /// Home Controller.
    /// </summary>
    public class HomeController : Controller
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
    }
}
