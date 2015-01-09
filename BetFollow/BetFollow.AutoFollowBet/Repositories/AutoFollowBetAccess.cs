// --------------------------------------------------------------------------
// <copyright file="AutoFollowBetAccess.cs" company="Nexcel Solutions Vietnam">
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
    using System.Linq;
    using Fanex.BetFollow.Infrastructure.Models;
    using Fanex.BetFollow.Module.AutoFollowBet.Criteria;
    using Fanex.BetFollow.Module.AutoFollowBet.Entities;
    using Fanex.Common;
    using Fanex.Data;

    /// <summary>
    /// Auto Follow Bet Access.
    /// </summary>
    public class AutoFollowBetAccess : IAutoFollowBetAccess
    {
        /// <summary>
        /// Gets the automatic followed bet customer.
        /// </summary>
        /// <param name="criteria">The criteria.</param>
        /// <returns>The automatic followed bet customer.</returns>
        public List<FollowedCustomer> GetAutoFollowedBetCustomer(GetAutoFollowedBetCustomerCriteria criteria)
        {
            var datatable = new DataTable();
            using (var databaseContext = new ObjectDb(criteria.SettingKey()))
            {
                databaseContext.AssignParamValues(criteria.StoreProcedureParams());
                var dataset = databaseContext.ExecuteDataSet();
                if (dataset.Tables.Count > 0)
                {
                    datatable = dataset.Tables[0];
                }
            }

            var listFollowedCustomer = new List<FollowedCustomer>();
            datatable.DefaultView.Sort = "username DESC";
            foreach (DataRow row in datatable.Rows)
            {
                listFollowedCustomer.Add(new FollowedCustomer
                {
                    Username = Converter.ToString2(row["username"]),
                    Follower = Converter.ToString2(row["follower"]),

                    Rate = (double)Converter.ToDecimal(row["rate"]),
                    BAStatus = Converter.ToBool(row["isba"]),

                    SourceId = Converter.ToInt(row["src"]),
                    LiveStatus = Converter.ToInt(row["FollowLive"]),
                    FollowedHDP = Converter.ToInt(row["Follow1"]),
                    Followed1stHDP = Converter.ToInt(row["Follow7"]),
                    FollowedOverUnder = Converter.ToInt(row["Follow3"]),
                    Followed1stOverUnder = Converter.ToInt(row["Follow8"]),
                    Odds = (double)Converter.ToDecimal(row["odds"])
                });
            }

            return listFollowedCustomer;
        }

        /// <summary>
        /// Deletes the automatic followed bet customer.
        /// </summary>
        /// <param name="criteria">The criteria.</param>
        /// <returns>The automatic followed bet customer.</returns>
        public ResultModel DeleteAutoFollowedBetCustomer(DeleteAutoFollowedBetCustomerCriteria criteria)
        {
            var result = new ResultModel();
            using (var databaseContext = new ObjectDb(criteria.SettingKey()))
            {
                databaseContext.AssignParamValues(criteria.StoreProcedureParams());
                databaseContext.ExecuteNonQuery();
                result.Message = Converter.ToString2(databaseContext.GetParameterValue("ErrMsg"));
                result.Code = Converter.ToInt(databaseContext.GetParameterValue("ErrCode"));
            }

            return result;
        }

        /// <summary>
        /// Updates the automatic followed bet customer.
        /// </summary>
        /// <param name="criteria">The criteria.</param>
        /// <returns>The automatic followed bet customer.</returns>
        public ResultModel UpdateAutoFollowedBetCustomer(UpdateAutoFollowedBetCustomerCriteria criteria)
        {
            var result = new ResultModel();
            using (var databaseContext = new ObjectDb(criteria.SettingKey()))
            {
                databaseContext.AssignParamValues(criteria.StoreProcedureParams());
                databaseContext.ExecuteNonQuery();
                result.Message = Converter.ToString2(databaseContext.GetParameterValue("ErrMsg"));
                result.Code = Converter.ToInt(databaseContext.GetParameterValue("ErrCode"));
            }

            return result;
        }

        /// <summary>
        /// Adds the automatic followed bet customer.
        /// </summary>
        /// <param name="criteria">The criteria.</param>
        /// <returns>The automatic followed bet customer.</returns>
        public ResultModel AddAutoFollowedBetCustomer(AddAutoFollowedBetCustomerCriteria criteria)
        {
            var result = new ResultModel();
            using (var databaseContext = new ObjectDb(criteria.SettingKey()))
            {
                databaseContext.AssignParamValues(criteria.StoreProcedureParams());
                databaseContext.ExecuteNonQuery();
                result.Message = Converter.ToString2(databaseContext.GetParameterValue("ErrMsg"));
                result.Code = Converter.ToInt(databaseContext.GetParameterValue("ErrCode"));
            }

            return result;
        }

        /// <summary>
        /// Gets the automatic follow bet.
        /// </summary>
        /// <param name="criteria">The criteria.</param>
        /// <returns>The automatic follow bet.</returns>
        public List<DataRow> GetAutoFollowBet(GetAutoFollowedBetCustomerCriteria criteria)
        {
            var dataTable = new DataTable();
            using (ObjectDb objectDb = new ObjectDb(criteria.SettingKey()))
            {
                objectDb.AssignParamValues(criteria.StoreProcedureParams());
                DataSet dataSet = objectDb.ExecuteDataSet();
                if (dataSet.Tables.Count > 0)
                {
                    dataTable = dataSet.Tables[0];
                }
            }

            return dataTable.AsEnumerable().ToList();
        }

        /// <summary>
        /// Deletes multiple the automatic followed bet customers.
        /// </summary>
        /// <param name="criteria">The criteria.</param>
        /// <returns>The automatic followed bet customer.</returns>
        public List<ResultModel> DeleteAutoFollowedBetCustomers(DeleteAutoFollowedBetCustomersCriteria criteria)
        {
            var results = new List<ResultModel>();
            using (var databaseContext = new ObjectDb(criteria.SettingKey()))
            {
                databaseContext.AssignParamValues(criteria.StoreProcedureParams());
                databaseContext.ExecuteNonQuery();

                var codes = databaseContext.GetParameterValue("ErrCode").ToString().Split(';');
                var messages = databaseContext.GetParameterValue("ErrMsg").ToString().Split(';');

                for (int i = 0; i < codes.Length; i++)
                {
                    var result = new ResultModel();
                    result.Message = Converter.ToString2(messages[i]);
                    result.Code = Converter.ToInt(codes[i]);

                    results.Add(result);
                }
            }

            return results;
        }

        /// <summary>
        /// Adds multiple the automatic followed bet customers.
        /// </summary>
        /// <param name="criteria">The criteria.</param>
        /// <returns>The automatic followed bet customer.</returns>
        public List<ResultModel> AddAutoFollowedBetCustomers(AddAutoFollowedBetCustomersCriteria criteria)
        {
            var results = new List<ResultModel>();
            using (var databaseContext = new ObjectDb(criteria.SettingKey()))
            {
                databaseContext.AssignParamValues(criteria.StoreProcedureParams());
                databaseContext.ExecuteNonQuery();

                var codes = databaseContext.GetParameterValue("ErrCode").ToString().Split(';');
                var messages = databaseContext.GetParameterValue("ErrMsg").ToString().Split(';');

                for (int i = 0; i < codes.Length; i++)
                {
                    var result = new ResultModel();
                    result.Message = Converter.ToString2(messages[i]);
                    result.Code = Converter.ToInt(codes[i]);

                    results.Add(result);
                }                
            }

            return results;
        }

        /// <summary>
        /// Checks followed bet customer.
        /// </summary>
        /// <param name="criteria">Follow bet customer info.</param>
        /// <returns>ResultModel object.</returns>
        public ResultModel CheckAutoFollowedBetCustomer(CheckAutoFollowedBetCustomerCriteria criteria)
        {
            var result = new ResultModel();
            using (var databaseContext = new ObjectDb(criteria.SettingKey()))
            {
                databaseContext.AssignParamValues(criteria.StoreProcedureParams());
                databaseContext.ExecuteNonQuery();
                result.Message = Converter.ToString2(databaseContext.GetParameterValue("ErrMsg"));
                result.Code = Converter.ToInt(databaseContext.GetParameterValue("ErrCode"));
            }

            return result;
        }
    }
}
