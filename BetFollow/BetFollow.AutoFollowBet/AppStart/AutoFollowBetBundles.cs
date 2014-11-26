// --------------------------------------------------------------------------
// <copyright file="AutoFollowBetBundles.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2014.06.03">Created</change>
// </history>
// --------------------------------------------------------------------------

namespace Fanex.BetFollow.Module.AutoFollowBet.AppStart
{
    using System.Web.Optimization;
    using Fanex.BetFollow.Infrastructure.Extensions;

    /// <summary>
    /// Auto Follow Bet Bundles.
    /// </summary>
    public static class AutoFollowBetBundles
    {
        public static void RegisterAll(BundleCollection bundles)
        {
            RegisterBundles_ManageList(bundles);
        }

        /// <summary>
        /// Registers the manage list bundles.
        /// </summary>
        /// <param name="bundles">The bundles.</param>
        private static void RegisterBundles_ManageList(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Areas/AutoFollowBet/ManageListScripts").Include(
                "~/Areas/AutoFollowBet/ManageList/Scripts/ManageListController.js"));

            bundles.Add(new StyleBundle(
                "~/Areas/AutoFollowBet/ManageListStyles").Include(
                "~/Areas/AutoFollowBet/ManageList/Styles/ManageList.less"));
        }
    }
}
