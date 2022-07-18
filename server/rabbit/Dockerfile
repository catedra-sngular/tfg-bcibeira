FROM rabbitmq

# Define environment variables.
ENV RABBITMQ_PID_FILE /var/lib/rabbitmq/mnesia/rabbitmq

COPY ./rabbit/init.sh /init.sh
RUN chmod +x /init.sh
