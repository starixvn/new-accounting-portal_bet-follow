// --------------------------------------------------------------------------
// <copyright file="IPHelper.cs" >

// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="" date="2012.12.07">Created</change>
// </history>

namespace Fanex.BetFollow.Infrastructure.Helpers
{
    using System.Web;

    /// <summary>
    /// IP Helper.
    /// </summary>
    public static class IPHelper
    {
        public static string ClientIP()
        {
            return HttpContext.Current.Request.UserHostAddress;
        }
    }
}
