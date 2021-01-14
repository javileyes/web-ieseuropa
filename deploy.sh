rm -rf dist/
npm run build
#eval `ssh-agent` #ESTO ES PARA NO TENER QUE PONER CONTINUAMENTE EL PASSWORD DE ENCRIPTACIÓN DE LA CLAVE PRIVADA
#ssh-add          #SI LA CLAVE NO ESTÁ EN SU SITIO POR DEFECTO PONER: ssh-add /home/test/.ssh/id_rsa
ssh root@javiergimenez.es rm -rf /root/ieseuropa/nginx-docker/html/*
scp -r dist/* root@javiergimenez.es:/root/ieseuropa/nginx-docker/html
