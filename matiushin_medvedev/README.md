# Приложение по учету успеваемости студентов.
* [Задание](#задание)
* [Запуск приложения](#запуск-приложения)
* [API](#api)
    * [Студенты](#студенты)
        * [Добавить студента](#добавить-студента)
        * [Получить список всех студентов](#получить-список-всех-студентов)
        * [Изменить данные студента](#изменить-данные-студента)
        * [Удалить студента](#удалить-студента)
        * [Подсчитать количество студентов обучающихся на заданной форме обучения](#подсчитать-количество-студентов-обучающихся-на-заданной-форме-обучения)
    * [Учебные планы](#учебные-планы)
        * [Добавить учебный план](#добавить-учебный-план)
        * [Получить список всех учебных планов](#получить-список-всех-учебных-планов)
        * [Получить данные по учебному плану](#получить-данные-по-учебному-плану)
        * [Изменить данные учебного плана](#изменить-данные-учебного-плана)
        * [Удалить учебный план](#удалить-учебный-план)
        * [Получить оценки всех студентов за все года по учебному плану](#получить-оценки-всех-студентов-за-все-года-по-учебному-плану)
    * [Журнал успеваемости](#журнал-успеваемости)
        * [Добавить оценку](#добавить-оценку)
        * [Изменить оценку](#изменить-оценку)
        * [Удалить оценку](#удалить-оценку)
    * [Обработка ошибок](#обработка-ошибок)
        * [Общее](#общее)
        * [Ошибки валидации тела запроса](#ошибки-валидации-тела-запроса)
* [Enumerations](#enumerations)
    * [Формы обучения](#формы-обучения)
    * [Формы отчетности](#формы-отчетности)

## Задание
База данных должна содержать данные о контингенте студентов (фамилия,
имя, отчество, год поступления, форма обучения
(дневная/вечерняя/заочная), номер или название группы); об учебном плане
(название специальности, дисциплина, семестр, количество отводимых на
дисциплину часов, форма отчетности (экзамен/зачет)); о журнале
успеваемости студентов (год/семестр, студент, дисциплина, оценка).
Разработать пакет, состоящий из процедур и функций, позволяющий:

Написать приложение, поддерживающее следующий функционал:

1\) для указанной формы обучения посчитать количество студентов этой
формы обучения;

2\) для указанной дисциплины получить количество часов и формы
отчетности по этой дисциплине;

3\) предоставить возможность добавления и изменения информации о
студентах, об учебных планах, о журнале успеваемости;

4\) предоставить возможность добавления и изменения информации о журнале
успеваемости.

Дополнительное задание 
1\) предоставить API поиска всех отметок по заданной дисциплине

2\) подготовить приложение для запуска в Docker 

3\) Добавить валидацию полей для POST/PUT запросов

4\) Добавить обработчик ошибок

[↑↑↑↑↑↑↑](#top)

## Запуск приложения
Для запуска требуется установленный Docker на машине.
В корне проекта запустить команду `docker-compose up -d`.

Для остановки  `docker-compose down`

Для сборки образа (при наличии уже собранного) `docker-compose build`

Дефолтный порт - 5000

[↑↑↑↑↑↑↑](#top)

## API
### Студенты
#### Добавить студента
POST /students/

<details>
  <summary>Request</summary> 

```json
{
   "name":"name",
   "surname":"surname",
   "patronymic":"patronymic",
   "entry_date":"2020-10-10",
   "education_form":"PART_TIME",
   "group_num":"6"
}
```

Валидация полей:
* `name` - обязательное, не пустое
* `surname` - обязательное, не пустое
* `patronymic` - обязательное, не пустое
* `entry_date` - обязательное, YYYY-MM-DD ISODate
* `education_form` - обязательное, одно из значений формы обучения
* `group_num` - обязательное, не пустое
</details>
<details>
  <summary>Response</summary>

```json
{
   "id":1,
   "name":"name",
   "surname":"surname",
   "patronymic":"patronymic",
   "entry_date":"2020-10-10 00:00:00",
   "education_form":"PART_TIME",
   "group_num":"6"
}
```
</details>

Пример запроса
```shell
curl -X POST localhost:5000/students/ -H "Content-Type: application/json" -d '{"name": "name", "surname": "surname", "patronymic": "patronymic", "entry_date": "2020-10-10", "education_form": "PART_TIME", "group_num": "6"}'
```

[↑↑↑↑↑↑↑](#top)

#### Получить список всех студентов
GET /students/

<details>
  <summary>Response</summary>

```json
[
   {
      "id":1,
      "name":"name",
      "surname":"surname",
      "patronymic":"patronymic",
      "entry_date":"2020-10-10 00:00:00",
      "education_form":"PART_TIME",
      "group_num":"6"
   },
   {
      "id":2,
      "name":"name2",
      "surname":"surname2",
      "patronymic":"patronymic",
      "entry_date":"2020-10-10 00:00:00",
      "education_form":"PART_TIME",
      "group_num":"6"
   },
   {
      "id":3,
      "name":"name",
      "surname":"surname",
      "patronymic":"patronymic",
      "entry_date":"2020-10-10 00:00:00",
      "education_form":"PART_TIME",
      "group_num":"6d"
   }
]
```
</details>

Пример запроса
```shell
curl -X GET localhost:5000/students/
```
[↑↑↑↑↑↑↑](#top)

#### Получить данные студента
GET /students/<student_id>

student_id - сгенерированный идентификатор студента

<details>
  <summary>Response</summary>

```json
{
  "id":1,
  "name":"name",
  "surname":"surname",
  "patronymic":"patronymic",
  "entry_date":"2020-10-10 00:00:00",
  "education_form":"PART_TIME",
  "group_num":"6"
}
```
</details>

Пример запроса
```shell
curl -X GET localhost:5000/students/1
```
[↑↑↑↑↑↑↑](#top)

#### Изменить данные студента
PUT /students/<student_id>

student_id - сгенерированный идентификатор студента

<details>
  <summary>Request</summary>

```json
{
   "name":"name",
   "surname":"surname",
   "patronymic":"patronymic",
   "entry_date":"2020-10-10",
   "education_form":"PART_TIME",
   "group_num":"6"
}
```

Валидация полей:
* `name` - обязательное, не пустое
* `surname` - обязательное, не пустое
* `patronymic` - обязательное, не пустое
* `entry_date` - обязательное, YYYY-MM-DD ISODate
* `education_form` - обязательное, одно из значений формы обучения
* `group_num` - обязательное, не пустое
</details>
<details>
  <summary>Response</summary>

```json
{
  "id":1,
  "name":"name",
  "surname":"surname",
  "patronymic":"patronymic",
  "entry_date":"2020-10-10 00:00:00",
  "education_form":"PART_TIME",
  "group_num":"6"
}
```
</details>

Пример запроса
```shell
curl -X PUT localhost:5000/students/1 -H "Content-Type: application/json" -d '{"name": "name", "surname": "surname", "patronymic": "patronymic", "entry_date": "2020-10-11", "education_form": "FULL_TIME", "group_num": "7"}'
```
[↑↑↑↑↑↑↑](#top)

#### Удалить студента
DELETE /students/<student_id>

student_id - сгенерированный идентификатор студента

Пример запроса
```shell
curl -X DELETE localhost:5000/students/4
```
#### Подсчитать количество студентов обучающихся на заданной форме обучения
GET /students/count?education_form=FULL_TIME

education_form - форма обучения (см [формы обучения](#формы-обучения))
<details>
  <summary>Response</summary>

```json
{
   "educational_form":"PART_TIME",
   "students_total":3
}
```
</details>

Пример запроса
```shell
curl -X GET localhost:5000/students/count?education_form=FULL_TIME
```

[↑↑↑↑↑↑↑](#top)

### Учебные планы
#### Добавить учебный план

POST /educational_plans/

<details>
  <summary>Request</summary>

```json
{
   "spec_name":"web-senior",
   "discipline":"web",
   "hours":40,
   "examination_form":"EXAM"
}
```

Валидация полей:
* `spec_name` - обязательное, не пустое
* `discipline` - обязательное, не пустое
* `hours` - обязательное, больше 1
* `examination_form` - обязательное, одно из значений формы отчетности
</details>
<details>
  <summary>Response</summary>

```json
{
   "id": 1,
   "spec_name":"web-senior",
   "discipline":"web",
   "hours":40,
   "examination_form":"EXAM"
}
```
</details>

Пример запроса
```shell
curl -X POST localhost:5000/educational_plans/ -H "Content-Type: application/json" -d '{"spec_name": "web-senior", "discipline": "web", "hours": 40, "examination_form": "EXAM"}'
```

[↑↑↑↑↑↑↑](#top)

#### Получить список всех учебных планов
GET /educational_plans/

<details>
  <summary>Response</summary>

```json
[
   {
      "id":1,
      "spec_name":"web-senior",
      "discipline":"web",
      "hours":40,
      "examination_form":"EXAM"
   },
   {
      "id":2,
      "spec_name":"web-senior",
      "discipline":"web",
      "hours":40,
      "examination_form":"EXAM"
   }
]
``` 
</details>

Пример запроса
```shell
curl localhost:5000/educational_plans/
```

[↑↑↑↑↑↑↑](#top)

#### Получить данные по учебному плану

GET /educational_plans/<educational_plan_id>

educational_plan_id - сгенерированный идентификатор учебного плана

<details>
  <summary>Response</summary>

```json
{
      "id":1,
      "spec_name":"web-senior",
      "discipline":"web",
      "hours":40,
      "examination_form":"EXAM"
}
```
</details>

Пример запроса
```shell
curl localhost:5000/educational_plans/1
```

[↑↑↑↑↑↑↑](#top)

#### Изменить данные учебного плана

PUT /educational_plans/<educational_plan_id>

educational_plan_id - сгенерированный идентификатор учебного плана

<details>
  <summary>Request</summary>

```json
{
   "spec_name":"web-senior",
   "discipline":"web",
   "hours":40,
   "examination_form":"EXAM"
}
```

Валидация полей:
* `spec_name` - обязательное, не пустое
* `discipline` - обязательное, не пустое
* `hours` - обязательное, больше 1
* `examination_form` - обязательное, одно из значений формы отчетности
</details>
<details>
  <summary>Response</summary>

```json
{
   "id": 1,
   "spec_name":"web-senior",
   "discipline":"web",
   "hours":40,
   "examination_form":"EXAM"
}
```
</details>

Пример запроса
```shell
curl -X PUT localhost:5000/educational_plans/1 -H "Content-Type: application/json" -d '{"spec_name": "web-senior-1", "discipline": "webx", "hours": 45, "examination_form": "TEST"}'
```

[↑↑↑↑↑↑↑](#top)

#### Удалить учебный план
DELETE /educational_plans/<educational_plan_id>

educational_plan_id - сгенерированный идентификатор учебного плана

Пример запроса
```shell
curl -X DELETE localhost:5000/educational_plans/1
```
#### Получить оценки всех студентов за все года по учебному плану
GET /educational_plans/<educational_plan_id>/gradebook

educational_plan_id - сгенерированный идентификатор учебного плана

<details>
  <summary>Response</summary>

```json
{
   "discipline":"web",
   "gradebooks":[
      {
         "year":2021,
         "students_marks":[
            {
               "surname":"surname2",
               "mark":6
            }
         ]
      },
      {
         "year":2020,
         "students_marks":[
            {
               "surname":"surname2",
               "mark":6
            },
            {
               "surname":"surname",
               "mark":5
            }
         ]
      },
      {
         "year":2023,
         "students_marks":[
            {
               "surname":"surname2",
               "mark":5
            },
            {
               "surname":"surname",
               "mark":5
            }
         ]
      }
   ]
}
```
</details>

Пример запроса
```shell
curl localhost:5000/educational_plans/1/gradebooks
```

[↑↑↑↑↑↑↑](#top)
### Журнал успеваемости
#### Добавить оценку
POST /gradebooks/

<details>
    <summary>Request</summary>

```json
{
   "student_id":8,
   "educational_plan_id":2,
   "year":2020,
   "mark":5
}
```

Валидация полей:
* `student_id` - обязательное, больше 0
* `educational_plan_id` - обязательное,  больше 0
* `year` - обязательное, больше 2000
* `mark` - обязательное, от 0 до 5
</details>
<details>
    <summary>Response</summary>

```json
{
   "student_id":8,
   "educational_plan_id":2,
   "year":2020,
   "mark":5
}
```
</details>

Пример запроса
```shell
curl -X POST localhost:5000/gradebooks/ -H "Content-Type: application/json" -d '{"student_id": 8, "educational_plan_id": 2, "year":2020, "mark":5}'
```

[↑↑↑↑↑↑↑](#top)

#### Изменить оценку
PUT /gradebooks/

<details>
    <summary>Request</summary>

```json
{
   "student_id":8,
   "educational_plan_id":2,
   "year":2020,
   "mark":5
}
```

Валидация полей:
* `student_id` - обязательное, больше 0
* `educational_plan_id` - обязательное,  больше 0
* `year` - обязательное, больше 2000
* `mark` - обязательное, от 0 до 5
</details>
<details>
    <summary>Response</summary>

```json
{
   "student_id":8,
   "educational_plan_id":2,
   "year":2020,
   "mark":5
}
```
</details>

Пример запроса
```shell
curl -X PUT localhost:5000/gradebooks/ -H "Content-Type: application/json" -d '{"student_id": 8, "educational_plan_id": 2, "year":2020, "mark":4}'
```

[↑↑↑↑↑↑↑](#top)

#### Удалить оценку
DELETE /gradebooks/

<details>
    <summary>Request</summary>

```json
{
   "student_id":8,
   "educational_plan_id":2
}
```
</details>
<details>
    <summary>Response</summary>

```json
{
   "student_id":8,
   "educational_plan_id":2
}
```
</details>

Пример запроса
```shell
curl -X DELETE localhost:5000/gradebooks/ -H "Content-Type: application/json" -d '{"student_id": 8, "educational_plan_id": 2}'
```

[↑↑↑↑↑↑↑](#top)

### Обработка ошибок
#### Общее
<details>
    <summary>Response</summary>
```json
[
   {
      "message":"message"
   }
]
```
</details>

#### Ошибки валидации тела запроса
<details>
    <summary>Response</summary>
```json
[
   {
      "field":"hours",
      "message":"Must be at least 1."
   },
   {
      "field":"examination_form",
      "message":"Not a valid choice."
   },
   {
      "field":"discipline",
      "message":"Can not be blank"
   },
   {
      "field":"spec_name",
      "message":"Can not be blank"
   }
]
```
</details>

[↑↑↑↑↑↑↑](#top)

## Enumerations
### Формы обучения
Формы обучения задаются перечислением EducationalForm('FULL_TIME', 'EVENING', 'PART_TIME')
### Формы отчетности
Формы отчетности задаются перечислением ExaminationForm('EXAM', 'TEST')
[↑↑↑↑↑↑↑](#top)
