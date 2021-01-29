FROM python:3.8-alpine
WORKDIR /matiushin_medvedev
RUN touch __init__.py
COPY . /matiushin_medvedev/backend/
WORKDIR /matiushin_medvedev/backend/
RUN pip install --upgrade pip \
    &&  apk add --no-cache postgresql-libs \
    &&  apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev \
    && pip install -r requirements.txt
ENV FLASK_APP __init__.py
ENTRYPOINT ["flask", "run", "--host=0.0.0.0"]
