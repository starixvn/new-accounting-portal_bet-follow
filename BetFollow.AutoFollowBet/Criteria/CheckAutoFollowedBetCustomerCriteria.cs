// --------------------------------------------------------------------------
// <copyright file="CheckAutoFollowedBetCustomerCriteria.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Andy.Nguyen" date="2015.01.05">Created</change>
// </history>

namespace Fanex.BetFollow.AutoFollowBet.Criteria
{
    using System.Collections;

    /// <summary>
    /// Add Auto Follow Bet Criteria.
    /// </summary>
    public class CheckAutoFollowedBetCustomerCriteria
    {
        public string Username { get; set; }

        /// <summary>
        /// Gets the store procedure parameters.
        /// </summary>
        /// <returns>The store procedure parameters.</returns>
        public Hashtable StoreProcedureParams()
        {
            var storeProcedureParams = new Hashtable();
            storeProcedureParams.Add("username", Username ?? string.Empty);
            storeProcedureParams.Add("errcode", 0);
            storeProcedureParams.Add("errmsg", string.Empty);

            return storeProcedureParams;
        }

        public string SettingKey()
        {
            return "Admin_AutoFollowBetManagement_Check";
        }

        public bool IsValid()
        {
            return true;
        }
    }
}
