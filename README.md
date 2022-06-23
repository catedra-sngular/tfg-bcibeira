# Pasos para facilitar o uso
Para comezar, parto da base de que o usuario ten python, node...
Se NON é o teu caso, por favor lee o documento 'PREVIOUS_REQUIREMENTS'

Paso 1. Crear o contedor de docker
sudo docker-compose up (o uso de sudo correxirase nun futuro a corto plazo)

Paso 2. Lanzar a API de lado cliente
cd api-client
flask run

Paso 3. Lanzar o frontal
cd ../sugus
npm i
npm start