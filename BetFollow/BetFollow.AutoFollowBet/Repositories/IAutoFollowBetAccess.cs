// --------------------------------------------------------------------------
// <copyright file="IAutoFollowBetAccess.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2012.12.07">Created</change>
// </history>

namespace BetFollow.AutoFollowBet.Repositories
{
    using System.Collections.Generic;
    using System.Data;
    using BetFollow.AutoFollowBet.Criteria;
    using BetFollow.AutoFollowBet.Entities;
    using BetFollow.Infrastructure.Models;

    public interface IAutoFollowBetAccess
    {
        List<FollowedCustomer> GetAutoFollowedBetCustomer(GetAutoFollowedBetCustomerCriteria criteria);

        ResultModel DeleteAutoFollowedBetCustomer(DeleteAutoFollowedBetCustomerCriteria criteria);

        ResultModel UpdateAutoFollowedBetCustomer(UpdateAutoFollowedBetCustomerCriteria criteria);

        ResultModel AddAutoFollowedBetCustomer(AddAutoFollowedBetCustomerCriteria criteria);

        List<DataRow> GetAutoFollowBet(GetAutoFollowedBetCustomerCriteria criteria);
    }
}