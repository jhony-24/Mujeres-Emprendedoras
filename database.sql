drop database if exists brunellaEvents;
create database brunellaEvents;
use brunellaEvents;

create table `user`(
   id int auto_increment primary key,
   `name` varchar(50) not null,
   `password` varchar(50) not null  
) engine = InnoDB;

insert `user`(`name`,`password`) values("brunella","brunella");


create table events(
   id_event int auto_increment primary key,
   date_create datetime default now(),
   path_image varchar(500) not null,
   title_publication varchar(300) not null,
   text_publication varchar(2000) not null
) events = InnoDB;


delimiter //
create procedure InsertEvent(pathImage varchar(500),title varchar(300), textP varchar(2000))
begin
	insert events(path_image,title_publication,text_publication) values(pathImage,title,textP);
end//
delimiter ;

call InsertEvent("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Publicacion de Prueba","Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
call InsertEvent("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Publicacion de Prueba","Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
call InsertEvent("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Publicacion de Prueba","Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
call InsertEvent("https://cdn.pixabay.com/photo/2020/01/04/23/37/landscape-4742004_960_720.jpg","Publicacion de Prueba","Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis quibusdam placeat aperiam ipsa dicta saepe asperiores dolor alias quo modi, reprehenderit repudiandae eaque iste dolorum illum adipisci eligendi natus.");
