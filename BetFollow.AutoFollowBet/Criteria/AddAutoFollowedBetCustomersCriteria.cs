namespace Fanex.BetFollow.AutoFollowBet.Criteria
{
    using System;
    using System.Collections;
    using Fanex.BetFollow.Infrastructure.Configurations;

    /// <summary>
    /// Add Multi Auto Follow Bet Criteria.
    /// </summary>
    public class AddAutoFollowedBetCustomersCriteria : AddAutoFollowedBetCustomerCriteria
    {
        public string Usernames { get; set; }

        /// <summary>
        /// Add usernames.
        /// </summary>
        /// <param name="storeProcedureParams">Store parameter hastable.</param>
        public override void AddUserNameParam(Hashtable storeProcedureParams)
        {
            storeProcedureParams.Add("strusername", Usernames ?? string.Empty);
        }

        public override string SettingKey()
        {
            return "Admin_AutoFollowBetManagement_Add_Mult";
        }

        public override bool IsValid()
        {
            var rateConfig = Admin_AutoFollowBetSection.Instance.Configs["Rate"];
            return !string.IsNullOrEmpty(Usernames) &&
                (decimal)rateConfig.Min <= Rate &&
                Rate <= rateConfig.Max &&
                Math.Round(Rate, 2) == Rate &&
                !string.IsNullOrEmpty(Follower);
        }
    }
}
