

FROM python:3.6-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir /api
WORKDIR /api
RUN pip3 install --upgrade pip
COPY requirements.txt /api/

RUN pip3 install -r requirements.txt

COPY . /api/

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]