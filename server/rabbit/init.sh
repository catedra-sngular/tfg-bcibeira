#!/bin/sh

# Create Rabbitmq vhost: su2
( rabbitmqctl wait --timeout 5 $RABBITMQ_PID_FILE ; \
rabbitmqctl add_vhost su2 ; \
echo "*** Virtual host su2 created. ***") &

# Create Rabbitmq user: manager
( rabbitmqctl wait --timeout 5 $RABBITMQ_PID_FILE ; \
rabbitmqctl add_user manager $MANAGER_PSSWD 2>/dev/null ; \
rabbitmqctl set_permissions -p su2 manager  ".*" ".*" ".*" ; \
echo "*** User manager created. ***") &

# Create Rabbitmq user: server
( rabbitmqctl wait --timeout 5 $RABBITMQ_PID_FILE ; \
rabbitmqctl add_user server $SERVER_PSSWD 2>/dev/null ; \
rabbitmqctl set_permissions -p su2 server  "" "output.*" "input" ; \
echo "*** User server created. ***") &

# Create Rabbitmq user: client
( rabbitmqctl wait --timeout 5 $RABBITMQ_PID_FILE ; \
rabbitmqctl add_user client $CLIENT_PSSWD 2>/dev/null ; \
rabbitmqctl set_permissions -p su2 client  ".*" "input" "output.*" ; \
echo "*** User client created. ***") &

# $@ is used to pass arguments to the rabbitmq-server command.
# For example if you use it like this: docker run -d rabbitmq arg1 arg2,
# it will be as you run in the container rabbitmq-server arg1 arg2
rabbitmq-server $@