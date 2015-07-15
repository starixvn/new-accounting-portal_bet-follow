// --------------------------------------------------------------------------
// <copyright file="AddAutoFollowedBetCustomerCriteria.cs" company="Nexcel Solutions Vietnam">
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
    /// Add Auto Follow Bet Criteria.
    /// </summary>
    public class AddAutoFollowedBetCustomerCriteria
    {
        public string Username { get; set; }

        public string Follower { get; set; }

        // Hdp
        public decimal Rate { get; set; }

        public decimal NonLiveOdds { get; set; }

        public bool NonLiveHdp { get; set; }

        public bool NonLive1StHdp { get; set; }

        public bool NonLiveOverUnder { get; set; }

        public bool NonLive1StOverUnder { get; set; }

        public decimal LiveOdds { get; set; }

        public bool LiveHdp { get; set; }

        public bool Live1StHdp { get; set; }

        public bool LiveOverUnder { get; set; }

        public bool Live1StOverUnder { get; set; }

        // 1x2
        public decimal Rate1X2 { get; set; }

        public decimal NonLiveOdds1X2 { get; set; }

        public bool NonLive1X2 { get; set; }

        public bool NonLive1St1X2 { get; set; }

        public decimal LiveOdds1X2 { get; set; }

        public bool Live1X2 { get; set; }

        public bool Live1St1X2 { get; set; }

        public int EditorId
        {
            get
            {
                return AppSession.CurrentUser.Id;
            }
        }

        public string Ip
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
            AddUserNameParam(storeProcedureParams);

            // Rate
            storeProcedureParams.Add("rate", Rate);
            storeProcedureParams.Add("rate2", Rate1X2);

            // Odds
            storeProcedureParams.Add("liveodds", LiveOdds);
            storeProcedureParams.Add("nonliveodds", NonLiveOdds);
            storeProcedureParams.Add("liveodds2", LiveOdds1X2);
            storeProcedureParams.Add("nonliveodds2", NonLiveOdds1X2);

            storeProcedureParams.Add("livehdp", LiveHdp);
            storeProcedureParams.Add("nonlivehdp", NonLiveHdp);

            storeProcedureParams.Add("live1sthdp", Live1StHdp);
            storeProcedureParams.Add("nonlive1sthdp", NonLive1StHdp);

            storeProcedureParams.Add("liveou", LiveOverUnder);
            storeProcedureParams.Add("nonliveou", NonLiveOverUnder);

            storeProcedureParams.Add("live1stou", Live1StOverUnder);
            storeProcedureParams.Add("nonlive1stou", NonLive1StOverUnder);

            storeProcedureParams.Add("live1x2", Live1X2);
            storeProcedureParams.Add("nonlive1x2", NonLive1X2);

            storeProcedureParams.Add("live1st1x2", Live1St1X2);
            storeProcedureParams.Add("nonlive1st1x2", NonLive1St1X2);

            storeProcedureParams.Add("follower", Follower ?? string.Empty);
            storeProcedureParams.Add("userid", EditorId);
            storeProcedureParams.Add("ip", Ip);
            storeProcedureParams.Add("errcode", 0);
            storeProcedureParams.Add("errmsg", string.Empty);

            return storeProcedureParams;
        }

        public virtual void AddUserNameParam(Hashtable storeProcedureParams)
        {
            storeProcedureParams.Add("username", Username ?? string.Empty);
        }

        public virtual string SettingKey()
        {
            return "Admin_AutoFollowBetManagement_Add";
        }

        public virtual bool IsValid()
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