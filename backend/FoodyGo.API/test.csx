var client = new HttpClient();
var loginData = new { Email = "nazli.karademir@gmail.com", Password = "123Deneme." };
var loginRes = await client.PostAsync("http://localhost:5246/api/auth/login", new StringContent(JsonSerializer.Serialize(loginData), System.Text.Encoding.UTF8, "application/json"));
var loginJson = await loginRes.Content.ReadAsStringAsync();
Console.WriteLine(loginJson);
