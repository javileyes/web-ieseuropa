rm -rf dist/
npm run build
ssh root@cassandra1.javiergimenez.es rm -rf /root/httpd/*
scp -r dist/* root@cassandra1.javiergimenez.es:/root/httpd