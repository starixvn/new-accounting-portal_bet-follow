// --------------------------------------------------------------------------
// <copyright file="DeleteAutoFollowedBetCustomersCriteria.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Andy.Nguyen" date="2015.01.05">Created</change>
// </history>

namespace Fanex.BetFollow.Module.AutoFollowBet.Criteria
{
    using System.Collections;
    using Fanex.BetFollow.Infrastructure.Helpers;
    using Fanex.BetFollow.Infrastructure.Services;

    /// <summary>
    /// Delete Auto Follow Bet Criteria.
    /// </summary>
    public class DeleteAutoFollowedBetCustomersCriteria : DeleteAutoFollowedBetCustomerCriteria
    {
        public string UserFollowerPairs { get; set; }

        public new Hashtable StoreProcedureParams()
        {
            var storeProcedureParams = new Hashtable();
            storeProcedureParams.Add("strusername", UserFollowerPairs);

            storeProcedureParams.Add("userid", EditorId);
            storeProcedureParams.Add("ip", IP);
            storeProcedureParams.Add("errcode", string.Empty);
            storeProcedureParams.Add("errmsg", string.Empty);
            return storeProcedureParams;
        }

        public new string SettingKey()
        {
            return "Admin_AutoFollowBetManagement_Delete_Mult";
        }

        public new bool IsValid()
        {
            return true;
        }
    }
}
