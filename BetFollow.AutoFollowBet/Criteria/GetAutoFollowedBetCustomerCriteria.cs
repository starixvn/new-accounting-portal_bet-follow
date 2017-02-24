// --------------------------------------------------------------------------
// <copyright file="GetAutoFollowedBetCustomerCriteria.cs" >

// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2012.12.07">Created</change>
// </history>

namespace Fanex.BetFollow.AutoFollowBet.Criteria
{
    using System.Collections;
    using System.Diagnostics.CodeAnalysis;

    /// <summary>
    /// Get Auto Follow BetCriteria.
    /// </summary>
    public class GetAutoFollowedBetCustomerCriteria
    {
        public string Username { get; set; }

        public string IsAgent { get; set; }

        public string Source { get; set; }

        public string BaStatus { get; set; }

        // Follow Type
        public string LiveStatus { get; set; }

        public string Hdp { get; set; }

        [SuppressMessage("Microsoft.Naming", "CA1707:IdentifiersShouldNotContainUnderscores", Justification = "Reviewed. Suppression is OK here.")]
        public string _1StHdp { get; set; }

        public string OverUnder { get; set; }

        [SuppressMessage("Microsoft.Naming", "CA1707:IdentifiersShouldNotContainUnderscores", Justification = "Reviewed. Suppression is OK here.")]
        public string _1StOverUnder { get; set; }

        [SuppressMessage("Microsoft.Naming", "CA1707:IdentifiersShouldNotContainUnderscores", Justification = "Reviewed. Suppression is OK here.")]
        public string _1X2 { get; set; }

        [SuppressMessage("Microsoft.Naming", "CA1707:IdentifiersShouldNotContainUnderscores", Justification = "Reviewed. Suppression is OK here.")]
        public string _1St1X2 { get; set; }

        public string Follower { get; set; }

        public int PageSize { get; set; }

        public int TotalItems { get; set; }

        public int CurrentPage { get; set; }

        /// <summary>
        /// Gets the store procedure parameters.
        /// </summary>
        /// <returns>The store procedure parameters.</returns>
        public Hashtable StoreProcedureParams()
        {
            var storeProcedureParams = new Hashtable
            {
                { "username", Username },
                { "isagent", IsAgent },
                { "source", Source },
                { "bastatus", BaStatus },
                { "followlive", LiveStatus },
                { "follower", Follower },
                { "hdp", Hdp },
                { "1sthdp", _1StHdp },
                { "ou", OverUnder },
                { "1stou", _1StOverUnder },
                { "1x2", _1X2 },
                { "1st1x2", _1St1X2 }
            };

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