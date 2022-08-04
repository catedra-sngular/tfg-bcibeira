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

localPath = os.environ.get('LOCAL_STORE_PATH')
remotePath = os.environ.get('REMOTE_STORE_PATH')

# Inicia un cliente SSH
ssh_client = paramiko.SSHClient()

def openConn(params):
    # Establecer política por defecto para localizar la llave del host localmente
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    # Conectarse
    ssh_client.connect(params['dir'], 22, params['user'], params['passwd'])

def closeConn():
    if ssh_client:
        # Cerrar la conexión
        ssh_client.close()

def testServerAPI():
    # Ejecutar un comando de forma remota capturando entrada, salida y error estándar
    entrada, salida, error = ssh_client.exec_command('curl http://localhost:50000/api/v1.0/test/')
    # Guardar la salida estándar
    output = salida.read().decode('unicode-escape')
    return output

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
    output = salida.read().decode('unicode-escape')
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
        folder = obtainFolder()[1:13]

        configFilename, meshFilename = storeFiles(folder)

        sendFile(configFilename, folder)
        sendFile(meshFilename, folder)
        notifyServer(configFilename, meshFilename, folder)

        return 200

api.add_resource(TestResource, '/api/v1.0/test/', endpoint='test_resource')
api.add_resource(FileResource, '/api/v1.0/file/', endpoint='file_resource')
