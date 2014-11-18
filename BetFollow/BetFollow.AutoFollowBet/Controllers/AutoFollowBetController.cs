// --------------------------------------------------------------------------
// <copyright file="AutoFollowBetController.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2012.12.07">Created</change>
// </history>

namespace BetFollow.AutoFollowBet.Controllers
{
    using System.Web.Mvc;
    using BetFollow.Infrastructure.Controllers;

    /// <summary>
    /// Common Controller.
    /// </summary>
    public class AutoFollowBetController : BaseController
    {
        public ActionResult Index()
        {
            return View("~/Areas/AutoFollowBet/ManageList/Index.cshtml");
        }
    }
}
