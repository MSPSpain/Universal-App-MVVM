namespace MVVMtpl.Services
{
 using System.Collections.Generic;
 using System.Net.Http;
 using System.Net.Http.Headers;
 using System.Threading.Tasks;
 using Newtonsoft.Json;
 using System.Text;

 public class HttpService
 {
     /// <summary>
     /// Initializes a new instance of the HttpService class
     /// </summary>
     public HttpService()
     {
     }

     /// <summary>
     /// Makes a GET request
     /// </summary>
     /// <param name="requestUriString">The request Uri</param>
     /// <returns>The task to wait for the response</returns>
     public async Task<byte[]> GetAsync(string requestUriString)
     {
         HttpClientHandler handler = new HttpClientHandler();
         HttpClient httpClient = new HttpClient(handler);
         httpClient.MaxResponseContentBufferSize = 256000;
         HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, requestUriString);

         HttpResponseMessage response = await httpClient.SendAsync(request);

         response.EnsureSuccessStatusCode();

         return await response.Content.ReadAsByteArrayAsync();
     }

     /// <summary>
     /// Makes a POST request
     /// </summary>
     /// <param name="requestUriString">The request Uri</param>
     /// <returns>The task to wait for the response string</returns>
     public async Task<string> PostAsync(string requestUriString)
     {
         HttpClientHandler handler = new HttpClientHandler();
         HttpClient httpClient = new HttpClient(handler);
         HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, requestUriString);

         HttpResponseMessage response = await httpClient.SendAsync(request);

         response.EnsureSuccessStatusCode();

         return await response.Content.ReadAsStringAsync();
     }

     /// <summary>
     /// Makes a post request sending JSON content.
     /// </summary>
     /// <param name="requestUriString">The request Uri</param>
     /// <param name="data">The content to POST</param>
     /// <returns>The task to wait for the response string</returns>
     public async Task<string> PostAsync(string requestUriString, object data)
     {
         var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");

         HttpClient client = new HttpClient();
         HttpResponseMessage response = await client.PostAsync(requestUriString, content);

         return await response.Content.ReadAsStringAsync();
     }

     /// <summary>
     /// Makes a POST request
     /// </summary>
     /// <param name="requestUriString">The request Uri</param>
     /// <param name="contentType">The type of content to send with the request</param>
     /// <param name="content">The content to send with the request</param>
     /// <returns>The task to wait for the response string</returns>
     public async Task<string> PostAsync(string requestUriString, string contentType, byte[] content)
     {
         HttpClientHandler handler = new HttpClientHandler();
         HttpClient httpClient = new HttpClient(handler);
         HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, requestUriString);
         request.Content = new ByteArrayContent(content);
         request.Content.Headers.ContentType = new MediaTypeHeaderValue(contentType);

         HttpResponseMessage response = await httpClient.SendAsync(request);
         response.EnsureSuccessStatusCode();

         return await response.Content.ReadAsStringAsync();
     }

     /// <summary>
     /// Makes a POST request
     /// </summary>
     /// <param name="requestUriString">The request Uri</param>
     /// <param name="content">The content to send with the request</param>
     /// <returns>The task to wait for the response string</returns>
     public async Task<string> PostAsync(string requestUriString, List<KeyValuePair<string, string>> content)
     {
         HttpClientHandler handler = new HttpClientHandler();
         HttpClient httpClient = new HttpClient(handler);
         HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, requestUriString);
         request.Content = new FormUrlEncodedContent(content);

         HttpResponseMessage response = await httpClient.SendAsync(request);
         response.EnsureSuccessStatusCode();

         return await response.Content.ReadAsStringAsync();
     }
 }
}
