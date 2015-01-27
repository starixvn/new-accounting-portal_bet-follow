// --------------------------------------------------------------------------
// <copyright file="GetAutoFollowedBetCustomerCriteria.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2012.12.07">Created</change>
// </history>

namespace Fanex.BetFollow.Module.AutoFollowBet.Criteria
{
    using System.Collections;
    using System.Diagnostics.CodeAnalysis;

    /// <summary>
    /// Get Auto Follow BetCriteria.
    /// </summary>
    public class GetAutoFollowedBetCustomerCriteria
    {
        public string Username { get; set; }

        public string Follower { get; set; }

        public string BAStatus { get; set; }

        public string Source { get; set; }

        public string LiveStatus { get; set; }

        public string HDP { get; set; }

        [SuppressMessage(
            "Microsoft.Naming",
            "CA1707:IdentifiersShouldNotContainUnderscores",
            Justification = "Reviewed. Suppression is OK here.")]
        public string _1stHDP { get; set; }

        public string OverUnder { get; set; }

        [SuppressMessage(
            "Microsoft.Naming",
            "CA1707:IdentifiersShouldNotContainUnderscores",
            Justification = "Reviewed. Suppression is OK here.")]
        public string _1stOverUnder { get; set; }

        public string IsAgent { get; set; }

        public int PageSize { get; set; }

        public int TotalItems { get; set; }

        public int CurrentPage { get; set; }

        /// <summary>
        /// Gets the store procedure parameters.
        /// </summary>
        /// <returns>The store procedure parameters.</returns>
        public Hashtable StoreProcedureParams()
        {
            var storeProcedureParams = new Hashtable();
            storeProcedureParams.Add("username", Username);
            storeProcedureParams.Add("follower", Follower);
            storeProcedureParams.Add("source", Source);
            storeProcedureParams.Add("bastatus", BAStatus);
            storeProcedureParams.Add("followlive", LiveStatus);
            storeProcedureParams.Add("hdp", HDP);
            storeProcedureParams.Add("1sthdp", _1stHDP);
            storeProcedureParams.Add("ou", OverUnder);
            storeProcedureParams.Add("1stou", _1stOverUnder);
            storeProcedureParams.Add("isagent", IsAgent);
            return storeProcedureParams;
        }

        public string SettingKey()
        {
            return "Admin_AutoFollowBetManagement_Select";
        }

        public bool IsValid()
        {
            return true;
        }
    }
}
