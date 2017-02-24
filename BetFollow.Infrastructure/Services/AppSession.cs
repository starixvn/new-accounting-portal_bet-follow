// --------------------------------------------------------------------------
// <copyright file="AppSession.cs" >

// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2012.12.07">Created</change>
// </history>

namespace Fanex.BetFollow.Infrastructure.Services
{
    using System.Collections.Generic;
    using System.Web;
    using System.Web.SessionState;
    using Fanex.BetFollow.Infrastructure.Extensions;
    using Fanex.NAP.Core.Model;

    /// <summary>
    /// Application Session.
    /// </summary>
    public static class AppSession
    {
        private const string CurrentLogInUserKey = "BetFollow.Infrastructure.Services.AppSession.CurrentLogInUser";
        private const string CurrentUserMenuKey = "BetFollow.Infrastructure.Services.AppSession.CurrentUserMenu";
        private const string RedirectUrlKey = "BetFollow.Infrastructure.Services.AppSession.RedirectUrl";
        private const string CurrentHttpMethodKey = "BetFollow.Infrastructure.Services.AppSession.CurrentHttpMethod";
        private const string CurrentUserRoleAccessKey = "BetFollow.Infrastructure.Services.AppSession.CurrentUserRoleAccess";
        private const string CurrentActionNameKey = "BetFollow.Infrastructure.Services.AppSession.CurrentActionName";

        /// <summary>
        /// Gets or sets current login user.
        /// </summary>
        /// <value>
        /// The current user.
        /// </value>
        public static User CurrentUser
        {
            get
            {
                return SessionExtension.GetSession(CurrentSession, CurrentLogInUserKey) as User;
            }

            set
            {
                SessionExtension.AddSession(CurrentSession, CurrentLogInUserKey, value);
            }
        }

        /// <summary>
        /// Gets or sets menu of current login user.
        /// </summary>
        /// <value>
        /// The current user menu.
        /// </value>
        public static IList<MenuItem> CurrentUserMenu
        {
            get
            {
                return SessionExtension.GetSession(CurrentSession, CurrentUserMenuKey) as IList<MenuItem>;
            }

            set
            {
                SessionExtension.AddSession(CurrentSession, CurrentUserMenuKey, value);
            }
        }

        public static string CurrentHttpMethod
        {
            get
            {
                return SessionExtension.GetSession(CurrentSession, CurrentHttpMethodKey) as string;
            }

            set
            {
                SessionExtension.AddSession(CurrentSession, CurrentHttpMethodKey, value);
            }
        }
        
        public static string RedirectLink
        {
            get
            {
                return SessionExtension.GetSession(CurrentSession, RedirectUrlKey) as string;
            }

            set
            {
                SessionExtension.AddSession(CurrentSession, RedirectUrlKey, value);
            }
        }

        public static Dictionary<string, int> RoleAccess
        {
            get
            {
                return SessionExtension.GetSession(CurrentSession, CurrentUserRoleAccessKey) as Dictionary<string, int>;
            }

            set
            {
                SessionExtension.AddSession(CurrentSession, CurrentUserRoleAccessKey, value);
            }
        }

        /// <summary>
        /// Gets or sets IsTrackedMenu: determine current working on menu is
        /// tracked for page tracking or not.
        /// </summary>
        /// <value>
        /// The name of the current action.
        /// </value>
        public static string CurrentActionName
        {
            get
            {
                return SessionExtension.GetSession(CurrentSession, CurrentActionNameKey) as string;
            }

            set
            {
                SessionExtension.AddSession(CurrentSession, CurrentActionNameKey, value);
            }
        }

        private static HttpSessionState CurrentSession
        {
            get
            {
                return HttpContext.Current.Session;
            }
        }
    }
}
