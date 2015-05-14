// --------------------------------------------------------------------------
// <copyright file="AppSetting.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2012.12.07">Created</change>
// </history>

namespace Fanex.BetFollow.Infrastructure.Services
{
    using System.Configuration;
    using Fanex.Common;

    /// <summary>
    /// Application Setting.
    /// </summary>
    public static class AppSetting
    {
        public static string LoginLink
        {
            get { return Converter.ToString2(ConfigurationManager.AppSettings["loginUrl"]); }
        }
    }
}
