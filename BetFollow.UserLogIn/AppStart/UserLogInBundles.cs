namespace Fanex.BetFollow.UserLogIn.AppStart
{
    using System.Web.Optimization;
    using BundleTransformer.Core.Transformers;

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
            var css = new StyleBundle(
                "~/Areas/User/LogInStyles").Include(
                    "~/Areas/User/LogIn/Styles/login.less");
            css.Transforms.Add(new StyleTransformer());
           
            bundles.Add(css);
        }
    }
}
