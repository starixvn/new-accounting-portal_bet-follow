// --------------------------------------------------------------------------
// <copyright file="ResultModel.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2012.12.07">Created</change>
// </history>

namespace BetFollow.Infrastructure.Models
{
    using System;

    /// <summary>
    /// Result Model.
    /// </summary>
    [Serializable]
    public class ResultModel
    {
        public ResultModel()
        {
        }

        public ResultModel(int code, string message)
        {
            Code = code;
            Message = message;
        }

        public int Code { get; set; }

        public string Message { get; set; }
    }
}
