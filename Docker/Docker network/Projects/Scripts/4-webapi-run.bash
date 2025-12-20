docker run -d \
  --name webapi_app \
  --network app_network \
  -p 8080:8080 \
  -e ASPNETCORE_URLS=http://+:8080 \
  -e ConnectionStrings__DefaultConnection="Host=postgres_db;Port=5432;Database=mydatabase;Username=myuser;Password=mypassword" \
  webapi