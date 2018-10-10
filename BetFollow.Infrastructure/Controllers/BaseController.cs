// --------------------------------------------------------------------------
// <copyright file="BaseController.cs" >

// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2012.12.07">Created</change>
// </history>

namespace Fanex.BetFollow.Infrastructure.Controllers
{
    using System.Web.Mvc;
    using Fanex.BetFollow.Infrastructure.Services;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Configuration;
    using Fanex.NAP.Core.Web;
    using Fanex.NAP.Core.Web.Context;
    using Fanex.NAP.Core.Web.Session;
    using NAP.Core.Context;

    public class BaseController : Controller
    {
        private readonly ICurrentContext _currentContext;

        private readonly ICurrentSession _currentSession;

        private readonly string _environment = NapSettings.Settings.Environment;

        private readonly int _siteId = NapSettings.Settings.SiteId;

        private readonly bool _issiteLogin = NapSettings.Settings.EnableDirectLogin;


        public BaseController()
        {
            this._currentContext = new CurrentContext();
            ViewBag.Session = this._currentSession = new CurrentSession();

            ViewFlags = new ViewFlags
            {
                IsLive = this._environment.Equals(Constant.LIVE),
                HasEditRight = false
            };
        }

        /// <summary>
        /// Gets a value indicating whether [is site login].
        /// </summary>
        /// <value>
        ///   <c>True</c> if [is site login]; otherwise, <c>false</c>.
        /// </value>
        public bool IsSiteLogin
        {
            get
            {
                return this._issiteLogin;
            }
        }

        protected ViewFlags ViewFlags
        {
            get
            {
                return ViewBag.ViewFlags;
            }

            set
            {
                ViewBag.ViewFlags = value;
            }
        }

        protected ICurrentContext CurrentContext
        {
            get { return _currentContext; }
        }

        protected ICurrentSession CurrentSession
        {
            get { return _currentSession; }
        }

        protected string Environment
        {
            get { return _environment; }
        }

        protected int SiteId
        {
            get { return _siteId; }
        }


        /// <summary>
        /// Execute before each request, if Downtime then go to Downtime page
        /// Or not Authenticate will go to Login Page.
        /// </summary>
        /// <param name="filterContext">Information about the current request and action.</param>
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            AppSession.CurrentActionName = filterContext.ActionDescriptor.ActionName;
            base.OnActionExecuting(filterContext);
        }
    }
}
