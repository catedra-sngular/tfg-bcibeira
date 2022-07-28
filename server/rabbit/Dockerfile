FROM rabbitmq

# Define environment variables.
ENV RABBITMQ_PID_FILE /var/lib/rabbitmq/mnesia/rabbitmq
ENV MANAGER_PSSWD="manager"
ENV SERVER_PSSWD="server"
ENV CLIENT_PSSWD="client"

COPY ./rabbit/init.sh /init.sh
RUN chmod +x /init.sh
