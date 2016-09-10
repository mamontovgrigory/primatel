using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Owin;
using Microsoft.Owin.Hosting;

namespace OwinApplication
{
    class Program
    {
        static void Main()
        {
            string baseAddress = "http://127.0.0.1:8080/";

            // Start OWIN host 
            using (WebApp.Start(url: baseAddress))
            {
                Console.WriteLine("Service Listening at " + baseAddress);
                System.Threading.Thread.Sleep(-1);
            }
        }
    }

    class Startup
    {
        // This code configures Web API. The Startup class is specified as a type
        // parameter in the WebApp.Start method.
        public void Configuration(IAppBuilder appBuilder)
        {
            // Configure Web API for self-host. 
            HttpConfiguration config = new HttpConfiguration();
            config.EnableCors();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "Api/{controller}/{action}",
                defaults: new { id = RouteParameter.Optional }
            );

            appBuilder.UseWebApi(config);
        }
    }
}
