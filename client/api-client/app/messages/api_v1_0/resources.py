from time import sleep
from flask import request, Blueprint
from flask_restful import Api, Resource

from .schemas import ConnSchema, FileSchema
import paramiko, os
from .conn__enum import ConnType
from werkzeug.utils import secure_filename

mssges_v1_0_bp = Blueprint('mssges_v1_0_bp', __name__)
api = Api(mssges_v1_0_bp)
conn_schema = ConnSchema()
file_schema = FileSchema()

user = ''
address = ''
password = ''

# localPath = os.environ.get('LOCAL_STORE_PATH')
# remotePath = os.environ.get('REMOTE_STORE_PATH')

localPath = '/home/RED/bcibeira/Escritorio/'
remotePath = 'endTest/server/pipe/resources/'

# Inicia un cliente SSH
ssh_client = paramiko.SSHClient()

def openConn(params):
    # Establecer política por defecto para localizar la llave del host localmente
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    # Conectarse
    ssh_client.connect(params['address'], 22, params['user'], params['password'])

    global user, address, password
    user = params['user']
    address = params['address']
    password = params['password']

def closeConn(params):
    global user, address, password
    if ssh_client:
        if (params['password'] == password):
            # Cerrar la conexión
            ssh_client.close()

            user = ''
            address = ''
            password = ''
        else:
            raise ValueError

def sendFile(file, folder):
    print('sftpeando...')
    # Configura una conexión sftp por la conexión ssh existente
    sftp = ssh_client.open_sftp()
    # Envía los archivos
    sftp.put(localPath + folder + file, remotePath + folder + file, confirm=False)
    sftp.close()

def notifyServer(config, mesh, folder):
    data = '{"config":' + f'"{config}", "mesh": "{mesh}", "folder": "{folder}"' + '}'
    command = f"curl -X POST -H 'Content-Type: application/json' -d '{data}' http://localhost:50000/api/v1.0/file/"
    # Ejecutar un comando de forma remota capturando entrada, salida y error estándar
    entrada, salida, error = ssh_client.exec_command(command)

def obtainFolder():
    entrada, salida, error = ssh_client.exec_command('curl http://localhost:50000/api/v1.0/folder/')
    # Guardar la salida estándar
    output = salida.read().decode('unicode-escape').replace('"','').replace('\n','')
    print(output)
    return output

def readMessages(hash):
    command = f"curl http://localhost:50000/api/v1.0/queues-messages/{hash}"
    # Ejecutar un comando de forma remota capturando entrada, salida y error estándar
    entrada, salida, error = ssh_client.exec_command(command)
    output = salida.read().decode('unicode-escape').replace('"','')
    err = error.read().decode('unicode-escape').replace('"','')
    print(output)
    print(err)
    return output

def storeFiles(folder):
    configFile = request.files['configFile']
    configFilename = secure_filename(configFile.filename)
    meshFile = request.files['meshFile']
    meshFilename = secure_filename(meshFile.filename)
    os.mkdir(localPath + folder)

    configFile.save(localPath + folder + configFilename)
    meshFile.save(localPath + folder + meshFilename)

    return (configFilename, meshFilename)

class ConnectionResource(Resource):
    def post(self):
        data = request.get_json()
        conn_dict = conn_schema.load(data)
        type = conn_dict['connType']
        conn_dict.pop('connType')
        try:
            if type == ConnType.OPEN:
                openConn(conn_dict)
            if type == ConnType.CLOSE:
                closeConn(conn_dict)
            if type != ConnType.OPEN & type != ConnType.CLOSE:
                return 'Parámetro de conexión no válido', 400
        except ValueError:
            return 'Credentials not correct', 401
        except:
            return 'Error de conexión', 500
        return 'OK', 200

    def get(self):

        response = {
            "user": user,
            "address": address
        }

        return response, 200

class FileResource(Resource):
    def post(self):
        folder = obtainFolder()
        hash = folder[5:11]

        configFilename, meshFilename = storeFiles(folder)

        sendFile(configFilename, folder)
        sendFile(meshFilename, folder)
        notifyServer(configFilename, meshFilename, folder)
        sleep(5)
        response = readMessages(hash)
        return response, 200

api.add_resource(ConnectionResource, '/api/v1.0/connection/', endpoint='connection_resource')
api.add_resource(FileResource, '/api/v1.0/file/', endpoint='file_resource')
# api.add_resource(MessagesResource, '/api/v1.0/file/', endpoint='file_resource')