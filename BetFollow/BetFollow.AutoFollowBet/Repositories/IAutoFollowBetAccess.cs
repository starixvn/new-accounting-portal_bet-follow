// --------------------------------------------------------------------------
// <copyright file="IAutoFollowBetAccess.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2012.12.07">Created</change>
// </history>

namespace Fanex.BetFollow.Module.AutoFollowBet.Repositories
{
    using System.Collections.Generic;
    using System.Data;
    using Fanex.BetFollow.Infrastructure.Models;
    using Fanex.BetFollow.Module.AutoFollowBet.Criteria;
    using Fanex.BetFollow.Module.AutoFollowBet.Entities;

    public interface IAutoFollowBetAccess
    {
        List<FollowedCustomer> GetAutoFollowedBetCustomer(GetAutoFollowedBetCustomerCriteria criteria);

        ResultModel DeleteAutoFollowedBetCustomer(DeleteAutoFollowedBetCustomerCriteria criteria);

        ResultModel UpdateAutoFollowedBetCustomer(UpdateAutoFollowedBetCustomerCriteria criteria);

        ResultModel AddAutoFollowedBetCustomer(AddAutoFollowedBetCustomerCriteria criteria);

        List<DataRow> GetAutoFollowBet(GetAutoFollowedBetCustomerCriteria criteria);

        List<ResultModel> DeleteAutoFollowedBetCustomers(DeleteAutoFollowedBetCustomersCriteria criteria);

        List<ResultModel> AddAutoFollowedBetCustomers(AddAutoFollowedBetCustomersCriteria criteria);

        ResultModel CheckAutoFollowedBetCustomer(CheckAutoFollowedBetCustomerCriteria criteria);
    }
}