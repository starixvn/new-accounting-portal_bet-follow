// --------------------------------------------------------------------------
// <copyright file="UpdateAutoFollowedBetCustomerCriteria.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2012.12.07">Created</change>
// </history>

namespace Fanex.BetFollow.AutoFollowBet.Criteria
{
    using System;
    using System.Collections;
    using Fanex.BetFollow.Infrastructure.Configurations;
    using Fanex.BetFollow.Infrastructure.Helpers;
    using Fanex.BetFollow.Infrastructure.Services;

    /// <summary>
    /// Update Auto Follow Bet Criteria.
    /// </summary>
    public class UpdateAutoFollowedBetCustomerCriteria
    {
        public string Username { get; set; }

        public string Follower { get; set; }

        public string OrgFollower { get; set; }

        // HDP
        public decimal Rate { get; set; }

        public decimal LiveOdds { get; set; }

        public decimal NonLiveOdds { get; set; }

        public int FollowedLiveHdp { get; set; }

        public int FollowedLive1STHDP { get; set; }

        public int FollowedLiveOverUnder { get; set; }

        public int FollowedLive1STOverUnder { get; set; }

        public int FollowedNonLiveHdp { get; set; }

        public int FollowedNonLive1STHDP { get; set; }

        public int FollowedNonLiveOverUnder { get; set; }

        public int FollowedNonLive1STOverUnder { get; set; }

        // 1X2
        public decimal Rate1X2 { get; set; }

        public decimal LiveOdds1X2 { get; set; }

        public decimal NonLiveOdds1X2 { get; set; }

        public int FollowedLive1X2 { get; set; }

        public int FollowedNonLive1X2 { get; set; }

        public int FollowedLive1ST1X2 { get; set; }

        public int FollowedNonLive1ST1X2 { get; set; }

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
            var storeProcedureParams = new Hashtable
            {
                { "username", Username ?? string.Empty },
                { "follower", Follower ?? string.Empty },
                { "originalFollower", OrgFollower ?? string.Empty },
                { "rate", Rate },
                { "liveodds", LiveOdds },
                { "nonliveodds", NonLiveOdds },
                { "livehdp", FollowedLiveHdp },
                { "nonlivehdp", FollowedNonLiveHdp },
                { "live1sthdp", FollowedLive1STHDP },
                { "nonlive1sthdp", FollowedNonLive1STHDP },
                { "liveou", FollowedLiveOverUnder },
                { "nonliveou", FollowedNonLiveOverUnder },
                { "live1stou", FollowedLive1STOverUnder },
                { "nonlive1stou", FollowedNonLive1STOverUnder },
                { "Rate2", Rate1X2 },
                { "LiveOdds2", LiveOdds1X2 },
                { "NonLiveOdds2", NonLiveOdds1X2 },
                { "Live1X2", FollowedLive1X2 },
                { "NonLive1X2", FollowedNonLive1X2 },
                { "Live1St1X2", FollowedLive1ST1X2 },
                { "NonLive1St1X2", FollowedNonLive1ST1X2 },
                { "userid", EditorId },
                { "ip", IP },
                { "errcode", 0 },
                { "errmsg", string.Empty }
            };

            return storeProcedureParams;
        }

        public string SettingKey()
        {
            return "Admin_AutoFollowBetManagement_Update";
        }

        public bool IsValid()
        {
            var rateConfig = Admin_AutoFollowBetSection.Instance.Configs["Rate"];
            return (decimal)rateConfig.Min <= Rate &&
                Rate <= rateConfig.Max &&
                Math.Round(Rate, 2) == Rate &&
                !string.IsNullOrEmpty(Follower);
        }
    }
}
