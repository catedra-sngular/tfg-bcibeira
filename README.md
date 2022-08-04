# Pasos para facilitar o uso
  
Paso 1. Crear os contenedores servidor  
cd server  
docker compose up  [--build se as variables de entorno son modificadas]  
  
Paso 2. Crear os contenedores cliente  
cd client  
docker-compose up  [--build se as variables de entorno son modificadas]  
  
Paso 3. Escoitar a través da pipe  
cd ../server/pipe  
./pipe.sh  