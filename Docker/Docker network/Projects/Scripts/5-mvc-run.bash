docker run -d \
  --name mvc_app \
  --network app_network \
  -p 8081:8081 \
  -e ASPNETCORE_URLS=http://+:8081 \
  mvc