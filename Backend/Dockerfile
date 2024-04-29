FROM python:3.11

WORKDIR /main
COPY . /BTP/


RUN pip install -r requirement.txt

COPY . .

CMD [ "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80" ]