// --------------------------------------------------------------------------
// <copyright file="UserLogInBundles.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2014.06.03">Created</change>
// </history>
// --------------------------------------------------------------------------

namespace Fanex.BetFollow.Module.UserLogIn.AppStart
{
    using System.Web.Optimization;
    using Fanex.BetFollow.Infrastructure.Extensions;

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
            bundles.AddAndInclude(
                "~/Areas/User/LogInStyles",
                "~/Areas/User/LogIn/Styles/login.less");
        }
    }
}
