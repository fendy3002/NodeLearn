create table time_data(
    code varchar(10) not null,
    utc_created datetime,

    primary key(`code`)
);
insert into time_data(
    code, utc_created
)
values (
    'default', '2018-02-01 03:02:01'
);