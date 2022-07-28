FROM python:3.8
COPY ./daemon .
RUN pip install -r requirements.txt
VOLUME /hostpipe
ENV MANAGER_PSSWD="manager"
ENV SERVER_PSSWD="server"
