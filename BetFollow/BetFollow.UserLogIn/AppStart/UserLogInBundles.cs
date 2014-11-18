// --------------------------------------------------------------------------
// <copyright file="UserLogInBundles.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2014.06.03">Created</change>
// </history>
// --------------------------------------------------------------------------

namespace BetFollow.UserLogIn.AppStart
{
    using System.Web.Optimization;
    using BetFollow.Infrastructure.Extensions;

    /// <summary>
    /// User Log In Bundles.
    /// </summary>
    public static class UserLogInBundles
    {
        public static void RegisterAll(BundleCollection bundles)
        {
            RegisterBundles_UserLogIn(bundles);
        }

        /// <summary>
        /// Registers the user log in bundles.
        /// </summary>
        /// <param name="bundles">The bundles.</param>
        private static void RegisterBundles_UserLogIn(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Areas/User/LogInScripts").Include(
                "~/Scripts/JQuery/jquery-1.8.2.js",
                "~/Scripts/CryptoJS.js",
                "~/Scripts/ShareScripts/SharedScriptManager.js",
                "~/Areas/User/LogIn/Scripts/LogInManager.js"));

            bundles.AddAndInclude(
                "~/Areas/User/LogInStyles",
                "~/Areas/User/LogIn/Styles/login.less");
        }
    }
}
