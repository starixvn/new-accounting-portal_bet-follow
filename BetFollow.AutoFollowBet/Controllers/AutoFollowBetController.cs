// --------------------------------------------------------------------------
// <copyright file="AutoFollowBetController.cs" company="Nexcel Solutions Vietnam">
// Copyright (c) Nexcel Solutions Vietnam. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2012.12.07">Created</change>
// </history>

namespace Fanex.BetFollow.AutoFollowBet.Controllers
{
    using System.Web.Mvc;
    using Fanex.BetFollow.Infrastructure.Constants;
    using Fanex.BetFollow.Infrastructure.Controllers;
    using Fanex.BetFollow.AutoFollowBet.Criteria;
    using Fanex.BetFollow.AutoFollowBet.Services;
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

        [NapAuth(FunctionKey = FunctionPermissions.AutoFollowBet, Policy = Constant.Policy.Read)]
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
        public JsonResult AddAutoFollowedBetCustomer(AddAutoFollowedBetCustomersCriteria criteria)
        {
            criteria.Usernames = criteria.Username;
            object result = criteria.Username.Contains(",") ? _autoFollowBetService.AddAutoFollowedBetCustomers(criteria) :
                _autoFollowBetService.AddAutoFollowedBetCustomer(criteria) as object;
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [NapAuth(FunctionKey = FunctionPermissions.AutoFollowBet, Policy = Constant.Policy.Host)]
        public JsonResult DeleteAutoFollowedBetCustomers(DeleteAutoFollowedBetCustomersCriteria criteria)
        {
            var result = _autoFollowBetService.DeleteAutoFollowedBetCustomers(criteria);
            return Json(result);
        }

        [HttpPost]
        [NapAuth(FunctionKey = FunctionPermissions.AutoFollowBet, Policy = Constant.Policy.Host)]
        public JsonResult AddAutoFollowedBetCustomers(AddAutoFollowedBetCustomersCriteria criteria)
        {
            var result = _autoFollowBetService.AddAutoFollowedBetCustomers(criteria);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CheckAutoFollowedBetCustomer(CheckAutoFollowedBetCustomerCriteria criteria)
        {
            var result = _autoFollowBetService.CheckAutoFollowedBetCustomer(criteria);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
