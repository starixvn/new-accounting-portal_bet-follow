// --------------------------------------------------------------------------
// <copyright file="FollowTypeInfo.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2012.12.07">Created</change>
// </history>

namespace Fanex.BetFollow.Module.AutoFollowBet.Models
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Follow Type Information.
    /// </summary>
    [Serializable]
    public class FollowTypeInfo
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public bool IsActive { get; set; }

        public bool IsSelected { get; set; }

        public List<FollowTypeInfo> ChildsInfo { get; set; }
    }
}
