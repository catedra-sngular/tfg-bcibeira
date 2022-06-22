FROM python:3.8
COPY . .
WORKDIR /api-server
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN ls -l