CREATE DATABASE bdd_unior;

create table tb_materias
(
  id_materia int unsigned not null auto_increment primary key,
  codigo_mat varchar(30),
  nombre_mat varchar(50),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);


CREATE TABLE tb_prerequisitos
(
  id_prerq  int unsigned not null auto_increment primary key,
  id_materia_p int,
  id_materia_r int,

  foreign key (id_materia_p) references tb_materias(id_materia_p),
  foreign key (id_materia_r) references tb_materias(id_materia_r),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_semestres
(
  id_sem int unsigned not null auto_increment primary key,
  numero int(10),
  id_materia int,
  foreign key(id_materia) references tb_materias(id_materia),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_carreras
(
    id_carre int unsigned not null auto_increment primary key,
    nombre_carre varchar(255),
    sigla_carre varchar(10),
    habi_carre varchar(15),
    fec_carre date,
    imp_carre varchar(15),
    res_carre varchar(50),
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_becas
(
id_beca int unsigned not null auto_increment primary key,
sigla_beca varchar(10),
nombre_beca varchar(50),
habi_beca varchar(30),
created_at timestamp NULL DEFAULT NULL,
updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_facultades
(
    id_facu int unsigned not null auto_increment primary key,
    desc_facu varchar(100),
    habi_facu varchar(15),
    ubica_facu varchar(255),
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL
);
CREATE TABLE tb_facu_carreras
(
    id_facu int unsigned not null auto_increment primary key,
    habi_fac_carre varchar(15),
    id_carre int,
    foreign key(id_facu) references tb_facultades(id_facu),
    foreign key(id_carre) references tb_carreras(id_carre),
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_turnos
(
    id_turno int unsigned not null auto_increment primary key,
    turno varchar(50),
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_planE
(
    id_planE int unsigned not null auto_increment primary key,
    cod_gestE int(10),
    id_carre int,
    id_sem int,
    foreign key(id_carre) references tb_carreras(id_carre),
    foreign key (id_sem) references tb_semestres(id_sem),
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_planR
(
    id_planR int(11) unsigned not null auto_increment primary key,
    cod_gestR int(10),
    id_carre int,
    id_sem int,

    foreign key(id_carre) references tb_carreras(id_carre),
    foreign key (id_sem) references tb_semestres(id_sem),
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_estudiantes
(
    id_est int unsigned not null auto_increment primary key,
    nombre_est varchar(100),
    ape_p_est varchar(100),
    ape_m_est varchar(100),
    ci_est int(15),
    fec_nac_est date,
    sexo_est varchar(15),
    dir_est varchar(50),
    tel_dom_est int(10),
    cel_est int(15),
    email_est varchar(50),

    tur_des_est varchar(10),
    numsol_est int(10),
    insc_est varchar(10),
    dom_est varchar(50),
    trab_dir_est varchar(50),
    trab_fono_est int(15),
    trab_nombre_est varchar(50),

    cole_est varchar(100),
    dato_bachi_est date,
    tipo_cole_est varchar(15),
    pais_cod_est int(11),
    fec_regis_est date,
    fec_emitb_est date,
    sede_emit_est varchar(50),
    fec_tranf_est date,
    padre_del_est varchar(100),
    madre_del_est varchar(100),

    nombre_trab_padre_est varchar(100),
    tel_trab_padre_est int(15),
    dir_trab_padre_est int(15),
    fact_doc_tipo_est varchar(30),
    fact_doc_numero_est int(15),
    fact_nombre_est varchar(50),

    foto_est varchar(255),
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL
);
-- modificacion en la tabla docente
CREATE TABLE tb_docentes
(
    id int unsigned not null auto_increment primary key,
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

);

CREATE TABLE tb_designaciones
(
    id_desig int unsigned not null auto_increment primary key,
    id_carre int,
    id_materia int,
    id_doc int,
    id_sem int,
    fec_inicio date,
    fec_fin date,

    foreign key(id_carre) references tb_carreras(id_carre),
    foreign key(id_materia) references tb_materias(id_materia),
    foreign key(id_doc) references tb_docentes(id_doc),
    foreign key(id_sem) references tb_semestres(id_sem),
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL
);
CREATE TABLE tb_plan_ins
(
  id_plan_ins int unsigned not null auto_increment primary key,
  nombre_plan varchar(100),
  plan_vigente varchar(10),
  plan_bs varchar(15),
  arr_2011 varchar(15),
  arr_2012 varchar(15),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);
CREATE TABLE tb_inscripciones
(
  id_ins int unsigned not null auto_increment primary key,
  ins_periodo int(10),
  ins_gestion int(10),
  turno_ins varchar(15),
  habi_ins varchar(10),
  obs_ins varchar(255),
  nivel varchar(50),
  convenio varchar(50),
  antiguo_ins int(10),
  tipo_de_pago varchar(255),
  terminal_ins varchar(100),
  id_est int,
  id_carre int,
  id_plan_ins int,
  fec_ins date,

  foreign key(id_carre) references tb_carreras(id_carre),
  foreign key(id_est) references tb_estudiantes(id_est),
  foreign key(id_plan_ins) references tb_plan_ins(id_plan_ins),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);
CREATE TABLE tb_deudas
(
  id_deuda int unsigned not null auto_increment primary key,
  monto float,
  monto_pagado float,
  monto_vigente float,
  nivel int(10),
  fec_vencimiento date,
  periodo int(10),
  gestion int(10),
  indice int(15),
  fec_trans date,
  moneda varchar(30),
  terminal varchar(30),
  id_est int,
  id_carre int,

  foreign key(id_est) references tb_estudiantes(id_est),
  foreign key(id_carre) references tb_carreras(id_carre),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_ins_becas
(
  id_ins_beca int unsigned not null auto_increment primary key,
  id_beca int,
  id_ins int,

  foreign key(id_beca) references tb_becas(id_beca),
  foreign key(id_ins) references tb_inscripciones(id_ins),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);


CREATE TABLE tb_plan_deudas
(
  id_plandeuda int unsigned not null auto_increment primary key,
  id_deuda int,
  id_plan_ins int,

  foreign key(id_deuda) references tb_deudas(id_deuda),
  foreign key(id_plan_ins) references tb_plan_ins(id_plan_ins),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

-- -----------------------------------------------------------------------------





--Cronograma de materias
--
--
--

CREATE TABLE tb_modalidades
(
id_modal int unsigned not null auto_increment primary key,
nombre_modal varchar(50),
created_at timestamp NULL DEFAULT NULL,
updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_evaluaciones
(
  id_evalua int unsigned not null auto_increment primary key,
  nombre_evalua varchar(100),
  sigla_evalua varchar(10),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_modulo
(
  id_modulo int unsigned not null auto_increment primary key,
  nombre_modulo varchar(15),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);
CREATE TABLE tb_fecha_evaluas
(
  id_fec_evalua int unsigned not null auto_increment primary key,
  inicio_evalua date,
  fin_evalua date,
  id_evalua int unsigned,
  id_modulo int unsigned,

  foreign(id_evalua) references tb_evaluaciones(id_evalua),
  foreign(id_modulo) references tb_modulos(id_modulo),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);
CREATE TABLE tb_fechas
(
id_fechas int unsigned not null auto_increment primary key,
id_modulo int unsigned,
inicio_fec date,
fin_fec date,

foreign key(id_modulo) references tb_modulos(id_modulo),
created_at timestamp NULL DEFAULT NULL,
updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_cronogramas
(
  id_crono int unsigned not null auto_increment primary key,
  nombre_crono varchar(50),
  id_fec_evalua int unsigned,
  id_modal int unsigned,
  inicio_crono date,
  fin_crono date,
  gestion_crono int(10),
  periodo_crono int(5),
  id_fechas int unsigned,

  foreign key(id_fec_evalua) references tb_fecha_evaluas(id_fec_evalua),
  foreign key(id_modal) references tb_modalidades(id_modal),
  foreign key(id_fechas) references tb_fechas(id_fechas),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_calendarios
(
  id_calend int unsigned not null auto_increment primary key,
  nombre_calend varchar(50),
  id_crono int unsigned,
  id_modulo int unsigned,
  id_carre int unsigned,
  id_sem int unsigned,
  id_materia int unsigned,

  foreign key(id_crono) references tb_cronogramas(id_crono),
  foreign key(id_modulo) references tb_modulos(id_modulo),
  foreign key(id_carre) references tb_carreras(id_carre),
  foreign key(id_sem) references tb_semestres(id_sem),
  foreign key(id_materia) references tb_materias(id_materia),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_tipo_cal
(
  id_tipo_cal int unsigned not null auto_increment primary key,
  nombre_tipo_cal varchar(50),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_detalle_calend
(
  id_det_cal int unsigned not null auto_increment primary key,
  id_calend int unsigned,
  turno_det varchar(15),
  paralelo_det varchar(5),
  aula_det varchar(30),
  id_tipo_cal int unsigned,

  foreign key(id_calend) references tb_calendarios(id_calend),
  foreign key(id_tipo_cal) references tb_tipo_cal(id_tipo_cal),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);



--Convalidación de materias
--
--
--
CREATE TABLE tb_plan_desc_conv
(
  id_plandesc_conv int unsigned not null auto_increment primary key,
  nombre_plan_conv varchar(50),
  obs_plan_conv varchar(255),
  id_carre int unsigned,
  id_univ int unsigned,
  id_convcarr int unsigned,

  foreign key(id_carre) references tb_carreras(id_carre),
  foreign key(id_univ) references tb_universidades(id_univ),
  foreign key(id_convcarr) references tb_conv_carreras(id_convcarr),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_univer_carre_materias
(
  id_univ_carre_mater int unsigned not null auto_increment primary key,
  id_univer int unsigned,
  id_convcarr int unsigned,
  id_convmat int unsigned,
  tipo_mater varchar(25),
  hora_carre int(10),

  foreign key(id_univer) references tb_universidades(id_univ),
  foreign key(id_convcarr) references tb_conv_carreras(id_convcarr),
  foreign key(id_convmat) references tb_conv_materias(id_convmat),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_plantillas
(
  id_plantilla int unsigned not null auto_increment primary key,
  id_plandesc_conv int unsigned,
  id_univ_carre_mater int unsigned,
  id_carre_mater int unsigned,
  porcen_planti float,
  freg_planti varchar(15),
  obs_planti text,

  foreign key(id_plandesc_conv) references tb_plan_desc_conv(id_plandesc_conv),
  foreign key(id_univ_carre_mater) references tb_univer_carre_materias(id_univ_carre_mater),
  foreign key(id_carre_mater) references tb_carre_materias(id_carre_mater),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_estado_conv_univ
(
  id_estado_conv int unsigned not null auto_increment primary key,
  id_conv_est int unsigned,
  id_univ_carre_mater int unsigned,

  foreign key(id_conv_est) references tb_conv_estudiantes(id_conv_est),
  foreign key(id_univ_carre_mater) references tb_univer_carre_materias(id_univ_carre_mater),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);
CREATE TABLE tb_conv_estudiantes
(
  id_conv_est int unsigned not null auto_increment primary key,
  nombre_est_conv varchar(50),
  ape_p_est_conv varchar(30),
  ape_m_est_conv varchar(30),
  documento_id int(30),
  tel_conv int(20),
  cel_conv int(30),
  dir_conv varchar(100),
  email_conv varchar(100),
  id_carre int unsigned,
  nro_form int(16),
  id_est int unsigned,
  fec_conv date,

  foreign key(id_carre) references tb_carreras(id_carre),
  foreign key(id_est) references tb_estudiantes(id_est),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_tema_univ_carre_materias
(
  id_tema_univcarremater int unsigned not null auto_increment primary key,
  id_univ_carre_mater int unsigned,
  id_conv_tema int unsigned,
  nro_tema_conv int(15),

  foreign key(id_univ_carre_mater) references tb_univer_carre_materias(id_univ_carre_mater),
  foreign key(id_conv_tema) references tb_conv_temas(id_conv_tema),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_conv_temas
(
  id_conv_tema int unsigned not null auto_increment primary key,
  nombre_tema_conv varchar(255),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_conv_contenidos
(
  id_conv_conte int unsigned not null auto_increment primary key,
  nombre_conte varchar(255),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_tema_contenidos
(
  id_tema_conte int unsigned not null auto_increment primary key,
  id_conv_tema int unsigned,
  id_conv_conte int unsigned,

  foreign key(id_conv_tema) references tb_conv_temas(id_conv_tema),
  foreign key(id_conv_conte) references tb_conv_contenidos(id_conv_conte),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_conv_materias
(
  id_convmat int unsigned not null auto_increment primary key,
  sigla_mater_conv varchar(10),
  nombre_mater_conv varchar(100),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_conv_est_uni_carreras
(
  id_conv_est_uni_carre int unsigned not null auto_increment primary key,
  id_conv_est int unsigned,
  id_univ int unsigned,
  id_convcarr int unsigned,

  foreign key(id_conv_est) references tb_conv_estudiantes(id_conv_est),
  foreign key(id_univ) references tb_universidades(id_univ),
  foreign key(id_convcarr) references tb_conv_carreras(id_convcarr),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_conv_carreras
(
  id_convcarr int unsigned not null auto_increment primary key,
  nombre_carr_conv varchar(100),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_universidades
(
  id_univ int unsigned not null auto_increment primary key,
  nombre_univ varchar(255),
  sigla_univ varchar(15),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_univer_carreras
(
  id_univ_carre int unsigned not null auto_increment primary key,
  id_univ int unsigned,
  id_convcarr int unsigned,

  foreign key(id_univ) references tb_universidades(id_univ),
  foreign key(id_convcarr) references tb_conv_carreras(id_convcarr),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_carre_materias
(
  id_carre_mater int unsigned not null auto_increment primary key,
  id_carre int unsigned,
  id_materia int unsigned,
  sem_materia int(10),
  cred_materia int(10),
  ht_materia int(15),
  hp_materia int(15),
  tse_materia int(15),
  tsm_materia int(15),
  cat_materia varchar(20),
  are_materia varchar(20),
  ord_materia varchar(20),
  pos_x_materia int(15),
  pos_y_materia int(15),
  obs_materia varchar(255),

  foreign key(id_carre) references tb_carreras(id_carre),
  foreign key(id_materia) references tb_materias(id_materia),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_convalidaciones
(
  id_convalidacion int unsigned not null auto_increment primary key,
  id_conv_est int unsigned,
  id_plandesc_conv int unsigned,
  id_univ_carre_mater int unsigned,
  id_carre_mater int unsigned,
  nota_conv int(10),
  fec_conv date,
  ap_conv varchar(20),
  resol_conv varchar(20),
  obs_conv varchar(255),

  foreign key(id_conv_est) references tb_conv_estudiantes(id_conv_est),
  foreign key(id_plandesc_conv) references tb_plan_desc_conv(id_plandesc_conv),
  foreign key(id_univ_carre_mater) references tb_univer_carre_materias(id_univ_carre_mater),
  foreign key(id_carre_mater) references tb_carre_materias(id_carre_mater),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

-- Seguimiento Docente (Nueva Tabla 07/diciembre)

CREATE TABLE tb_docente_seguis
(
  id_doc_segui int unsigned not null auto_increment primary key,
  id_doc int unsigned,
  id_nota_eval int unsigned,
  nota_1p_se varchar(20),
  nota_2p_se varchar(20),
  nota_ex_se varchar(20),
  nota_2t_se varchar(20),
  nota_fi_se varchar(20),
  obs_se varchar(20),
  foreign key(id_doc) references tb_docentes(id_doc),
  foreign key(id_nota_eval) references tb_nota_evalua(id_nota_eval),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

--
--
--
--
-- Modulo Administrativo
--
--
--
--
CREATE TABLE tb_tipo_admin
(
  id_tipo_admin int unsigned not null auto_increment primary key,
  nombre_tipo_admin varchar(255),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_administrativos
(
  id_administrativo int unsigned not null auto_increment primary key,
  ape_p_admin varchar(50),
  ape_m_admin varchar(50),
  nombre_admin varchar(100),
  ci_admin int(15),
  sexo_admin varchar(10),
  dir_admin varchar(200),
  tel_admin int(15),
  cel_admin int(20),
  email_admin varchar(100),
  obs_admin varchar(255),
  vigente_admin varchar(15),
  fec_ingreso_admin date,
  fec_nac_admin date,
  nro_asegurado_admin int(20),
  cargo_admin varchar(100),
  foto_admin varchar(255),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_cargo_admin
(
  id_cargo_admin int unsigned not null auto_increment primary key,
  nombre_cargo_admin varchar(50),
  id_administrativo int unsigned,

  foreign key(id_administrativo) references tb_administrativos(id_administrativo),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_salarios_admin
(
  id_salario_admin int unsigned not null auto_increment primary key,
  id_cargo_admin int unsigned,
  id_administrativo int unsigned,
  haberes_admin varchar(100),
  hb1_admin float,
  hb2_admin float,
  afp_admin float,
  caja_admin float,
  otrod_admin float,
  bant_admin float,
  botro1_admin float,
  botro2_admin float,
  fec_ini_admin date,
  fec_reg_admin date,
  tipo_trans_admin varchar(100),
  horario_admin date,

  foreign key(id_cargo_admin) references tb_cargo_admin(id_cargo_admin),
  foreign key(id_administrativo) references tb_administrativos(id_administrativo),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_ingresos
(
  id_ingreso int unsigned not null auto_increment primary key,
  fec_ingreso date,
  refere_ingreso varchar(100),
  detalle_ingreso varchar(200),
  monto_ingreso float,
  id_cuenta int unsigned,
  id_administrativo int unsigned,
  id_doc int unsigned,
  id_persona int unsigned,
  id_est int unsigned,
  id_empresa int unsigned,
  tipo_ingreso varchar(100),
  fec_transf date,

  foreign key(id_cuenta) references tb_cuentas(id_cuenta),
  foreign key(id_administrativo) references tb_administrativos(id_administrativo),
  foreign key(id_doc) references tb_docentes(id_doc),
  foreign key(id_persona) references tb_personas(id_persona),
  foreign key(id_est) references tb_estudiantes(id_est),
  foreign key(id_empresa) references tb_empresas(id_empresa),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_planilla_admin
(
  id_planilla_admin int unsigned not null auto_increment primary key,
  nro_planilla int(15),
  mes_planilla date,
  gestion_planilla date,
  id_administrativo int unsigned,
  id_cargo_admin int unsigned,
  haberes_admin varchar(100),
  hb1_admin float,
  hb2_admin float,
  afp_admin float,
  caja_admin float,
  otrod_admin float,
  bant_admin float,
  botro1_admin float,
  botro2_admin float,
  liquido_admin float,
  obs_admin varchar(255),
  fec_planilla_admin date,
  id_egreso_admin int unsigned,
  cons_admin varchar(30),

  foreign key(id_administrativo) references tb_administrativos(id_administrativo)
  foreign key(id_cargo_admin) references tb_cargo_admin(id_cargo_admin),
  foreign key(id_egreso_admin) references tb_egreso_admin(id_egreso_admin),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_comprobantes
(
  id_comprob int unsigned not null auto_increment primary key,
  fec_comprob date,
  id_cuenta int unsigned,
  glosa_comprob varchar(100),
  nombre_chueque varchar(255),
  nro_cheque int(20),
  fec_cheque date,
  tipo_comprob varchar(20),
  total_comprob float,
  cuentas_ren varchar(25),
  fec_cobro date,
  tipo_transf varchar(20),
  fec_tranf date,
  --id_uss int,

  foreign key(id_cuenta) references tb_cuentas(id_cuenta),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_personas
(
  id_persona int unsigned not null auto_increment primary key,
  ape_p_per varchar(50),
  ape_m_per varchar(50),
  nombre_per varchar(100),
  ci_per int(20),
  cel_per int(20),
  dir_per varchar(200),
  email_per varchar(200),
  id_empresa int,
  nit_persona varchar(25),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_empresas
(
  id_empresa int unsigned not null auto_increment primary key,
  nombre_emp varchar(200),
  nit_emp int(25),
  tel_emp int(15),
  cel_emp int(25),
  email_emp varchar(200),
  img_logo_emp varchar(255),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_facturas
(
  id_factura int unsigned not null auto_increment primary key,
  nro_factura int(20),
  fec_factura date,
  nit_factura int(25),
  nombre_factura varchar(200),
  monto_factura float,
  detalle_factura varchar(200),
  aut_factura varchar(100),
  imag_factura varchar(255),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_detalle_presu
(
  id_det_presu int unsigned not null auto_increment primary key,
  nro_det_presu int(15),
  mes_det_presu date,
  gestion_presu date,
  id_proyecto int,
  det_presu_total float,
  det_presu_monto float,
  fec_presu_det date,
  id_egreso_admin int,
  id_cuenta int,

  foreign key(id_egreso_admin) references tb_egreso_admin(id_egreso_admin),
  foreign key(id_cuenta) references tb_cuentas(id_cuenta),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_presupuestos
(
  id_presupuesto int unsigned not null auto_increment primary key,
  --id_pcc int,
  id_det_presu int unsigned,
  detalle_plan varchar(200),
  monto_plan float,
  monto_presu_total float,
  monto_egre_total float,
  id_factura int unsigned,
  fec_presu_plan date,
  id_empresa int unsigned,
  id_persona int unsigned,
  id_doc int unsigned,
  id_administrativo int unsigned,
  id_est int unsigned,
  pag_pla varchar(200),

  --foreign key(id_pcc) references tb_pcc(id_pcc),
  foreign key(id_det_presu) references tb_detalle_presu(id_det_presu),
  foreign key(id_factura) references tb_facturas(id_factura),
  foreign key(id_empresa) references tb_empresas(id_empresa),
  foreign key(id_persona) references tb_personas(id_persona),
  foreign key(id_doc) references tb_docentes(id_doc),
  foreign key(id_administrativo) references tb_administrativos(id_administrativo),
  foreign key(id_est) references tb_estudiantes(id_est),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);



CREATE TABLE tb_comp_detalles
(
  id_comp_detalle int unsigned not null auto_increment primary key,
  nro_comp_detalle int(20),
  nro_ref_comp_det int(50),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_planilla_doc
(
  id_planilla_doc int unsigned not null auto_increment primary key,
  nro_plani_doc int(20),
  domic_plani_doc varchar(200),
  id_doc int unsigned,
  total_plani float,
  monto_plani float,
  ret_plani varchar(25),
  inc_plani varchar(25),
  desc_plani float,
  liquido_plani float,
  obs_plani varchar(200),
  id_egreso_admin int unsigned,
  sel_plani varchar(25),

  foreign key(id_doc) references tb_docentes(id_doc),
  foreign key(id_egreso_admin) references tb_egreso_admin(id_egreso_admin),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_crono_materias
(
  id_crono_mater int unsigned not null auto_increment primary key,
  id_doc_cuenta int unsigned,
  id_carr_mat_doc int unsigned,
  periodo_crono_mat int(5),
  gestion_crono_mat int(10),
  turno_crono_mat varchar(15),
  paralelo_crono_mat varchar(5),
  id_monto_materia int unsigned,
  nro_pagos int,
  fec_ini_crono_mat date,
  fec_fin_crono_mat date,
  nro_mod int(25),
  fusion varchar(50),

  foreign key(id_doc_cuenta) references tb_docente_cuentas(id_doc_cuenta),
  foreign key(id_carr_mat_doc) references tb_carre_mat_doc(id_carr_mat_doc),
  foreign key(id_monto_materia) references tb_monto_materias(id_monto_materia),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL

);

CREATE TABLE tb_monto_materias
(
  id_monto_materia int unsigned not null auto_increment primary key,
  sigla_monto varchar(25),
  descrip_monto varchar(200),
  monto_mat float,
  vigente_monto_mat varchar(50),
  nro_pag_monto_mat int(50),
  tipo_monto_mat varchar(100),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_tipo_monto_materias
(
  id_tipo_monto_mat int unsigned not null auto_increment primary key,
  descrip_monto_mat varchar(200),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_docente_cuentas
(
  id_doc_cuenta int unsigned not null auto_increment primary key,
  id_doc int unsigned,
  nro_cuenta_doc int(20),

  foreign key(id_doc) references tb_docentes(id_doc),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_carre_mat_doc
(
  id_carr_mat_doc int unsigned not null auto_increment primary key,
  id_carre int unsigned,
  id_sem int unsigned,
  id_materia int unsigned,
  id_monto_materia int unsigned,

  foreign key(id_carre) references tb_carreras(id_carre),
  foreign key(id_sem) references tb_semestres(id_sem),
  foreign key(id_materia) references tb_materias(id_materia),
  foreign key(id_monto_materia) references tb_monto_materias(id_monto_materia),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

--
--
--
--Asignación de materias
--
--
--


CREATE TABLE tb_Asignacion_mat_est
(
  id_asig_mat_est int unsigned not null auto_increment primary key,
  sigla varchar(55),
  materia_asig varchar(255),
  sem_asig varchar(5),
  turno_asig varchar(50),
  paralelo_asig varchar(5),
  periodo int(5),
  gestion int(10),
  doceste_asig varchar(200),
  id_est int unsigned,
  matricula int(15),
  est_asig varchar(200),
  carrera_asig varchar(200),
  fec_trans date,

  foreign key(id_est) references tb_estudiantes(id_est),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_Asignacion_mat
(
  id_asig_mat int unsigned not null auto_increment primary key,
  nro_asig_mat int,
  id_est int unsigned,
  id_carre int unsigned,
  id_materia int unsigned,
  tipo_mat_carr varchar(5),
  periodo_mat_carr int(5),
  gestion_asig_mat int(10),
  vigencia_asig_mat varchar(5),
  nota_asig_mat float,
  literal_asig_mat varchar(100),
  apro_rep_con_asig_mat varchar(10),
  turno_asig_mat varchar(10),
  paralelo_asig_mat varchar(5),
  modulo int(10),
  verificado_asig_mat int(2),
  modificado_asig_mat int(2),
  nuevo_asig_mat int(2),
  autorizado_asig_mat int(2),
  obs_asig_mat varchar(250),

  foreign key(id_est) references tb_estudiantes(id_est),
  foreign key(id_carre) references tb_carreras(id_carre),
  foreign key(id_materia) references tb_materias(id_materia),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

--
--
-- Cuenta de Banco
--
--
--


CREATE TABLE tb_cuentas
(
  id_cuenta int unsigned not null auto_increment primary key,
  banco varchar(250),
  nro_cuenta varchar(200),
  ab_cuenta varchar(55),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_bancos
(
  id_banco int unsigned not null auto_increment primary key,
  nombre_banco varchar(200),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_cuenta_bancos
(
  id_cuenta_banco int unsigned not null auto_increment primary key,
  id_banco int unsigned,
  id_cuenta int unsigned,

  foreign key(id_banco) references tb_bancos(id_banco),
  foreign key(id_cuenta) references tb_cuentas(id_cuenta),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);


--
--
-- Motivos de Retiro
--
--
--

CREATE TABLE tb_retiros
(
  id_retiro int unsigned not null auto_increment primary key,
  motivo_retiro varchar(250),
  periodo_fin int(5),
  gestion fin int(10),
  obs_retiro varchar(250),
  fec_trans date,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

--
--Boletas
--
--

CREATE TABLE tb_boletas
(
  id_boleta int unsigned not null auto_increment primary key,
  id_est int unsigned,
  id_carre int unsigned,
  periodo_boleta int(5),
  gestion_boleta int(10),
  fec_reg_boleta date,
  fec_depos_boleta date,
  id_cuenta int,
  nro_depos varchar(250),
  monto_boleta float,
  bs_boleta int(2),
  obs_boleta varchar(250),
  fec_trans_boleta date,
  terminal_boleta varchar(100),

  foreign key(id_est) references tb_estudiantes(id_est),
  foreign key(id_carre) references tb_carreras(id_carre),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);


--
--
--Caja Chica
--
--
CREATE TABLE tb_caja_chicas
(
  id_caja_chica int unsigned not null auto_increment primary key,
  nro_caja_chica int(255),
  fec_caja_chica date,
  nombre_caja_chica varchar(200),
  detalle_caja_chica varchar(250),
  debe_caja_chica float,
  haber_caja_chica float,
  obs_caja_chica varchar(250),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

--
--
--Universidades y tipos
--
--

CREATE TABLE tb_universidad_tipos
(
  id_univ_tipo int unsigned not null auto_increment primary key,
  id_univ int unsigned,
  pais_univ varchar(250),
  tipo_univ varchar(250),

  foreign key(id_univ) references tb_universidades(id_univ),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

--
--
-- Papeleta
--
--

CREATE TABLE tb_papeletas
(
  id_papel int unsigned not null auto_increment primary key,
  id_doc int unsigned,
  mes_papel int(10),
  anio_papel int(10),
  fec_papel date,
  ganado_papel float,
  bono_papel float,
  descuento_papel float,
  adelanto_papel float,
  liquido_papel float,
  bs_papel int(2),
  autorizado_papel int(2),
  fec_pago_papel date,
  id_egreso_admin int unsigned,
  tasa_cambio_papel float,

  foreign key(id_doc) references tb_docentes(id_doc),
  foreign key(id_egreso_admin) references tb_egreso_admin(id_egreso_admin),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL

);

--
-- Egreso Laboral
--
--

CREATE TABLE tb_egreso_laborales
(
  id_egreso int unsigned not null auto_increment primary key,
  id_empresa int unsigned,
  id_est int unsigned,
  id_carre int unsigned,
  inicio_emp date,
  fin_emp date,
  nombre_egreso varchar(250),
  area_emp int(10),
  detalle_emp varchar(250),
  cargo_emp varchar(100),
  prop_emp varchar(100),
  fec_trans_egr date,

  foreign key(id_empresa) references tb_empresas(id_empresa),
  foreign key(id_est) references tb_estudiantes(id_est),
  foreign key(id_carre) references tb_carreras(id_carre),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL

);

--
--
-- Egresados
--
--
--

CREATE TABLE tb_egr_defensas
(
  id_egr_defensa int unsigned not null auto_increment primary key,
  nombre_defensa varchar(250),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_egr_titulados
(
  id_titulado int unsigned not null auto_increment primary key,
  id_est int unsigned,
  id_carre int unsigned,
  fin_periodo_ti int(5),
  fin_gestion_ti int(10),
  nota_rot int(20),
  fecha_rot date,
  nota_pane1 int(20),
  fecha_pane1 date,
  nota_pane2 int(20),
  fecha_pane2 date,
  cite_habil varchar(250),
  fecha_habil date,
  cite_cnt varchar(250),
  fecha_cnt date,
  tipo_defensa int(10),
  acta_defensa varchar(100),
  nota_defensa int(10),
  nro_dip varchar(100),
  fec_dip date,
  fec_trans_egr_ti date,

  foreign key(id_est) references tb_estudiantes(id_est),
  foreign key(id_carre) references tb_carreras(id_carre),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_egr_titulos
(
  id_egr_titulo int unsigned not null auto_increment primary key,
  id_est int unsigned,
  id_carre int unsigned,
  tipo_titulo varchar(250),
  nombre_titulo varchar(250),
  id_univ int unsigned,
  gestion_titulo int(10),

  foreign key(id_est) references tb_estudiantes(id_est),
  foreign key(id_carre) references tb_carreras(id_carre),
  foreign key(id_univ) references tb_universidades(id_univ),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);


--
--
-- Estudiantes preinscritos
--
--
--
CREATE TABLE tb_est_preinscritos
(
  id_est_preins int unsigned not null auto_increment primary key,
  nombre_est_preins varchar(100),
  ape_m_est_preins varchar(50),
  ape_m_est_preins varchar(50),
  ci_est_preins int(15),
  f_nac_est_preins date,
  dir_est_preins varchar(250),
  tel_est_preins int(15),
  cel_est_preins int(20),
  email_est_preins varchar(100),
  turno_est_preins varchar(15),
  fec_reg_est_preins date,
  padre_est_preins varchar(250),
  madre_est_preins varchar(250),
  trab_p_est_preins varchar(250),
  tel_trab_p_est_preins int(20),
  dir_trab_p_est_preins varchar(250),
  colegio_est_preins varchar(250),
  sexo_est_preins varchar(15),
  numsol_est_preins varchar(15),
  inscrito varchar(2),
  dom_est_preins varchar(250),
  tel_dom_est_preins int(20),
  dir_trab_est_preins varchar(250),
  tel_trab_est_preins int(20),
  nombre_trab_est_preins varchar(250),
  fec_bachi_est_preins date,
  colegio_tipo_est_preins varchar(20),
  id_pais int unsigned,
  fact_doc_tipo_est_preins varchar(5),
  fact_doc_numero_est_preins varchar(20),
  fact_nombre_est_preins varchar(150),
  fec_tranf_est_preins date,
  foto_est_preins varchar(255),
  fec_emitb_est_preins date,
  sede_emit_est_preins varchar(250),
  id_carre int unsigned,
  insc_est_preins int(5),

  foreign key(id_pais) references tb_paises(id_pais),
  foreign key(id_carre) references tb_carreras(id_carre),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL

);

CREATE TABLE tb_paises
(
  id_pais int unsigned not null auto_increment primary key,
  nombre_pais varchar(250),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

--
--
-- Examen de Suficiencia
--
--
create table tb_tribunal
(
  id_trib_exam int unsigned not null auto_increment primary key,
  id_doc int unsigned,
  nombre_trib varchar(250),
  foreign key(id_doc) references tb_estudiantes(id_doc),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);


CREATE TABLE tb_examen_sufi
(
  id_exam_su int unsigned not null auto_increment primary key,
  id_est int unsigned,
  id_carre int unsigned,
  id_materia int unsigned,
  periodo_exam_su int(5),
  gestion_exam_su int(10),
  turno_exam_su varchar(50),
  paralelo_exam_su varchar(5),
  semestre_exam_su varchar(60),
  id_trib_exam_a int unsigned,
  id_trib_exam_b int unsigned,
  id_trib_exam_c int unsigned,
  fec_exam_su date,
  fec_tranf_exam_su date,

  foreign key(id_est) references tb_estudiantes(id_est),
  foreign key(id_carre) references tb_carreras(id_carre),
  foreign key(id_materia) references tb_materias(id_materia),
  foreign key(id_trib_exam_a) references tb_trib(id_trib_exam_a),
  foreign key(id_trib_exam_b) references tb_trib(id_trib_exam_b),
  foreign key(id_trib_exam_c) references tb_trib(id_trib_exam_c),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

--
--
-- Nota y evaluaciones

CREATE TABLE tb_nota_aux
(
  id_tb_nota_aux int unsigned not null auto_increment primary key,
  id_est int unsigned,
  id_carre int unsigned,
  id_materia int unsigned,
  periodo_nota_aux int(5),
  gestion_nota_aux int(10),
  habi_nota_aux int(20),
  p1_nota_aux int(20),
  p2_nota_aux int(20),

  ef_nota_aux int(20),
  n2t_nota_aux int(20),
  nf_nota_aux int(20),
  literal_nota_aux varchar(250),
  arc_nota_aux int(20),
  turno_nota_aux varchar(15),
  paralelo_nota_aux varchar(5),
  modulo_nota_aux int(20),
  obs_nota_aux varchar(250),
  tipo_crono int(20),
  nuevo_nota_aux int(2),
  modificado_nota_aux int(2),
  verificado_nota_aux int(2),

  foreign key(id_est) references tb_estudiantes(id_est),
  foreign key(id_carre) references tb_carreras(id_carre),
  foreign key(id_materia) references tb_materias(id_materia),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_nota_estados
(
  id_nota_estado int unsigned not null auto_increment primary key,
  estado_nota varchar(200),
  estado2_nota varchar(200),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_nota_evalua
(
  id_nota_eval int unsigned not null auto_increment primary key,
  id_carre int unsigned,
  eval_p1 int(20),
  eval_p2 int(20),
  eval_fin int(20),
  eval_2t int(20),
  nota_final int(20),
  nota_literal varchar(250),
  obs_nota_eval varchar(250),

  foreign key(id_carre) references tb_carreras(id_carre),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

--
--
-- Planes detalle
--
--
CREATE TABLE tb_plan_detalle
(
  id_plan_detalle int unsigned not null auto_increment primary key,
  con_plan_detalle int(20),
  monto_plan_detalle float,
  nro_plan_detalle int(20),
  cantidad_plan_detalle int(50),
  bs_plan_detalle int(2),
  nro_cuotas_plan_detalle int(10),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

--
-- Prerrequisitos
--

--CREATE TABLE tb_prerequisito_u
--(
--  id_prerequisito_u int unsigned not null auto_increment primary key,
--  id_materia int unsigned,
--  id_carre int unsigned,

--  foreign key(id_materia) references tb_materia(id_materia),
 -- foreign key(id_carre) references tb_carrera(id_carre),
 -- created_at timestamp NULL DEFAULT NULL,
 -- updated_at timestamp NULL DEFAULT NULL
--  );

--
--
-- Revalidas
--
--


CREATE TABLE tb_revalida
(
  id_revalida int unsigned not null auto_increment primary key,
  nro_revalida int(10),
  id_est int unsigned,
  id_materia int unsigned,
  id_doc int unsigned,
  id_carre int unsigned,
  nota_revalida int(20),
  turno_revalida int(15),
  id_sem int unsigned,
  paralelo_revalida varchar(5),
  monto_revalida float,
  periodo_revalida int(5),
  gestion_revalida int(10),
  fec_revalida date,
  fec_trans_revalida date,

  foreign key(id_est) references tb_estudiante(id_est),
  foreign key(id_materia) references tb_materia(id_materia),
  foreign key(id_doc) references tb_docente(id_doc),
  foreign key(id_carre) references tb_carrera(id_carre),
  foreign key(id_sem) references tb_semestre(id_sem),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_revalida_imp
(
  id_revalida_imp int unsigned not null auto_increment primary key,
  nro_revalida_imp int(10),
  id_revalida int unsigned,

  foreign key(id_revalida) references tb_revalida(id_revalida),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);


--
--
-- VEN_DETALLES
--

CREATE TABLE tb_ven_detalle
(
  id_ven_detalle int unsigned not null auto_increment primary key,
  fec_materia date,
  fec_c1 date,
  fec_c2 date,
  fec_c3 date,
  fec_c4 date,
  fec_c5 date,
  fec_c6 date,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_ven_semestre
(
  id_ven_semestre int unsigned not null auto_increment primary key,
  id_sem int unsigned,
  id_ven_detalle int unsigned,

  foreign key(id_sem) references tb_semestre(id_sem),
  foreign key(id_ven_detalle) references tb_ven_detalle(id_ven_detalle),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_ven_vencimiento
(
  id_ven_vencimiento int unsigned not null auto_increment primary key,
  id_ven_detalle int unsigned,
  desc_ven varchar(250),
  periodo_ven int(5),
  gestion_ven int(10),
  tipo_ven int(10),

  foreign key(id_ven_detalle) references tb_ven_detalle(id_ven_detalle),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

--
--VV_Depositos
--

CREATE TABLE tb_deposito
(
  id_deposito int unsigned not null auto_increment primary key,
  fec_deposito date,
  banco_deposito int(2),
  monto_deposito float,
  papeleta_deposito varchar(100),
  tipo_cambio_deposito float,
  detalle_deposito varchar(255),
  doc_deposito varchar(100),
  nombre_deposito varchar(250),
  obs_deposito varchar(250),
  fec_trans_deposito date,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

--
--VV_Egresos, Ingresos
--

CREATE TABLE tb_egreso
(
  id_egreso int unsigned not null auto_increment primary key,
  categoria_egreso varchar(200),
  subcategoria_egreso varchar(200),
  identi_adj_egreso varchar(100),
  nombre_adj_egreso varchar(200),
  detalle_egreso varchar(200),
  fec_egreso date,
  monto_egreso float
  tasa_cambio_egreso float,
  obs_egreso varchar(250),
  fec_trans_egreso date,
  nro_fac_egreso varchar(60),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_ingreso_detalle
(
  id_ingreso_det int unsigned not null auto_increment primary key,
  id_ingreso int unsigned,
  cantidad_ingreso_det float,
  monto_ingreso_det float,
  foreign key(id_ingreso) references tb_ingreso(id_ingreso),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

CREATE TABLE tb_ingreso
(
  id_ingreso int unsigned not null auto_increment primary key,
  fec_ingreso date,
  id_est int unsigned,
  id_carre int unsigned,
  id_materia int unsigned,
  monto_ingreso float
  periodo_ingreso int(5),
  gestion_ingreso int(10),
  doc_ingreso varchar(100),
  depositante_ingreso varchar(250),
  obs_ingreso varchar(250),
  categoria_ingreso varchar(200),
  subcategoria_ingreso varchar(200),
  fec_trans_ingreso date,
  nro_fac_ingreso varchar(60),

  foreign key(id_est) references tb_estudiante(id_est),
  foreign key(id_carre) references tb_carrera(id_carre),
  foreign key(id_materia) references tb_materia(id_materia),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

--
--
-- Trans Personal
--
--

CREATE TABLE tb_transf_personal
(
  id_trans_pers int unsigned not null auto_increment primary key,
  ci_pers varchar(60),
  nombre_pers varchar(250),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);

--
--
-- Archivo del banco BNB
--

CREATE TABLE tb_arch_banco_bnb
(
  id_arch int unsigned not null auto_increment primary key,
  tipo_arch varchar(100),
  fec_arch date,
  hora_arch date,
  cab_arch varchar(255),
  nombre_arch varchar(250),
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
);


--
--
-- Registro de documentos
--
--
CREATE TABLE tb_registro_documento
(
  id_regis_documento int unsigned not null auto_increment primary key,
  id_est int unsigned,
  id_carre int unsigned,
  registro

);
