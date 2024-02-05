const con = require('../../infraestructure/config/config');

/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */
const getParametrosDenuncia = async (req, res) => {
    try {
        const tipo_denuncia = await con.query(`select id_parametro as value, descripcion as label from parametricas.f_listar_parametricas(61) order by descripcion`);
        const poblacion_vulnerable = await con.query(`select id_parametro as value, nombre as label from parametricas.f_listar_parametricas(31)`);
        const sexo = await con.query(`select id_parametro as id, descripcion as value from parametricas.f_listar_parametricas(15)`);
        const vive_con = await con.query(`select id_parametro as value, nombre as label from parametricas.f_listar_parametricas(299)`);
        const relacion_denuncia = await con.query(`select id_parametro as id, nombre as value from parametricas.f_listar_parametricas(159)`);
        const relacion_familiar = await con.query(`select id_parametro as id, nombre as value from parametricas.f_listar_parametricas(39)`);
        const tipo_fec_nac = await con.query(`select id_parametro as id, nombre as value from parametricas.f_listar_parametricas(18)`);
        const tipo_denunciante = await con.query(`select id_parametro as id, nombre as value from parametricas.f_listar_parametricas(152)`);
        const tipo_denunciado = await con.query(`select id_parametro as id, nombre as value from parametricas.f_listar_parametricas(156)`);
        const tipo_ci_exp = await con.query(`select id_parametro as id, nombre as value from parametricas.f_listar_parametricas(21)`);
        res.status(200).json({
            parametros: {
                tipo_denuncia: tipo_denuncia.rows,
                poblacion_vulnerable: poblacion_vulnerable.rows,
                sexo: sexo.rows,
                relacion_denuncia:relacion_denuncia.rows,
                relacion_familiar:relacion_familiar.rows,
                vive_con: vive_con.rows,
                tipo_fec_nac: tipo_fec_nac.rows,
                tipo_denunciante: tipo_denunciante.rows,
                tipo_denunciado: tipo_denunciado.rows,
                tipo_ci_exp: tipo_ci_exp.rows

            },
            mensaje:"Se obtuvo los parámetros solicitados",
            cod:200}
        );
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}


/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */
const gestionDenuncias = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body
    console.log(v_json)
    const query = {
        text: `call sinna_mid.p_denuncias($1) `,
        values:[v_json]
            };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  {rows: result.rows, fields: result.fields}
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
*/
const obtieneDenuncias = async (req, res) => {
    const query = {
        text: `select * from sinna_mid.listar_denuncias() order by id_denuncia desc`
            };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const obtieneDen= async (req, res) => {
    const id_den = req.params.id
    const query = {
        text: `select * from sinna_mid.listar_denuncias($1)`,
        values:[id_den]
            };
    //console.log(query)
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows
            ////console.log(resultado)
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}
/**
 * TODO: Implementar la funcion en la base de datos para obtener familiares
 * @param {*} req 
 * @param {*} res 
 */
const obtieneFamiliares= async (req, res) => {
    const cod_denuncia = req.params.cod_denuncia
    const query = {
        text: `select md.cod_caso, md.id_denuncia, cfh.id_familiar, cfh.nna, cfh.relacion_familiar, 
        cp.primer_apellido, cp.segundo_apellido, cp.nombres,
        cp.direccion, pc.nombre  
        from comun.com_familiares_hermanos cfh 
        inner join comun.com_personas cp on cfh.id_persona = cp.id_persona 
        inner join sinna_mid.mid_denuncias md on cfh.nna = md.id_persona 
        inner join parametricas.par_clasificador pc on cfh.relacion_familiar = pc.id_parametro 
        where md.id_denuncia = $1`,
        values:[cod_denuncia]
            };
    //console.log(query)
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}
/**
 * TODO: Implementar la funcion en la base de datos para obtener denunciados
 * @param {*} req 
 * @param {*} res 
 */
const obtienedendo = async(req, res) =>{const cod_denuncia = req.params.cod_denuncia
    const query = {
        text: `select md.cod_caso, mdp.id_denuncia , mdp.tipo_denunciado, cp.primer_apellido, cp.segundo_apellido, cp.nombres,
        cp.direccion, pc.nombre, md.cod_caso 
        from sinna_mid.mid_denuncias_personas mdp
        inner join comun.com_personas cp on mdp.id_persona = cp.id_persona 
        inner join sinna_mid.mid_denuncias md on mdp.id_denuncia  = md.id_denuncia  
        inner join parametricas.par_clasificador pc on mdp.tipo_denunciado  = pc.id_parametro 
        where md.id_denuncia = $1 and tipo_denunciante is null`,
        values:[cod_denuncia]
            };
    //console.log(query)
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows
            //console.log(resultado)
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
    }
/**
 * TODO: Implementar la funcion en la base de datos para obtener denunciantes
 * @param {*} req 
 * @param {*} res 
 */    
const obtienedente = async(req, res) =>{
    const cod_denuncia = req.params.cod_denuncia
    const query = {
        text: `select md.cod_caso, mdp.id_denuncia , mdp.tipo_denunciante, cp.primer_apellido, cp.segundo_apellido, cp.nombres,
        cp.direccion, pc.nombre, md.cod_caso 
        from sinna_mid.mid_denuncias_personas mdp
        inner join comun.com_personas cp on mdp.id_persona = cp.id_persona 
        inner join sinna_mid.mid_denuncias md on mdp.id_denuncia  = md.id_denuncia  
        inner join parametricas.par_clasificador pc on mdp.tipo_denunciante  = pc.id_parametro 
        where md.id_denuncia = $1 and tipo_denunciado is null`,
        values:[cod_denuncia]
            };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows
            //console.log(resultado)
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
    }

/**
 * TODO: Implementar la funcion en la base de datos para obtener los datos para impresión de denuncia
 * @param {*} req 
 * @param {*} res 
 */    
const obtienedatosPrint = async(req, res) =>{
    const cod_denuncia = req.params.cod_denuncia
    console.log("El codigo de denuncia es:", cod_denuncia)
    const query = {
        text: `select md.id_denuncia, md.cod_caso, md.id_defensoria, md.id_persona, md.fecha_denuncia, md.caso,
		md.tipologia_denuncia, md.tipologia_denuncia_sec, cpd.direccion, cpd.telefono, 
        cp.convencional, cp.primer_apellido, cp.segundo_apellido, cp.nombres, cpd.tipo_vulnerabilidad, 
        cpd.tipo_vive_con, cp.fecha_nac, cpd.edad_estimada, cp.sexo, md2.descripcion as defensoria,
        pc3.nombre as genero, pt.nombre as municipio
        from sinna_mid.mid_denuncias md 
        inner join comun.com_personas cp on md.id_persona = cp.id_persona 
        inner join comun.com_personas_detalle cpd on cp.id_persona = cpd.id_persona 
        inner join sinna_mid.mid_defensorias md2 on md.id_defensoria = md2.id_defensorias 
        inner join parametricas.par_territorial pt on md2.municipio  = pt.id_parametro 
        inner join parametricas.par_clasificador pc3 on pc3.id_parametro=cp.sexo
        where md.id_denuncia =  $1`,
        values:[cod_denuncia]
            };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows
            //console.log(resultado)
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
    }

/**
 * TODO: Implementar procedimiento para Guardar (Gestionar los familiares) familiares en función a las denucias
 * @param {*} req 
 * @param {*} res 
 */
const guardaFam= async (req, res) => {
    const {
        nna,id_persona,relacion_familiar,id_centro,direccion,latitud,longitud,telefono,observaciones
    } = req.body
    
    const query = {
        text: `insert into comun.com_familiares_hermanos
        (nna,id_persona,relacion_familiar,id_centro,direccion,latitud,longitud,telefono,observaciones)
        values($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        values:[nna,id_persona,relacion_familiar,id_centro,direccion,latitud,longitud,telefono,observaciones]
            };
    await con
        .query(query)
        .then((result) =>{
            const resultado =  result
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}
/**
 * TODO: Implementar procedimiento para Guardar (Gestionar los familiares) familiares en función a las denucias
 * @param {*} req 
 * @param {*} res 
 */
const guardaDenPer= async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body;
    console.log(v_json);
    const query = {
        text: `call sinna_mid.p_denuncias_personas($1) `,
        values:[v_json]        
    };
    await con
        .query(query)
        .then((result) =>{
            const resultado =  result
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}

module.exports = {
    getParametrosDenuncia, 
    gestionDenuncias, 
    obtieneDenuncias,
    obtieneDen,
    obtieneFamiliares,
    guardaFam,
    obtienedendo,
    obtienedente,
    obtienedatosPrint,
    guardaDenPer
}