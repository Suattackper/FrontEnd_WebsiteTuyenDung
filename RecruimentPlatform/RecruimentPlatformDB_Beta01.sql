create database job_seeker;

use job_seeker;

create table authentication_role (
role_id int identity(1,1) not null primary key,
role_name varchar(50) not null
);

insert into authentication_role
values ('Admin'),
	   ('Recruiter'),
	   ('Candidate');

create table authentication_permission (
permission_id int identity(1,1) not null primary key,
permission_descri varchar(50) not null,
);


create table authentication_granted_permissions (
id int identity(1,1) not null primary key,
role_id int not null,
permission_id int not null
);

alter table authentication_granted_permissions add constraint role_id_fk 
			foreign key (role_id) references authentication_role (role_id);
alter table authentication_granted_permissions add constraint permission_id_fk 
			foreign key (permission_id) references authentication_permission (permission_id);


-- Luu cac trang thai
create table job_seeker_status_code (
id varchar(15) not null primary key,
code_value varchar(100) not null,
);

insert into job_seeker_status_code
values ('SC1','Active'), -- Da kich hoat
('SC2','Inactive'), -- Chua duoc kich hoat
('SC3', 'Draft'), -- Ban Nhap
('SC4', 'Published'), -- Cong Khai
('SC5', 'Approved'), -- Duyet
('SC6','Rejected'), -- Tu Choi
('SC7', 'Pending Approval'),
('SC8', 'Email Not Validated'), -- Dang cho phe duyet
('SC9', 'Email Validated');


-- Luu thong tin dang nhap bang tai khoan chung cua he thong 
create table job_seeker_user_login_data (
id uniqueidentifier default newsequentialid() not null primary key,
full_name nvarchar(100) not null,
email varchar(100) not null unique,
password varchar(512) not null,
role_id int not null,  -- fk
email_verified bit default 0 not null,
status_code varchar(15) not null, -- fk
last_active_time datetime,
is_active bit default 0,
is_created_at datetime default getdate() not null,
is_updated_at datetime default getdate(),
);

alter table job_seeker_user_login_data add constraint user_login_data_role_id_fk foreign key 
		(role_id) references authentication_role (role_id);

alter table job_seeker_user_login_data add constraint user_login_data_status_code_fk 
			foreign key (status_code) references job_seeker_status_code (id);



-- Thong tin nguoi dung khi dang nhap tk bang facebook, gg...
create table job_seeker_user_login_data_external (
id uniqueidentifier default newsequentialid() not null primary key,
provider_name varchar(100) not null,
external_provider_token varchar(500) not null,
ws_endpoint varchar(500), -- api endpoint cua NCC
extra_data varchar(max) not null,
is_created_at datetime default getdate() not null,
is_updated_at datetime default getdate(),
);

alter table job_seeker_user_login_data_external
add user_login_data_id uniqueidentifier not null;
alter table job_seeker_user_login_data_external add constraint user_login_data_external_fk foreign key (user_login_data_id) references job_seeker_user_login_data (id);


-- Thong tin ca nhan cua ung vien 
create table job_seeker_candidate_profile (
candidate_id uniqueidentifier default newsequentialid() not null primary key,
dob date not null, -- ngay sing
gender nvarchar(10) check (gender in ('Nam', 'Nữ', 'Khác')), -- gioi tinh
phone_numb varchar(20), -- sdt
avartar_url varchar(500), -- anh dai dien
cv_url varchar(max), -- cv
slug varchar(200) not null,
facbook_link varchar(max),
linkedin_link varchar(max),
github_url varchar(max),
twitter_url varchar(max),
portfolio_url varchar(max),
province nvarchar(200) not null,
district nvarchar(200),
is_allowed_public bit default 0 not null,
is_created_at datetime default getdate() not null,
is_updated_at datetime default getdate(),
is_deleted_at datetime,
);

alter table job_seeker_candidate_profile add constraint candidate_id_fk foreign key (candidate_id)
											references job_seeker_user_login_data (id);


-- Luu chi tiet thong tin hoc van
create table job_seeker_education_detail (
education_id uniqueidentifier default newsequentialid() not null primary key,
school_name nvarchar(200) not null, -- ten truong
major nvarchar(100) not null, -- chuyen nganh
degree nvarchar(100) check (degree in ('Cử Nhân','Thạc Sĩ','Tiến Sĩ', 'Kỹ Sư')) not null,
description nvarchar(200), -- mo ta
start_date date not null, -- ngay nhap hoc 
end_date date not null, -- nagy tot nghiep 
candidate_id uniqueidentifier not null, -- fk candidate
is_created_at datetime default getdate() not null,
is_updated_at datetime default getdate(),
is_deleted_at datetime,
);

alter table job_seeker_education_detail add constraint education_detail_candidate_id_fk 
			foreign key (candidate_id) references job_seeker_candidate_profile (candidate_id );


-- Luu chi tiet thong tin kinh nghiem lam viec
create table job_seeker_working_experience (
working_exp_id uniqueidentifier default newsequentialid() not null primary key,
job_title nvarchar(200) not null,
company_name nvarchar(200) not null,
description nvarchar(200),
start_date date not null,
end_date date not null,
candidate_id uniqueidentifier not null, -- fk candidate
is_created_at datetime default getdate() not null,
is_updated_at datetime default getdate(),
is_deleted_at datetime,
);

alter table job_seeker_working_experience add constraint working_exp_candidate_id_fk 
			foreign key (candidate_id) references job_seeker_candidate_profile (candidate_id );


-- Luu thong tin chung chi
create table job_seeker_certificate (
certificate_id uniqueidentifier default newsequentialid() not null primary key,
certificate_name nvarchar(200) not null,
organization nvarchar(200) not null,
certificate_link varchar(max) not null,
description nvarchar(200),
candidate_id uniqueidentifier not null, -- fk candidate
is_created_at datetime default getdate() not null,
is_updated_at datetime default getdate(),
is_deleted_at datetime,
);

alter table job_seeker_certificate add constraint certificate_candidate_id_fk 
			foreign key (candidate_id) references job_seeker_candidate_profile (candidate_id );


-- Thong tin ho so tai khoan cua nha tuyen dung
create table job_seeker_recruiter_profile (
recruiter_id uniqueidentifier default newsequentialid() not null primary key ,
gender nvarchar(10) not null,
phone_numb varchar(20) not null,
avatar_link varchar(500),
linkedin_url varchar(500),
enterprise_id uniqueidentifier not null, -- fk
is_created_at datetime default getdate() not null,
is_updated_at datetime default getdate(),
);

alter table job_seeker_recruiter_profile add constraint recruiter_id_fk foreign key (recruiter_id)
											references job_seeker_user_login_data (id);

alter table job_seeker_recruiter_profile add constraint enterprise_id_fk 
			foreign key (enterprise_id) references job_seeker_enterprise (enterprise_id);


-- Thong tin cong ty
create table job_seeker_enterprise (
enterprise_id uniqueidentifier default newsequentialid() not null primary key,
full_company_name nvarchar(500) not null, -- ten cong ty
logo_url varchar(500) not null, -- anh logo
company_email varchar(50) not null, -- email
company_phone_contact varchar(20) not null, -- sdt
cover_img_url varchar(500), -- anh nen
slug_img varchar(500),
facebook_url varchar(500),
linkedin_url varchar(500),
website_url varchar(500),
tax_code varchar(50) not null, -- ma so thue
founded_date date not null, -- ngay thanh lap
enterprise_size varchar(100) not null, -- quy mo cong ty
job_field_id int not null, --fk linh vuc cong ty
address nvarchar(200),
province nvarchar(100), -- tinh/thanh pho
district nvarchar(100), -- quan/ huyen
ward nvarchar(100), -- phuong
descriptions nvarchar(max),
is_created_at datetime default getdate() not null,
is_updated_at datetime default getdate(),
);

alter table job_seeker_enterprise add constraint job_field_id_fk 
			foreign key (job_field_id) references job_seeker_job_field (job_field_id);

-- Thong tin linh vuc kinh doanh : 
create table job_seeker_job_field (
job_field_id int identity(1,1) not null primary key,
job_field_name nvarchar(200),
);

-- Cap bac cong viec 
create table job_seeker_job_level (
id int identity(1,1) not null primary key,
job_level_name nvarchar(100) not null,
);

insert into job_seeker_job_level
values ('Thực tập sinh'),
	  ('Nhân viên'),
	  ('Trưởng phòng'),
	  ('Phó phòng'),
	  ('Quản lý/ Giám sát'),
	  ('Quản lý chi nhánh'),
	  ('Giám đốc'),
	  ('Phó giám đốc'),
	  ('Trưởng nhóm');

-- Nganh nghe
create table job_seeker_job_category (
id int identity(1,1) not null primary key,
job_category_name nvarchar(200) not null,
app_icon_name varchar(200),
is_created_at datetime default getdate() not null,
is_updated_at datetime default getdate() not null
);

-- Thong tin cong viec
create table job_seeker_job_posting (
id uniqueidentifier default newsequentialid() not null primary key,
job_title nvarchar(200) not null, -- ten cv
job_desc nvarchar(max) not null, -- mo ta cv
job_requirement nvarchar(max) not null, -- y/c cv
benefit_enjoyed nvarchar(max) not null, -- quyen loi
quantity int not null, -- so luong
salary_min int not null, -- toi thieu
salary_max int not null, -- toi da
exp_requirement nvarchar(100) not null, -- y/c kinh nghiem
job_level_code int not null, -- fk -- vi tri, chuc vu
working_type nvarchar(50) not null, -- hinh thuc lam viec
gender_require nvarchar(50) check (gender_require in ('Nam', 'Nữ', 'Không yêu cầu')) not null,
academic_level nvarchar(100) check (academic_level in ('Đại Học', 'Cao Đẳng', 'Trung Cấp', 'THPT')) not null,
address nvarchar(100) not null, -- dia chi
province nvarchar(100) not null, -- tp
district nvarchar(100) not null, -- quan
ward nvarchar(100) not null, -- phuong
time_post datetime default getdate() not null, -- tg dang
expired_time datetime not null, -- het han
is_urgent bit default 0, -- gap
is_hot bit default 0, -- nong
status_code varchar(15) not null, --fk
enterprise_id uniqueidentifier not null, -- fk
job_category_id int not null, -- fk
is_created_at datetime default getdate() not null,
is_updated_at datetime default getdate(),
is_deleted_at datetime,
);

alter table job_seeker_job_posting add constraint job_posting_job_level_code_fk 
			foreign key (job_level_code) references job_seeker_job_level (id);

alter table job_seeker_job_posting add constraint job_posting_job_category_id_fk 
			foreign key (job_category_id) references job_seeker_job_category (id);

alter table job_seeker_job_posting add constraint job_posting_status_code_fk 
			foreign key (status_code) references job_seeker_status_code (id);

alter table job_seeker_job_posting add constraint job_posting_enterprise_id_fk 
			foreign key (enterprise_id) references job_seeker_enterprise (enterprise_id);


-- Bang trung gian cua bang applicant_profile vaf job_posting
create table job_seeker_job_posting_apply (
id int identity(1, 1) not null primary key,
job_posting_id uniqueidentifier not null, -- fk
candidate_id uniqueidentifier not null, -- fk
apply_time datetime default getdate() not null,
status_code varchar(15) not null, -- fk
);

alter table job_seeker_job_posting_apply add constraint job_posting_id_fk 
			foreign key (job_posting_id) references job_seeker_job_posting (id);

alter table job_seeker_job_posting_apply add constraint job_apply_candidate_id_fk 
			foreign key (candidate_id) references job_seeker_candidate_profile (candidate_id);

alter table job_seeker_job_posting_apply add constraint job_apply_status_code_fk 
			foreign key (status_code) references job_seeker_status_code (id);


-- tinh/ thanh pho
create table job_seeker_province (
code varchar(20) not null primary key,
province_name nvarchar(200) not null,
);

-- quan
create table job_seeker_district (
code varchar(20) not null primary key,
district_name nvarchar(200) not null,
province_code varchar(20) not null,
);

-- phuong
create table job_seeker_ward (
code varchar(20) not null primary key,
ward_name nvarchar(200) not null,
district_code varchar(20) not null,
);

alter table job_seeker_district add constraint province_code_fk 
    foreign key (province_code) references job_seeker_province (code);

alter table job_seeker_ward add constraint district_code_fk 
    foreign key (district_code) references job_seeker_district(code);



-- Cac loai thong bao
create table job_seeker_notification_type (
id varchar(50) not null primary key,
type_name nvarchar(100) not null,
description nvarchar(200) not null,
);


-- Luu cac thong tin cac loai thong bao
create table job_seeker_notification (
id varchar(50) not null primary key,
notify_type_id varchar(50) not null, -- fk
user_login_data_id uniqueidentifier not null, -- fk: bang user
job_id uniqueidentifier not null, -- fk: job_posting
is_created_at datetime default getdate() not null,
is_sent bit default 0 not null,
is_seen bit default 0 not null,
is_deleted bit default 0,
);

alter table job_seeker_notification add constraint job_posting_notify_id_fk 
			foreign key (job_id) references job_seeker_job_posting (id);

alter table job_seeker_notification add constraint user_login_data_id_fk 
			foreign key (user_login_data_id) references job_seeker_user_login_data (id);

alter table job_seeker_notification add constraint notify_type_id_fk 
			foreign key (notify_type_id) references job_seeker_notification_type (id);


-- Dung de luu thong tin bai dang tin tuyen dung ma ung vien bookmark
create table job_seeker_saved_job_posting (
id int identity(1,1) primary key,
candidate_id uniqueidentifier not null, -- fk: bang candidate_id
job_posting_id uniqueidentifier not null,
saved_at datetime default getdate() not null,
deleted_at datetime,
);

alter table job_seeker_saved_job_posting add constraint saved_job_candidate_id_fk 
			foreign key (candidate_id) references job_seeker_candidate_profile (candidate_id);

alter table job_seeker_saved_job_posting add constraint saved_job_posting_id_fk 
			foreign key (job_posting_id) references job_seeker_job_posting (id);



-- Dung de nha tuyen dung luu lai ho so ung vien de xem sau
create table job_seeker_applicant_profile_saved (
id int identity(1,1) not null primary key,
candidate_id uniqueidentifier not null,
enterprise_id uniqueidentifier not null,
is_created_at datetime default getdate() not null,
is_updated_at datetime default getdate() not null,
is_deleted_at datetime
);

alter table job_seeker_applicant_profile_saved add constraint profile_saved_candidate_id_fk 
			foreign key (candidate_id) references job_seeker_candidate_profile (candidate_id);
    
alter table job_seeker_applicant_profile_saved add constraint profile_saved_enterprise_id_fk 
			foreign key (enterprise_id) references job_seeker_enterprise (enterprise_id);
