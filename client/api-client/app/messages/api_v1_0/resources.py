from flask import request, Blueprint
from flask_restful import Api, Resource

from .schemas import ConnSchema, FileSchema
import paramiko
from .conn__enum import ConnType

mssges_v1_0_bp = Blueprint('mssges_v1_0_bp', __name__)
api = Api(mssges_v1_0_bp)
conn_schema = ConnSchema()
file_schema = FileSchema()

# Inicia un cliente SSH
ssh_client = paramiko.SSHClient()

# credentials = pika.PlainCredentials('manager', 'manager')
# # Local
# parameters = pika.ConnectionParameters('192.168.251.134', 5672, 'su2', credentials)
# # Server
# # parameters = pika.ConnectionParameters('localhost', 5672, 'su2', credentials)


# connection = pika.BlockingConnection(parameters)
# channel = connection.channel()

def openConn(params):
    print('hola api')
    # Establecer política por defecto para localizar la llave del host localmente
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    # Conectarse
    ssh_client.connect(params['dir'], 22, params['user'], params['passwd'])
    ssh_client.exec_command('mkdir resources')

def closeConn():
    if ssh_client:
        print('agur api')
        # Cerrar la conexión
        ssh_client.close()

def testServerAPI():
    # Ejecutar un comando de forma remota capturando entrada, salida y error estándar
    entrada, salida, error = ssh_client.exec_command('curl http://localhost:27000/api/v1.0/test/')
    # Mostrar la salida estándar en pantalla
    output = salida.read().decode('unicode-escape')
    print('rec server: ', output)
    return output

# def sendConfigFile(params):
#     print('sftpeando...')
#     # Configura una conexión sftp por la conexión ssh existente
#     sftp = ssh_client.open_sftp()
#     print('ahh')
#     print(params['localDir'])
#     # Envía el archivo
#     # fileName = params['remoteName']
#     sftp.put(params['localDir'],f'/home/bcibeira/resources/conf.cfg')

def sendConfigFile(file):
    command = 'curl -X POST -H "Content-Type: application/json" -d "{"file": "aaa"}" http://localhost:27000/api/v1.0/file'
    print(command)
    # Ejecutar un comando de forma remota capturando entrada, salida y error estándar
    entrada, salida, error = ssh_client.exec_command(command)

class TestResource(Resource):
    def post(self):
        data = request.get_json()
        conn_dict = conn_schema.load(data)
        type = conn_dict['connType']
        conn_dict.pop('connType')
        try:
            if type == ConnType.OPEN:
                openConn(conn_dict)
            if type == ConnType.CLOSE:
                closeConn()
            if type != ConnType.OPEN & type != ConnType.CLOSE:
                return 'Parámetro de conexión no válido', 400
        except:
            closeConn()
            return 'Error de conexión', 500
        return 200

    def get(self):
        try:
            response = testServerAPI()
        except:
            closeConn()
            return 'Error de conexión', 500
        return response, 200

class FileResource(Resource):
    def post(self):
        print('hola file')
        # print(request.files['configFile'].read())
        # try:
        sendConfigFile(request.files['configFile'])
        # except:
        #     return 'Error de conexión', 500
        return 200

api.add_resource(TestResource, '/api/v1.0/test/', endpoint='test_resource')
api.add_resource(FileResource, '/api/v1.0/file/', endpoint='file_resource')
