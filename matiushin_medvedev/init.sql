create database education;
create user education with encrypted password 'password';
grant all privileges on database education to education;
\c education

create type education_form as enum ('FULL-TIME', 'EVENING', 'PART-TIME');
create type examination_form as enum('EXAM', 'TEST');

create table if not exists student
(
    id             serial primary key,
    name           character varying(255),
    surname        character varying(255),
    patronymic     character varying(255),
    entry_date     timestamp without time zone,
    education_form education_form,
    group_num      character varying(255),
    constraint student_group_constraint unique (name, surname, patronymic, group_num)
);

create table if not exists educational_plan
(
    id serial        primary key,
    spec_name        character varying(255),
    discipline       character varying(255),
    hours            integer,
    examination_form examination_form
);

create table if not exists gradebook
(
    id                   serial primary key,
    student_id           integer,
    educational_plan_id  integer,
    year                 integer,
    mark                 integer,
    constraint student_year_plan_constraint unique (student_id, educational_plan_id, year)
)
