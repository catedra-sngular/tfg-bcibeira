#!/bin/sh

# Create Rabbitmq vhost: su2
( rabbitmqctl wait --timeout 5 $RABBITMQ_PID_FILE ; \
rabbitmqctl add_vhost su2 ; \
echo "*** User manager with password manager completed. ***") &

# Create Rabbitmq user: manager
( rabbitmqctl wait --timeout 5 $RABBITMQ_PID_FILE ; \
rabbitmqctl add_user manager manager 2>/dev/null ; \
rabbitmqctl set_permissions -p su2 manager  ".*" ".*" ".*" ; \
echo "*** User manager with password manager completed. ***") &

# Create Rabbitmq user: server
( rabbitmqctl wait --timeout 5 $RABBITMQ_PID_FILE ; \
rabbitmqctl add_user server server 2>/dev/null ; \
rabbitmqctl set_permissions -p su2 server  "" "output.*" "input" ; \
echo "*** User server with password server completed. ***") &

# Create Rabbitmq user: client
( rabbitmqctl wait --timeout 5 $RABBITMQ_PID_FILE ; \
rabbitmqctl add_user client client 2>/dev/null ; \
rabbitmqctl set_permissions -p su2 client  ".*" "input" "output.*" ; \
echo "*** User client with password client completed. ***") &

# $@ is used to pass arguments to the rabbitmq-server command.
# For example if you use it like this: docker run -d rabbitmq arg1 arg2,
# it will be as you run in the container rabbitmq-server arg1 arg2
rabbitmq-server $@