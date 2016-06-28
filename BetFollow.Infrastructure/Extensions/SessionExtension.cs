// --------------------------------------------------------------------------
// <copyright file="SessionExtension.cs" >

// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2012.12.07">Created</change>
// </history>

namespace Fanex.BetFollow.Infrastructure.Extensions
{
    using System.Web.SessionState;

    /// <summary>
    /// Session Extension.
    /// </summary>
    public static class SessionExtension
    {
        public static object GetSession(HttpSessionState sessionState, string key)
        {
            return sessionState[key];
        }

        public static void AddSession(HttpSessionState sessionState, string key, object value)
        {
            sessionState[key] = value;
        }
    }
}
