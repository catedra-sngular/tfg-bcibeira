FROM python:3.8
COPY ./api-client .
RUN mkdir /resources
RUN pip install -r requirements.txt
ENV LOCAL_STORE_PATH='/resources'
ENV REMOTE_STORE_PATH='endTest/server/pipe/resources/'
