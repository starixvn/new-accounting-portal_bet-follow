// --------------------------------------------------------------------------
// <copyright file="AutoFollowBetService.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2012.12.07">Created</change>
// </history>

namespace Fanex.BetFollow.Module.AutoFollowBet.Services
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using Fanex.BetFollow.Infrastructure.Configurations;
    using Fanex.BetFollow.Infrastructure.Helpers;
    using Fanex.BetFollow.Infrastructure.Models;
    using Fanex.BetFollow.Module.AutoFollowBet.Criteria;
    using Fanex.BetFollow.Module.AutoFollowBet.Entities;
    using Fanex.BetFollow.Module.AutoFollowBet.Models;
    using Fanex.BetFollow.Module.AutoFollowBet.Repositories;
    using Fanex.Common;

    /// <summary>
    /// Auto Follow Bet Service.
    /// </summary>
    public class AutoFollowBetService : IAutoFollowBetService
    {
        private readonly IAutoFollowBetAccess _autoFollowBetAccess;

        public AutoFollowBetService()
            : this(null)
        {
        }

        public AutoFollowBetService(IAutoFollowBetAccess autoFollowBetAccess)
        {
            _autoFollowBetAccess = autoFollowBetAccess ?? new AutoFollowBetAccess();
        }

        /// <summary>
        /// Gets the follow type.
        /// </summary>
        /// <returns>The follow type.</returns>
        public List<FollowTypeInfo> FollowTypes()
        {
            try
            {
                Admin_AutoFollowBetCollection collection = Admin_AutoFollowBetSection.Instance.FollowType;
                List<FollowTypeInfo> result = new List<FollowTypeInfo>();
                foreach (Admin_AutoFollowBetElement element in collection)
                {
                    if (!element.Active)
                    {
                        continue;
                    }

                    var followType = new FollowTypeInfo()
                    {
                        Id = Converter.ToString2(element.Id),
                        Name = Converter.ToString2(element.Name),
                        ChildsInfo = new List<FollowTypeInfo>()
                    };

                    foreach (Admin_AutoFollowBetElement subType in element.SubTypes)
                    {
                        followType.ChildsInfo.Add(new FollowTypeInfo()
                        {
                            Id = Converter.ToString2(subType.Id),
                            Name = Converter.ToString2(subType.Name)
                        });
                    }

                    result.Add(followType);
                }

                return result;
            }
            catch (Exception ex)
            {
                LogExtensions.ExceptionHandler(ex);
                throw;
            }
        }

        /// <summary>
        /// Gets the automatic followed bet customers.
        /// </summary>
        /// <param name="criteria">The criteria.</param>
        /// <returns>The automatic followed bet customers.</returns>
        public List<AutoFollowBetEntity> AutoFollowedBetCustomers(GetAutoFollowedBetCustomerCriteria criteria)
        {
            List<AutoFollowBetEntity> result = new List<AutoFollowBetEntity>();
            var rawData = _autoFollowBetAccess.GetAutoFollowBet(criteria);

            var autoFollowBetGroups = rawData.GroupBy(
                x => new
                {
                    Username = x.Field<string>("username"),
                    Source = x.Field<byte>("src"),
                    Rate = x.Field<decimal>("Rate"),
                    BaStatus = x.Field<int>("IsBA"),
                    Follower = x.Field<string>("Follower"),
                    IsAgent = x.Field<int>("IsAgent")
                }).ToList();

            foreach (var group in autoFollowBetGroups)
            {
                AutoFollowBetEntity autoFollowBet = new AutoFollowBetEntity
                {
                    UserName = Converter.ToString2(group.Key.Username),
                    Source = Convert.ToBoolean(group.Key.Source),
                    Rate = Converter.ToDecimal(group.Key.Rate),
                    BAStatus = Convert.ToBoolean(group.Key.BaStatus),
                    Follower = Converter.ToString2(group.Key.Follower),
                    IsAgent = Convert.ToBoolean(group.Key.IsAgent)
                };

                foreach (var item in group)
                {
                    AutoFollowBetDetail autoFollowBetDetail = new AutoFollowBetDetail
                    {
                        Odds = Converter.ToDecimal(item.Field<decimal>("Odds")),
                        FollowedLive = Convert.ToBoolean(item.Field<byte>("FollowLive")),
                        FollowedHandicap = Convert.ToBoolean(item.Field<bool>("Follow1")),
                        FollowedFirstHalfHandicap = Convert.ToBoolean(item.Field<bool>("Follow7")),
                        FollowedOverUnder = Convert.ToBoolean(item.Field<bool>("Follow3")),
                        FollowedFirstHalfOverUnder = Convert.ToBoolean(item.Field<bool>("Follow8"))
                    };

                    autoFollowBet.AutoFollowBetDetail.Add(autoFollowBetDetail);
                }

                result.Add(autoFollowBet);
            }

            return result;
        }

        /// <summary>
        /// Updates the followed customer.
        /// </summary>
        /// <param name="criteria">The criteria.</param>
        /// <returns>The followed customer.</returns>
        public ResultModel UpdateAutoFollowedBetCustomer(UpdateAutoFollowedBetCustomerCriteria criteria)
        {
            try
            {
                if (!criteria.IsValid())
                {
                    return null;
                }

                var result = _autoFollowBetAccess.UpdateAutoFollowedBetCustomer(criteria);
                return result;
            }
            catch (Exception ex)
            {
                LogExtensions.ExceptionHandler(ex);
                throw;
            }
        }

        /// <summary>
        /// Deletes the followed customer.
        /// </summary>
        /// <param name="criteria">The criteria.</param>
        /// <returns>The followed customer.</returns>
        public ResultModel DeleteAutoFollowedBetCustomer(DeleteAutoFollowedBetCustomerCriteria criteria)
        {
            try
            {
                return _autoFollowBetAccess.DeleteAutoFollowedBetCustomer(criteria);
            }
            catch (Exception ex)
            {
                LogExtensions.ExceptionHandler(ex);
                throw;
            }
        }

        /// <summary>
        /// Add the followed customer.
        /// </summary>
        /// <param name="criteria">The criteria.</param>
        /// <returns>The followed customer.</returns>
        public ResultModel AddAutoFollowedBetCustomer(AddAutoFollowedBetCustomerCriteria criteria)
        {
            try
            {
                if (!criteria.IsValid())
                {
                    return null;
                }

                return _autoFollowBetAccess.AddAutoFollowedBetCustomer(criteria);
            }
            catch (Exception ex)
            {
                LogExtensions.ExceptionHandler(ex);
                throw;
            }
        }
    }
}
