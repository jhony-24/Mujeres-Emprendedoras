drop database if exists brunellaEvents;
create database brunellaEvents;
use brunellaEvents;

create table `user`(
   id int auto_increment primary key,
   `name` varchar(50) not null,
   `password` varchar(50) not null  
) engine = InnoDB;

insert `user`(`name`,`password`) values("brunella","brunella");

create table photo(
   id_photo int auto_increment primary key,
   path_image varchar(500) not null
) engine = InnoDB;

insert photo(path_image) values("view/assets/image/b_a.jpg"),
                           ("view/assets/image/b_b.jpg"),("view/assets/image/b_c.jpg"),
                           ("view/assets/image/b_d.jpg"),("view/assets/image/b_e.jpg"),
                           ("view/assets/image/b_f.jpg"),("view/assets/image/b_g.jpg"),
                           ("view/assets/image/b_h.jpg"),("view/assets/image/b_i.jpg"),
                           ("view/assets/image/b_n.jpg"),("view/assets/image/b_m.jpg"),
                           ("view/assets/image/b_l.jpg");

create table events(
   id_event int auto_increment primary key,
   date_create datetime default now(),
   path_image varchar(500) not null,
   title_event varchar(300) not null,
   text_event varchar(2000) not null
) engine = InnoDB;

select * from photo;

delimiter //
create procedure InsertEvent(pathImage varchar(500),title varchar(300), textE varchar(2000))
begin
	insert events(path_image,title_event,text_event) values(pathImage,title,textE);
end//
delimiter ;

call InsertEvent("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Evento a","Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
call InsertEvent("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Evento b","Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
call InsertEvent("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Evento c","Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
call InsertEvent("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Evento d","Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
