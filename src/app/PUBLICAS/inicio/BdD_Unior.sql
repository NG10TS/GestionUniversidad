CREATE DATABASE BDD_UNIOR;

create table tb_materia(
id_materia int auto_increment,
codigo_mat varchar(30),
nombre_mat varchar(50),
primary key(id_materia)
);


CREATE TABLE tb_prerequisito
(
  id_prerq  int auto_increment,
  id_materia_p int,
  id_materia_r int,
  primary key(id_prerq),
  foreign key (id_materia_p) references tb_materia(id_materia),
  foreign key (id_materia_r) references tb_materia(id_materia)
  
);

CREATE TABLE tb_semestre
(
id_sem int auto_increment,
numero int(10),
id_materia int,
 primary key(id_sem),
 foreign key(id_materia) references tb_materia(id_materia)
);

CREATE TABLE tb_carrera
(
    id_carre int auto_increment,
    des_carre varchar(255),
    habi_carre varchar(15),
    sigla_carre varchar(10),
    imp_carre varchar(15),
    resquisito_carre varchar(50),
    fec_carre date,
    primary key(id_carre)
);

CREATE TABLE tb_becas
(
id_beca int auto_increment,
sigla_beca varchar(10),
nombre_beca varchar(50),
habi_beca varchar(30),
primary key(id_beca)
);

CREATE TABLE tb_facultad
(
    id_facu int auto_increment,
    desc_facu varchar(100),
    habi_facu varchar(15),
    ubica_facu varchar(255),
    primary key(id_facu)
);
CREATE TABLE tb_facu_carre
(
    id_facu int,
    id_carre int,
    habi_fac_carre varchar(15),
    foreign key(id_facu) references tb_facultad(id_facu),
    foreign key(id_carre) references tb_carrera(id_carre) 
);

CREATE TABLE tb_turno
(
    id_turno int auto_increment,
    desc_turno varchar(50),
    primary key(id_turno)
);

CREATE TABLE tb_planE
(
    id_planE int auto_increment,
    cod_gestE int(10),
    id_carre int,
    id_sem int,
    primary key (id_planE),
    foreign key(id_carre) references tb_carrera(id_carre),
    foreign key (id_sem) references tb_semestre(id_sem)
);

CREATE TABLE tb_planR
(
    id_planR int(11) auto_increment,
    cod_gestR int(10),
    id_carre int,
    id_sem int,
    primary key (id_planR),
    foreign key(id_carre) references tb_carrera(id_carre),
    foreign key (id_sem) references tb_semestre(id_sem)
);

CREATE TABLE tb_estudiante
(
    id_est int(11) auto_increment,
    nombre_est varchar(100), 
    ape_p_est varchar(100),
    ape_m_est varchar(100), 
    ci_est int(15),
    fec_nac_est date,
    dir_est varchar(50),
    tel_dom_est int(10),
    cel_est int(15),
    email_est varchar(50),
    tur_des_est varchar(10),
    fec_regis_est date,

    padre_est varchar(100),
    madre_est varchar(100),
    nombr_trab_padre_est varchar(100),
    tel_trab_padre_est int(15),
    dir_trab_padre_est int(15),

    colegio_est varchar(100),
    sexo_est varchar(15),
    numsol_est int(10),
    insc_est varchar(10),

    dom_est varchar(50),
    tel_dom_est int(10),
    trab_dir_est varchar(50),
    trab_fono_est int(15),
    trab_nombre_est varchar(50),

    fec_bachi_est date(50),
    tipo_cole_est varchar(15),
    pais_cod_est int(11),
    
    fact_doc_tipo_est varchar(30),
    fact_doc_numero_est int(15),
    fact_nombre_est varchar(50),
    fec_tranf_est date,
    foto_est varchar(255),
    fec_emitb_est date,
    sede_emit_est varchar(50),
    
    primary key (id_est)
    
);



CREATE TABLE tb_docente
(
    id int(11) unsigned not null auto_increment,
    nombre_doc varchar(100),
    ape_p_doc varchar(100),
    ape_m_doc varchar(100),
    cod_doc int(10),
    ci int(15),
    expedido varchar(5),
    grado varchar(100),
    fec_nac_doc date,
    tel_dom_doc int(10),
    cel_doc int(15),
    lug_doc varchar(50),
    email_doc varchar(50),
    dom_doc varchar(50),
    estado_civ_doc varchar(15),
    nacional_doc varchar(20),
    dir_trab_doc varchar(40),
    tel_trab_doc int(10),
    obser_doc varchar(60),
    foto_doc varchar(255),
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL
    primary key (id)
);

CREATE TABLE tb_designacion
(
    id_desig int(11) auto_increment,
    id_carre int,
    id_materia int, 
    id_doc int,
    id_sem int,
    fec_inicio date,
    fec_fin date,
    primary key(id_desig),
    foreign key(id_carre) references tb_carrera(id_carre),
    foreign key(id_materia) references tb_materia(id_materia),
    foreign key(id_doc) references tb_docente(id_doc),
    foreign key(id_sem) references tb_semestre(id_sem)
);