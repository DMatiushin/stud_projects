create type education_form as enum ('FULL_TIME', 'EVENING', 'PART_TIME');
create type examination_form as enum ('EXAM', 'TEST');

create table if not exists student
(
    id             serial primary key,
    name           character varying(255),
    surname        character varying(255),
    patronymic     character varying(255),
    entry_date     date,
    education_form education_form,
    group_num      character varying(255),
    constraint student_group_constraint unique (name, surname, patronymic, group_num)
);

create table if not exists educational_plan
(
    id               serial primary key,
    spec_name        character varying(255),
    discipline       character varying(255),
    hours            integer,
    examination_form examination_form,
    constraint spec_disc_exam_constraint unique (spec_name, discipline, examination_form)
);

create table if not exists gradebook
(
    id                  serial primary key,
    student_id          integer,
    educational_plan_id integer,
    year                integer,
    mark                integer,
    constraint student_year_plan_constraint unique (student_id, educational_plan_id, year)
);

INSERT INTO student (name, surname, patronymic, entry_date, education_form, group_num)
VALUES ('Дмитрий', 'Матюшин', 'Сергеевич', '2020-10-10', 'FULL_TIME', '194-342');
INSERT INTO student (name, surname, patronymic, entry_date, education_form, group_num)
VALUES ('Никита', 'Медведев', 'Валерьевич', '2020-10-10', 'FULL_TIME', '194-342');
INSERT INTO educational_plan (spec_name, discipline, hours, examination_form)
VALUES ('Информационная безопасность', 'Разработка защищенных веб-приложений', 40, 'EXAM')



