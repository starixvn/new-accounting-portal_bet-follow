namespace Fanex.BetFollow.UserLogIn.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics.CodeAnalysis;
    using System.Linq;
    using System.Security.Cryptography;
    using System.Text;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.Security;
    using Common;
    using Common.Extensions;
    using Fanex.BetFollow.Infrastructure.Controllers;
    using Fanex.BetFollow.Infrastructure.Services;
    using Fanex.NAP.Core.Service.Impl;
    using Fanex.NAP.Core.Service.Interface;
    using Fanex.NAP.Core.Web.Session;
    using NAP.Core.Configuration;
    using NAP.Core.Context;
    using NAP.Core.Models;
    using NAP.Core.Models.ParameterObject;
    using NAP.Core.Web;
    using NAP.Core.Web.Auth;
    using NAP.Core.Web.Context;

    [SuppressMessage("Microsoft.Maintainability",
        "CA1502:AvoidExcessiveComplexity",
        Justification = "Reviewed. Suppression is OK here.")]
    public class UserLoginController : BaseController
    {
        private const string LogInViewURL = "~/Areas/User/LogIn/Index.cshtml";
        private readonly int _timeExipration = 30;
        private readonly ISecurityService securityService;
        private readonly IUserService userService;
        private readonly ICurrentSession currentSession;
        private readonly IGroupService groupService;
        private readonly ICurrentContext currentContext;
        private readonly HashAlgorithm hashAlgorithm = new SHA256Managed();

        public UserLoginController()
        {
            userService = new UserService();
            currentSession = new CurrentSession();
            securityService = new SecurityService();
            groupService = new GroupService();
            currentContext = new CurrentContext();
        }

        /// <summary>
        /// Login Page.
        /// </summary>
        /// <returns>Return view.</returns>
        public ActionResult Index()
        {
            return View(LogInViewURL);
        }

        /// <summary>
        /// Sign in action.
        /// </summary>
        /// <returns>Sign in result.</returns>
        public RedirectResult SignIn()
        {
            if (AppSession.CurrentUserMenu == null || AppSession.CurrentUser == null)
            {
                return new RedirectResult("~/UserLogin/Index", true);
            }
            else
            {
                return new RedirectResult("~/Home/Index");
            }
        }

        /// <summary>
        /// Lon In Action.
        /// </summary>
        /// <param name="username">The username.</param>
        /// <param name="password">The password.</param>
        /// <param name="loginToken">The login token.</param>
        /// <returns>The log in result.</returns>
        [ValidateAntiForgeryToken]
        [HttpPost]
        [SuppressMessage("StyleCop.CSharp.StylecopPlus.Rules",
            "SP2101:MethodMustNotContainMoreLinesThan",
            Justification = "Reviewed. Suppression is OK here."),
        SuppressMessage("Microsoft.Maintainability",
            "CA1506:AvoidExcessiveComplexity",
            Justification = "Reviewed. Suppression is OK here."),
        SuppressMessage("Microsoft.Maintainability",
            "CA1502:AvoidExcessiveComplexity",
            Justification = "Reviewed. Suppression is OK here.")]
        public ActionResult Index(string username, string password, string returnUrl)
        {
            if (!username.IsNullOrTrimEmpty() && !password.IsNullOrTrimEmpty())
            {
                var user = userService.Get(username.Trim());
                if (user != null)
                {
                    var hashPassword = GetHash(user.Password);

                    if (password == hashPassword)
                    {
                        if (CheckUserSitePermission(user))
                        {
                            // Check in user.
                            CheckIn(user);
                            CreateUserMenu(user);
                            CreateAuthInfo(user);

                            var redirectUrl = string.IsNullOrEmpty(returnUrl) ||
                                              returnUrl.IndexOf("Logout", StringComparison.CurrentCultureIgnoreCase) >=
                                              0
                                ? FormsAuthentication.DefaultUrl
                                : returnUrl;
                            return Redirect(redirectUrl);
                        }
                        // logging-in user belongs to no site
                        ViewBag.Message = ViewResources.You_have_no_authorization;
                    }
                    else
                    {
                        // wrong password
                        ViewBag.Message = ViewResources.Invalid_Username_or_Password;
                    }

                    ViewBag.Message = ViewResources.Invalid_Username_or_Password;
                    return View(LogInViewURL);
                }
                else
                {
                    // user doesn't exist
                    ViewBag.Message = ViewResources.Invalid_Username_or_Password;
                }
            }
            else
            {
                ViewBag.Message = "Invalid input!";
            }

            return View();
        }

        private bool CheckUserSitePermission(User user)
        {
            var group = user.Group == null ? null : groupService.Get(user.Group.Id);
            var siteLevelList = userService.GetSiteLevel(user.Id, NapSettings.Settings.Environment);
            // gets all sites of logging-in user

            return (group == null || group.IsActive) &&
                   siteLevelList.Any(x => x.Site.Id == NapSettings.Settings.SiteId && x.IsActive);
        }

        private void CheckIn(User user)
        {
            // check-in user
            var loginParameter = new LoginParameter
            {
                UserId = user.Id,
                SiteId = NapSettings.Settings.SiteId,
                NetSessionId = Session.SessionID,
                Ip = currentContext.IP,
                LoginDate = DateTime.Now,
                BrowserName = currentContext.BrowserName,
                CountryCode = currentContext.CountryCode,
                Domain = currentContext.DomainName,
                Platform = currentContext.Platform
            };

            var onUserId = securityService.Login(loginParameter);

            // saves user session
            currentSession.Level = userService.GetUserLevel(user.Id, NapSettings.Settings.SiteId);
            currentSession.UserId = user.Id;
            currentSession.Username = user.Username;
            currentSession.OnUserId = onUserId;
            currentSession.SessionId = Session.SessionID;
        }

        /// <summary>
        /// Indexes the specified user identifier.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <param name="onuserid">The on user identifier.</param>
        /// <param name="time">The time value.</param>
        /// <param name="redirectUrl">The redirect url.</param>
        /// <returns>The index page.</returns>
        [AllowAnonymous]
        [HttpGet]
        [SuppressMessage("StyleCop.CSharp.StylecopPlus.Rules",
            "SP2101:MethodMustNotContainMoreLinesThan",
            Justification = "Reviewed. Suppression is OK here.")]
        public ActionResult SSO(string userId, string onuserid, string time, Uri redirectUrl = null)
        {
            Session.Clear();

            var currentTime = securityService.GetTime();
            userId = Cryptography.CfsDeCrypt(userId.Replace(" ", "+"));
            onuserid = Cryptography.CfsDeCrypt(onuserid.Replace(" ", "+"));
            time = Cryptography.CfsDeCrypt(time.Replace(" ", "+"));
            var expiration = Convert.ToDateTime(currentTime) - Convert.ToDateTime(time);

            if (expiration.TotalSeconds <= _timeExipration)
            {
                //// do SSO check-in
                var criteria = new SSOLoginParameter
                {
                    UserId = Convert.ToInt32(userId),
                    SiteId = SiteId,
                    CheckOnUserId = Convert.ToInt32(onuserid),
                    OnUserId = 0,
                    IP = CurrentContext.IP,
                    NetSessionId = Session.SessionID,
                    LoginDate = DateTime.Now,
                    BrowserName = CurrentContext.BrowserName,
                    CountryCode = CurrentContext.CountryCode,
                    Domain = CurrentContext.DomainName,
                    Platform = CurrentContext.Platform
                };

                criteria.OnUserId = securityService.SSOLogin(criteria);

                //// do SSO check-in
                if (criteria.OnUserId != 0)
                {
                    var user = userService.Get(criteria.UserId);

                    //// saves user session & auth info
                    currentSession.UserId = user.Id;
                    currentSession.Username = user.Username;
                    currentSession.OnUserId = criteria.OnUserId;
                    currentSession.SessionId = Session.SessionID.ToString();
                    currentSession.Level = userService.GetUserLevel(user.Id, NapSettings.Settings.SiteId);

                    AppSession.CurrentUser = user;
                    CreateUserMenu(user);
                    CreateAuthInfo(user);
                    if (redirectUrl != null && !string.IsNullOrEmpty(redirectUrl.ToString()))
                    {
                        AppSession.RedirectLink = redirectUrl.ToString();
                    }
                    //// saves user session & auth info
                    return Redirect(FormsAuthentication.DefaultUrl);
                }
            }

            return Redirect(FormsAuthentication.LoginUrl);
        }

        /// <summary>
        /// Log out action.
        /// </summary>
        /// <returns>Log out result.</returns>
        [SuppressMessage("Microsoft.Design",
            "CA1031:DoNotCatchGeneralExceptionTypes",
            Justification = "Reviewed. Suppression is OK here.")]
        public ActionResult LogOut()
        {
            if (currentSession != null && currentSession.OnUserId != 0)
            {
                securityService.Logout(currentSession.OnUserId);
            }

            Session.Clear();
            Response.Cookies.Clear();
            FormsAuthentication.SignOut();

            return RedirectToAction("Index", "UserLogin");
        }

        /// <summary>
        /// Checks the user online status.
        /// </summary>
        /// <returns>The action result.</returns>
        [HttpPost]
        public ActionResult ReCheckLogIn()
        {
            var isKickedOut = NapSettings.Settings.EnableReCheckIn
               && securityService.ReCheckIn(currentSession.OnUserId, NapSettings.Settings.SiteId) > 0;
            return Json(isKickedOut);
        }

        private void CreateUserMenu(User user)
        {
            currentSession.MenuItemList = userService.GetMenuItem(
                                user.Id,
                                NapSettings.Settings.SiteId,
                                NapSettings.Settings.Environment,
                                true) as List<MenuItem>;
            AppSession.CurrentUserMenu = currentSession.MenuItemList;
        }

        /// <summary>
        /// Creates the authentication information.
        /// </summary>
        /// <param name="user">The user value.</param>
        private void CreateAuthInfo(User user)
        {
            AppSession.CurrentUser = user;
            var currentDomain = CurrentContext.CurrentDomain;
            var authInfo = new AuthInfo();

            authInfo.UserId = user.Id;
            authInfo.OnUserId = currentSession.OnUserId;

            var authTicket = new FormsAuthenticationTicket(
                 1,
                user.Username,
                DateTime.Now,
                DateTime.Now.AddMinutes(20000),
                false,
                authInfo.ToXml(),
                currentDomain.Path);

            string encryptedTicket = FormsAuthentication.Encrypt(authTicket);
            var authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket)
            {
                HttpOnly = true,
                Path = currentDomain.Path,
                Name = FormsAuthentication.FormsCookieName
            };

            Response.Cookies.Add(authCookie);
        }

        private string GetHash(string input)
        {
            var encrypted = string.Empty;

            if (!string.IsNullOrWhiteSpace(input))
            {
                var hashData = hashAlgorithm.ComputeHash(Encoding.UTF8.GetBytes(input));
                encrypted = BitConverter.ToString(hashData).Replace("-", string.Empty).ToLower();
            }

            return encrypted;
        }
    }
}
