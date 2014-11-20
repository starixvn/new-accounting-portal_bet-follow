// --------------------------------------------------------------------------
// <copyright file="AddAutoFollowedBetCustomerCriteria.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2012.12.07">Created</change>
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
    public class AddAutoFollowedBetCustomerCriteria
    {
        public string Username { get; set; }

        public decimal Rate { get; set; }

        public decimal LiveOdds { get; set; }

        public decimal NoneLiveOdds { get; set; }

        public bool FollowedLiveHDP { get; set; }

        public bool FollowedNoneLiveHDP { get; set; }

        public bool FollowedLive1stHDP { get; set; }

        public bool FollowedNoneLive1stHDP { get; set; }

        public bool FollowedLiveOverUnder { get; set; }

        public bool FollowedNoneLiveOverUnder { get; set; }

        public bool FollowedLive1stOverUnder { get; set; }

        public bool FollowedNoneLive1stOverUnder { get; set; }

        public string Follower { get; set; }

        public int EditorId
        {
            get
            {
                return AppSession.CurrentUser.Id;
            }
        }

        public string IP
        {
            get
            {
                return IPHelper.ClientIP();
            }
        }

        /// <summary>
        /// Gets the store procedure parameters.
        /// </summary>
        /// <returns>The store procedure parameters.</returns>
        public Hashtable StoreProcedureParams()
        {
            var storeProcedureParams = new Hashtable();
            storeProcedureParams.Add("username", Username ?? string.Empty);
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
            storeProcedureParams.Add("errcode", 0);
            storeProcedureParams.Add("errmsg", string.Empty);

            return storeProcedureParams;
        }

        public string SettingKey()
        {
            return "Admin_AutoFollowBetManagement_Add";
        }

        public bool IsValid()
        {
            var rateConfig = Admin_AutoFollowBetSection.Instance.Configs["Rate"];
            return !string.IsNullOrEmpty(Username) &&
                (decimal)rateConfig.Min <= Rate &&
                Rate <= rateConfig.Max &&
                Math.Round(Rate, 2) == Rate &&
                !string.IsNullOrEmpty(Follower);
        }
    }
}
