using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Web;
using System.Net;
using System.IO;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace weatherAPI
{
    public class HomeController : Controller
    {
        // GET: /<controller>/

        public string getApiWeather(string city)
        {
            try
            {
                WebRequest request = WebRequest.Create("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=085f4b50e8adc99d36594bccf45dfcf3");
                WebResponse response = request.GetResponse();
                using (Stream responseStream = response.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(responseStream);
                    return reader.ReadToEnd();
                }
            }
            catch (WebException ex)
            {
                /*WebExceptionStatus status = ex.Status;
                if (status == WebExceptionStatus.ProtocolError)
                {
                    HttpWebResponse httpResponse = (HttpWebResponse)ex.Response;
                    return "123";
                }*/
                return "error";
            }
           

        }
    }
}
