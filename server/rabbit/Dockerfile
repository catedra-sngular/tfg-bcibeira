FROM rabbitmq

# Define environment variables.
ENV RABBITMQ_USER manager
ENV RABBITMQ_PASSWORD manager
ENV RABBITMQ_PID_FILE /var/lib/rabbitmq/mnesia/rabbitmq

COPY ./rabbit/init.sh /init.sh
RUN chmod +x /init.sh

# Define default command
CMD ["/init.sh"]
