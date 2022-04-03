FROM python:3-slim
WORKDIR /usr/src/app
COPY . .
RUN python -m pip install --no-cache-dir -r reqs.txt
CMD [ "python", "./activity_kafka.py" ]
