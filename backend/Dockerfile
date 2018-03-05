FROM python:3.6
ENV PYTHONPATH /code:/libs
ENV PYTHONUNBUFFERED 1
WORKDIR /code

RUN pip install pipenv

COPY Pipfile /code/
COPY Pipfile.lock /code/
RUN pipenv install --dev --system
