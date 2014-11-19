// --------------------------------------------------------------------------
// <copyright file="BundleConfig.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2014.06.03">Created</change>
// </history>
// --------------------------------------------------------------------------

namespace BetFollow
{
    using System.Web.Optimization;
    using BetFollow.AutoFollowBet.AppStart;
    using BetFollow.Infrastructure.Extensions;
    using BetFollow.UserLogIn.AppStart;

    /// <summary>
    /// Bundle Config.
    /// </summary>
    public static class BundleConfig
    {
        /// <summary>
        /// Registers the bundles.
        /// </summary>
        /// <param name="bundles">The bundles.</param>
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));

            RegisterBundles_Bootstrap(bundles);
            RegisterBundles_Common(bundles);
            RegisterBundles_Home(bundles);
            RegisterBundles_MultiSelect(bundles);
            RegisterBundles_FanexGrid(bundles);
            UserLogInBundles.RegisterAll(bundles);
            AutoFollowBetBundles.RegisterAll(bundles);
        }

        private static void RegisterBundles_Bootstrap(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/scripts/respond").Include(
                "~/Scripts/respond.js"));
        }

        /// <summary>
        /// Registers the common bundles.
        /// </summary>
        /// <param name="bundles">The bundles.</param>
        private static void RegisterBundles_Common(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Views/CommonScripts").Include(
                "~/Scripts/JQuery/jquery-1.8.2.js",
                "~/Scripts/json2.js",
                "~/Scripts/jquery-ui-1.8.14.custom.js",
                "~/Scripts/BlockUI/jquery.blockUI.1.33.js",
                "~/Scripts/BlockUI/BlockUI.js",
                "~/Scripts/ShareScripts/SharedScriptManager.js"));
            bundles.AddAndInclude(
                "~/site/common",
                "~/content/bootstrap/css/bootstrap.css",
                "~/Content/site/common.less",
                "~/Content/site/Message.less",
                "~/Scripts/JQuery/UI/css/custom-theme/jquery-ui-1.8.10.custom.css");
        }

        private static void RegisterBundles_Home(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Views/HomeScripts").Include(
                "~/Areas/Home/Scripts/MenuManager.js"));

            bundles.AddAndInclude(
                "~/Views/HomeStyles",
                "~/Content/site/ui-darkness/jquery-ui-1.8.14.custom.css",
                "~/Areas/Home/Styles/default.less",
                "~/Content/site/customizeJqueryUI.less");
        }

        private static void RegisterBundles_MultiSelect(BundleCollection bundles)
        {
            bundles.AddAndInclude(
                "~/Styles/FanexMultipleSelect",
                "~/Scripts/MultipleSelect/fanex.multiSelect.css",
                "~/Content/site/customizeMultiSelect.less");

            bundles.Add(new ScriptBundle("~/Scripts/FanexMultipleSelect").Include(
                "~/Scripts/MultipleSelect/fanex.multiSelect.js"));
        }

        /// <summary>
        /// Registers the FANEX grid bundles.
        /// </summary>
        /// <param name="bundles">The bundles.</param>
        private static void RegisterBundles_FanexGrid(BundleCollection bundles)
        {
            bundles.AddAndInclude(
                "~/Styles/FanexGridStyles",
                "~/Scripts/Pager/pagination.css",
                "~/Scripts/FanexGrid/table.css",
                "~/Scripts/FanexGrid/reportgrid.css");

            bundles.Add(new ScriptBundle("~/Scripts/FanexGridScripts").Include(
                "~/Scripts/FanexGrid/gridscroller.js",
                "~/Scripts/Pager/jpager.js"));
        }
    }
}