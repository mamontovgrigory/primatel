using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Owin;
using System.Web.Http;
using System.Web.Http.Cors;

using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using Newtonsoft.Json.Serialization;


namespace OwinApplication
{
    public class Client
    {
        public Client(int Id, string Name)
        {
            this.Id = Id;
            this.Name = Name;
        }

        public int Id { get; set; }
        public string Name { get; set; }
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ClientsController : ApiController
    {        
        /*public IEnumerable<Client> Get()
        {
            return clients;
        }*/

        public HttpResponseMessage Get()
        {
            Client[] clients = new Client[]
            {
                new Client ( 1, "Ауди Варшавка" ),
                new Client ( 2, "Автомир Киа" ),
                new Client ( 3, "Киа Автостарт" ),
                new Client ( 4, "Фаворит" ),
                new Client ( 5, "Ралли" ),
                new Client ( 6, "Хендай Сити" ),
                new Client ( 7, "Мб Белево" ),
                new Client ( 8, "Автотемп" )
            };

            var response = Request.CreateResponse(HttpStatusCode.OK, "", "application/json");

            var formatter = new JsonMediaTypeFormatter();
            formatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            
            response = Request.CreateResponse<Client[]>(
                HttpStatusCode.OK,
                clients,
                formatter,
                new MediaTypeWithQualityHeaderValue("application/json"));

            return response;
        }
    }
}
