// -----------------------------------------------------------------------
// <copyright file="AutoFollowBetDetail.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Franklin.Nguyen" date="2014.18.08">Created</change>
// </history>

namespace Fanex.BetFollow.AutoFollowBet.Entities
{
    /// <summary>
    /// Auto Follow Bet Detail.
    /// </summary>
    public class AutoFollowBetDetail
    {
        public bool FollowedLive { get; set; }

        // HDP
        public decimal Rate { get; set; }

        public decimal Odds { get; set; }

        public bool FollowedHandicap { get; set; }

        public bool FollowedFirstHalfHandicap { get; set; }

        public bool FollowedOverUnder { get; set; }

        public bool FollowedFirstHalfOverUnder { get; set; }

        // 1X2
        public decimal Rate1X2 { get; set; }

        public decimal Odds1X2 { get; set; }

        public bool Followed1X2 { get; set; }

        public bool Followed1ST1X2 { get; set; }
    }
}