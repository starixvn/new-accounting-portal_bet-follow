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
    using BetFollow.AutoFollowBet.Criteria;
    using BetFollow.AutoFollowBet.Services;
    using BetFollow.Infrastructure.Constants;
    using BetFollow.Infrastructure.Controllers;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Web.Attribute;

    /// <summary>
    /// Common Controller.
    /// </summary>
    public class AutoFollowBetController : BaseController
    {
        private readonly IAutoFollowBetService _autoFollowBetService;

        public AutoFollowBetController(IAutoFollowBetService autoFollowBetService)
        {
            _autoFollowBetService = autoFollowBetService ?? new AutoFollowBetService();
        }

        public AutoFollowBetController()
            : this(null)
        {
            _autoFollowBetService = new AutoFollowBetService();
        }

        public ActionResult Index()
        {
            return View("~/Areas/AutoFollowBet/ManageList/Index.cshtml");
        }

        public JsonResult FollowTypes()
        {
            var result = _autoFollowBetService.FollowTypes();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AutoFollowedBetCustomers(GetAutoFollowedBetCustomerCriteria criteria)
        {
            var result = _autoFollowBetService.AutoFollowedBetCustomers(criteria);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [NapAuth(FunctionKey = FunctionPermissions.AutoFollowBet, Policy = Constant.Policy.Host)]
        public JsonResult UpdateAutoFollowedBetCustomer(UpdateAutoFollowedBetCustomerCriteria criteria)
        {
            var result = _autoFollowBetService.UpdateAutoFollowedBetCustomer(criteria);
            return Json(result);
        }

        [HttpPost]
        [NapAuth(FunctionKey = FunctionPermissions.AutoFollowBet, Policy = Constant.Policy.Host)]
        public JsonResult DeleteAutoFollowedBetCustomer(DeleteAutoFollowedBetCustomerCriteria criteria)
        {
            var result = _autoFollowBetService.DeleteAutoFollowedBetCustomer(criteria);
            return Json(result);
        }

        [HttpPost]
        [NapAuth(FunctionKey = FunctionPermissions.AutoFollowBet, Policy = Constant.Policy.Host)]
        public JsonResult AddAutoFollowedBetCustomer(AddAutoFollowedBetCustomerCriteria criteria)
        {
            var result = _autoFollowBetService.AddAutoFollowedBetCustomer(criteria);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
