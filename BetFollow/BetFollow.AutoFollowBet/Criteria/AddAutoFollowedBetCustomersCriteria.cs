// --------------------------------------------------------------------------
// <copyright file="AddAutoFollowedBetCustomersCriteria.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Andy.Nguyen" date="2015.01.05">Created</change>
// </history>

namespace Fanex.BetFollow.Module.AutoFollowBet.Criteria
{
    using System;
    using System.Collections;
    using Fanex.BetFollow.Infrastructure.Configurations;
    using Fanex.BetFollow.Infrastructure.Helpers;
    using Fanex.BetFollow.Infrastructure.Services;

    /// <summary>
    /// Add Auto Follow Bet Criteria.
    /// </summary>
    public class AddAutoFollowedBetCustomersCriteria : AddAutoFollowedBetCustomerCriteria
    {
        public string Usernames { get; set; }

        /// <summary>
        /// Gets the store procedure parameters.
        /// </summary>
        /// <returns>The store procedure parameters.</returns>
        public new Hashtable StoreProcedureParams()
        {
            var storeProcedureParams = new Hashtable();
            storeProcedureParams.Add("strusername", Usernames ?? string.Empty);
            storeProcedureParams.Add("rate", Rate);
            storeProcedureParams.Add("liveodds", LiveOdds);
            storeProcedureParams.Add("nonliveodds", NoneLiveOdds);
            storeProcedureParams.Add("livehdp", FollowedLiveHDP);
            storeProcedureParams.Add("nonlivehdp", FollowedNoneLiveHDP);
            storeProcedureParams.Add("live1sthdp", FollowedLive1stHDP);
            storeProcedureParams.Add("nonlive1sthdp", FollowedNoneLive1stHDP);
            storeProcedureParams.Add("liveou", FollowedLiveOverUnder);
            storeProcedureParams.Add("nonliveou", FollowedNoneLiveOverUnder);
            storeProcedureParams.Add("live1stou", FollowedLive1stOverUnder);
            storeProcedureParams.Add("nonlive1stou", FollowedNoneLive1stOverUnder);
            storeProcedureParams.Add("follower", Follower ?? string.Empty);
            storeProcedureParams.Add("userid", EditorId);
            storeProcedureParams.Add("ip", IP);
            storeProcedureParams.Add("errcode", string.Empty);
            storeProcedureParams.Add("errmsg", string.Empty);

            return storeProcedureParams;
        }

        public new string SettingKey()
        {
            return "Admin_AutoFollowBetManagement_Add_Mult";
        }
    }
}
