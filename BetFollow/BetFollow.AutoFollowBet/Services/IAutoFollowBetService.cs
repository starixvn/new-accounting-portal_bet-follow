// --------------------------------------------------------------------------
// <copyright file="IAutoFollowBetService.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2012.12.07">Created</change>
// </history>

namespace Fanex.BetFollow.Module.AutoFollowBet.Services
{
    using System.Collections.Generic;
    using Fanex.BetFollow.Infrastructure.Models;
    using Fanex.BetFollow.Module.AutoFollowBet.Criteria;
    using Fanex.BetFollow.Module.AutoFollowBet.Entities;
    using Fanex.BetFollow.Module.AutoFollowBet.Models;

    public interface IAutoFollowBetService
    {
        List<FollowTypeInfo> FollowTypes();

        List<AutoFollowBetEntity> AutoFollowedBetCustomers(GetAutoFollowedBetCustomerCriteria criteria);

        ResultModel UpdateAutoFollowedBetCustomer(UpdateAutoFollowedBetCustomerCriteria criteria);

        ResultModel DeleteAutoFollowedBetCustomer(DeleteAutoFollowedBetCustomerCriteria criteria);
        
        ResultModel AddAutoFollowedBetCustomer(AddAutoFollowedBetCustomerCriteria criteria);
    }
}
