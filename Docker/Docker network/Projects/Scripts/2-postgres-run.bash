docker run -d \
 --name postgres_db \
 --network app_network \
 -p 5432:5432 \
 -e POSTGRES_USER=myuser \
 -e POSTGRES_PASSWORD=mypassword \
 -e POSTGRES_DB=mydatabase \
 postgres