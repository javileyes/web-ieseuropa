rm -rf dist/
npm run build
#ESTO LO COMENTO PORQUE SE DEBE HACER SOLO UNA VEZ
#eval `ssh-agent` #ESTO ES PARA NO TENER QUE PONER CONTINUAMENTE EL PASSWORD DE ENCRIPTACIÓN DE LA CLAVE PRIVADA
#ssh-add          #SI LA CLAVE NO ESTÁ EN SU SITIO POR DEFECTO PONER: ssh-add /home/test/.ssh/id_rsa
ssh root@ieseuropa.es rm -rf /root/ieseuropa/nginx-docker/html/*
scp -r dist/* root@ieseuropa.es:/root/ieseuropa/nginx-docker/html

