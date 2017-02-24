// --------------------------------------------------------------------------
// <copyright file="IAutoFollowBetService.cs" >

// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2012.12.07">Created</change>
// </history>

namespace Fanex.BetFollow.AutoFollowBet.Services
{
    using Fanex.BetFollow.AutoFollowBet.Criteria;
    using Fanex.BetFollow.AutoFollowBet.Entities;
    using Fanex.BetFollow.AutoFollowBet.Models;
    using Fanex.BetFollow.Infrastructure.Models;
    using System.Collections.Generic;

    public interface IAutoFollowBetService
    {
        List<FollowTypeInfo> FollowTypes();

        List<AutoFollowBetEntity> AutoFollowedBetCustomers(GetAutoFollowedBetCustomerCriteria criteria);

        ResultModel UpdateAutoFollowedBetCustomer(UpdateAutoFollowedBetCustomerCriteria criteria);

        ResultModel DeleteAutoFollowedBetCustomer(DeleteAutoFollowedBetCustomerCriteria criteria);

        ResultModel AddAutoFollowedBetCustomer(AddAutoFollowedBetCustomerCriteria criteria);

        List<ResultModel> DeleteAutoFollowedBetCustomers(DeleteAutoFollowedBetCustomersCriteria criteria);

        List<ResultModel> AddAutoFollowedBetCustomers(AddAutoFollowedBetCustomersCriteria criteria);

        ResultModel CheckAutoFollowedBetCustomer(CheckAutoFollowedBetCustomerCriteria criteria);
    }
}
