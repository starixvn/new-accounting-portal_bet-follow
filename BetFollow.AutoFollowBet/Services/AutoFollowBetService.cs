// --------------------------------------------------------------------------
// <copyright file="AutoFollowBetService.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
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
    using Fanex.BetFollow.AutoFollowBet.Repositories;
    using Fanex.BetFollow.Infrastructure.Configurations;
    using Fanex.BetFollow.Infrastructure.Helpers;
    using Fanex.BetFollow.Infrastructure.Models;
    using Fanex.Common;
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Diagnostics.CodeAnalysis;
    using System.Linq;

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

        [SuppressMessage("StyleCop.CSharp.Nexcel.NexcelCustomRules",
            "SP2101:MethodMustNotContainMoreLinesThan",
            Justification = "Reviewed. Suppression is OK here.")]
        public List<AutoFollowBetEntity> AutoFollowedBetCustomers(GetAutoFollowedBetCustomerCriteria criteria)
        {
            List<AutoFollowBetEntity> result = new List<AutoFollowBetEntity>();
            var rawData = _autoFollowBetAccess.GetAutoFollowBet(criteria);
            var autoFollowBetGroups = rawData.GroupBy(
                x => new
                {
                    Username = x.Field<string>("username"),
                    Source = x.Field<byte>("src"),
                    BaStatus = x.Field<int>("IsBA"),
                    Follower = x.Field<string>("Follower"),
                    IsAgent = x.Field<int>("IsAgent")
                }).ToList();
            criteria.TotalItems = autoFollowBetGroups.Count;
            autoFollowBetGroups = autoFollowBetGroups.Count > criteria.PageSize
                ? autoFollowBetGroups.Skip(criteria.CurrentPage * criteria.PageSize).Take(criteria.PageSize).ToList()
                : autoFollowBetGroups;

            foreach (var group in autoFollowBetGroups)
            {
                AutoFollowBetEntity autoFollowBet = new AutoFollowBetEntity
                {
                    UserName = Converter.ToString2(group.Key.Username),
                    Source = Convert.ToBoolean(group.Key.Source),
                    BaStatus = Convert.ToBoolean(group.Key.BaStatus),
                    Follower = Converter.ToString2(group.Key.Follower),
                    IsAgent = Convert.ToBoolean(group.Key.IsAgent)
                };
                foreach (var item in group)
                {
                    AutoFollowBetDetail autoFollowBetDetail = new AutoFollowBetDetail
                    {
                        FollowedLive = Convert.ToBoolean(item.Field<byte>("FollowLive")),

                        // HDP
                        Rate = Converter.ToDecimal(item.Field<decimal>("Rate")),
                        Odds = Converter.ToDecimal(item.Field<decimal>("Odds")),
                        FollowedHandicap = Convert.ToBoolean(item.Field<bool>("Follow1")),
                        FollowedFirstHalfHandicap = Convert.ToBoolean(item.Field<bool>("Follow7")),
                        FollowedOverUnder = Convert.ToBoolean(item.Field<bool>("Follow3")),
                        FollowedFirstHalfOverUnder = Convert.ToBoolean(item.Field<bool>("Follow8")),

                        // 1X2
                        Rate1X2 = Converter.ToDecimal(item.Field<decimal>("Rate2")),
                        Odds1X2 = Converter.ToDecimal(item.Field<decimal>("Odds2")),
                        Followed1X2 = Convert.ToBoolean(item.Field<bool>("Follow5")),
                        Followed1St1X2 = Convert.ToBoolean(item.Field<bool>("Follow15"))
                    };

                    autoFollowBet.AutoFollowBetDetail.Add(autoFollowBetDetail);
                }

                autoFollowBet.PageSize = criteria.PageSize;
                autoFollowBet.TotalItems = criteria.TotalItems;
                autoFollowBet.CurrentPage = criteria.CurrentPage;
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

        /// <summary>
        /// Deletes multiple the automatic followed bet customers.
        /// </summary>
        /// <param name="criteria">The criteria.</param>
        /// <returns>The automatic followed bet customer.</returns>
        public List<ResultModel> DeleteAutoFollowedBetCustomers(DeleteAutoFollowedBetCustomersCriteria criteria)
        {
            try
            {
                if (!criteria.IsValid())
                {
                    return null;
                }

                return _autoFollowBetAccess.DeleteAutoFollowedBetCustomers(criteria);
            }
            catch (Exception ex)
            {
                LogExtensions.ExceptionHandler(ex);
                throw;
            }
        }

        /// <summary>
        /// Adds multiple the automatic followed bet customers.
        /// </summary>
        /// <param name="criteria">The criteria.</param>
        /// <returns>The automatic followed bet customer.</returns>
        public List<ResultModel> AddAutoFollowedBetCustomers(AddAutoFollowedBetCustomersCriteria criteria)
        {
            try
            {
                if (!criteria.IsValid())
                {
                    return null;
                }

                return _autoFollowBetAccess.AddAutoFollowedBetCustomers(criteria);
            }
            catch (Exception ex)
            {
                LogExtensions.ExceptionHandler(ex);
                throw;
            }
        }

        /// <summary>
        /// Checks followed bet customer.
        /// </summary>
        /// <param name="criteria">Follow bet customer info.</param>
        /// <returns>ResultModel object.</returns>
        public ResultModel CheckAutoFollowedBetCustomer(CheckAutoFollowedBetCustomerCriteria criteria)
        {
            try
            {
                if (!criteria.IsValid())
                {
                    return null;
                }

                return _autoFollowBetAccess.CheckAutoFollowedBetCustomer(criteria);
            }
            catch (Exception ex)
            {
                LogExtensions.ExceptionHandler(ex);
                throw;
            }
        }
    }
}