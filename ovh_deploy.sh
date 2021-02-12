#para OVH
rm -rf dist/
npm run build
#eval `ssh-agent`
#ESTO ES PARA NO TENER QUE PONER CONTINUAMENTE EL PASSWORD DE ENCRIPTACIÓN DE LA CLAVE PRIVADA
#ssh-add          #SI LA CLAVE NO ESTÁ EN SU SITIO POR DEFECTO PONER: ssh-add /home/test/.ssh/id_rsa
ssh centos@ieseuropa.es sudo rm -rf /root/ieseuropa/nginx-docker/html/
ssh centos@ieseuropa.es sudo mkdir /root/ieseuropa/nginx-docker/html/
ssh centos@ieseuropa.es mkdir /home/centos/temporal
scp -r dist/* centos@ieseuropa.es:/home/centos/temporal
ssh centos@ieseuropa.es sudo mv /home/centos/temporal/* /root/ieseuropa/nginx-docker/html
ssh centos@ieseuropa.es rm -rf /home/centos/temporal
ssh centos@ieseuropa.es sudo docker container restart nginx-ieseuropa