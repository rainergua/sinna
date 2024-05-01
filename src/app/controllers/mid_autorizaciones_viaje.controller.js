

const con = require('../../infraestructure/config/config');

/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */

const gestionAutorizacionesViaje = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body;
    const query = {
        text: `call sinna_mid.p_gestion_autorizaciones_viaje($1) `,
        values:[v_json]
    };
    await con
        .query(query)
        .then((result) =>{
            const resultado =  result.rows[0];
            res.status(200).json({
                result: resultado,

            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const subirFotoPadre = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    if (typeof req.file !== 'undefined')
        req.body.url_ci_padre = req.file.filename;
    //console.log(req.body);
    const v_json = req.body;
    const query = {
        text: `call sinna_mid.p_gestion_autorizaciones_viaje($1) `,
        values:[v_json]
    };
    await con
        .query(query)
        .then((result) =>{
            const resultado =  result.rows[0];
            res.status(200).json({
                result: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const subirFotoMadre = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    if (typeof req.file !== 'undefined')
        req.body.url_ci_madre = req.file.filename;
    //console.log(req.body);
    const v_json = req.body;
    const query = {
        text: `call sinna_mid.p_gestion_autorizaciones_viaje($1) `,
        values:[v_json]
    };
    await con
        .query(query)
        .then((result) =>{
            const resultado =  result.rows[0];
            res.status(200).json({
                result: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const subirFotoTutor = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    if (typeof req.file !== 'undefined')
        req.body.url_ci_tutor = req.file.filename;
    //console.log(req.body);
    const v_json = req.body;
    const query = {
        text: `call sinna_mid.p_gestion_autorizaciones_viaje($1) `,
        values:[v_json]
    };
    await con
        .query(query)
        .then((result) =>{
            const resultado =  result.rows[0];
            res.status(200).json({
                result: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}


const obtenerAutorizacionViaje = async (req, res) => {
    try {
        const id = req.params.id;
        const datos = await con.query(`select * from sinna_mid.f_obtener_autorizacion_viaje($1)`, [id]);
        res.status(200).json({
            datoAdicional: datos.rows,
            mensaje:"Se obtuvo el registro de la solicitud correctamente.",
            cod:200,
        });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

const obtenerPersonasAutViaje = async (req, res) => {
    try {
        const datos = await con.query(`select * from sinna_mid.f_obtener_personas_autorizacion_viaje('${req.params.tipo}',${req.params.id})`);
        res.status(200).json({
            datoAdicional: datos.rows,
            mensaje:"Se obtuvo la lista de personas correctamente.",
            cod:200,
        });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

const listarAutorizacionesViajeDna = async (req, res) => {

    const query = {
        text: `select * from sinna_mid.f_listar_autorizaciones_viaje('{ "estado":"${req.body.estado}","ci_usuario":"${req.user.ci}" }') `,
    };

    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Se obtuvo el listado de centros correctamente",
                cod:200,
                correcto:true
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}
module.exports = {
    gestionAutorizacionesViaje,
    obtenerAutorizacionViaje,
    obtenerPersonasAutViaje,
    listarAutorizacionesViajeDna,
    subirFotoPadre,
    subirFotoMadre,
    subirFotoTutor
}