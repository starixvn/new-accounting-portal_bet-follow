// -----------------------------------------------------------------------
// <copyright file="AutoFollowBetEntity.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Franklin.Nguyen" date="2014.18.08">Created</change>
// </history>

namespace Fanex.BetFollow.AutoFollowBet.Entities
{
    using System.Collections.Generic;

    /// <summary>
    /// Auto Follow Bet.
    /// </summary>
    public class AutoFollowBetEntity
    {
        public AutoFollowBetEntity()
        {
            AutoFollowBetDetail = new List<AutoFollowBetDetail>();
        }

        public int CurrentPage { get; set; }

        public int PageSize { get; set; }

        public int TotalItems { get; set; }

        public string UserName { get; set; }

        public bool Source { get; set; }

        public string Follower { get; set; }

        public bool BAStatus { get; set; }

        public bool IsAgent { get; set; }

        public List<AutoFollowBetDetail> AutoFollowBetDetail { get; set; }
    }
}