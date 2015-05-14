// --------------------------------------------------------------------------
// <copyright file="DeleteAutoFollowedBetCustomerCriteria.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2012.12.07">Created</change>
// </history>

namespace Fanex.BetFollow.AutoFollowBet.Criteria
{
    using System.Collections;
    using Fanex.BetFollow.Infrastructure.Helpers;
    using Fanex.BetFollow.Infrastructure.Services;

    /// <summary>
    /// Delete Auto Follow Bet Criteria.
    /// </summary>
    public class DeleteAutoFollowedBetCustomerCriteria
    {
        public string Username { get; set; }

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

        public int ErrorCode { get; set; }

        public string ErrorMessage { get; set; }

        /// <summary>
        /// Get store procedure parameters.
        /// </summary>
        /// <returns>Hash table.</returns>
        public Hashtable StoreProcedureParams()
        {
            var storeProcedureParams = new Hashtable();
            storeProcedureParams.Add("username", Username);
            storeProcedureParams.Add("follower", Follower);

            storeProcedureParams.Add("userid", EditorId);
            storeProcedureParams.Add("ip", IP);
            storeProcedureParams.Add("errcode", 0);
            storeProcedureParams.Add("errmsg", string.Empty);
            return storeProcedureParams;
        }

        public string SettingKey()
        {
            return "Admin_AutoFollowBetManagement_Delete";
        }

        public bool IsValid()
        {
            return true;
        }
    }
}
