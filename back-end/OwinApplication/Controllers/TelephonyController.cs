using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using Newtonsoft.Json.Serialization;

namespace OwinApplication
{
    public class CallTotals
    {
        public CallTotals(int Id, string Name)
        {
            this.Id = Id;
            this.Name = Name;
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public int[] Data = { 15, 12, 10, 28, 21, 11 };
    }

    public class CallsDetails
    {
        public string Datetime = "09:19:21 01.07.2016";
        public string NumFrom = "+7 (921) 940-00-99";
        public string NumTo = "+7 (499) 641-36-65";
        public string Duration = "126";
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class TelephonyController : ApiController
    {
        public HttpResponseMessage GetCallTotals()
        {
            CallTotals[] callsTotals = new CallTotals[]
            {
                new CallTotals ( 1, "Ауди Варшавка" ),
                new CallTotals ( 2, "Хендай Сити" ),
                new CallTotals ( 3, "Киа Автостарт" ),
                new CallTotals ( 4, "Фаворит" )
            };

            var response = Request.CreateResponse(HttpStatusCode.OK, "", "application/json");

            var formatter = new JsonMediaTypeFormatter();
            formatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            response = Request.CreateResponse<CallTotals[]>(
                HttpStatusCode.OK,
                callsTotals,
                formatter,
                new MediaTypeWithQualityHeaderValue("application/json"));

            return response;
        }

        public HttpResponseMessage GetCallsDetails()
        {
            CallsDetails[] callsDetails = new CallsDetails[]
            {
                new CallsDetails (),
                new CallsDetails (),
                new CallsDetails (),
                new CallsDetails (),
                new CallsDetails (),
                new CallsDetails (),
                new CallsDetails (),
                new CallsDetails ()
            };

            var response = Request.CreateResponse(HttpStatusCode.OK, "", "application/json");

            var formatter = new JsonMediaTypeFormatter();
            formatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            response = Request.CreateResponse<CallsDetails[]>(
                HttpStatusCode.OK,
                callsDetails,
                formatter,
                new MediaTypeWithQualityHeaderValue("application/json"));

            return response;
        }
    }
}
