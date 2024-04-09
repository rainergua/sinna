

const con = require('../../infraestructure/config/config');

/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */

const gestionAutorizacionesViaje = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body;
    console.log(req.body);
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
            cod:200
        });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

/*const listarDocumentos = async (req, res) => {
    //console.log(req.body);


    const query = {
        text: `select * from documentos.f_listar_plantillas('{ "modulo":"${req.body.modulo}","estado":"${req.body.estado}"}') `,
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Se obtuvo el listado de documentos del modulo " + req.body.modulo,
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}


const listarTablasTransaccionales = async (req, res) => {
    try {
        const m = req.params.modulo;
        const datos = await con.query(`select * from workflow.f_obtener_tablas_modulo($1)`, [m]);
        res.status(200).json({
            datoAdicional: datos.rows,
            mensaje:"Se obtuvo las tablas transaccionales del módulo.",
            cod:200
        });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

const listarTransaccionesTabla = async (req, res) => {
    try {
        const id = req.params.id;
        const datos = await con.query(`select * from workflow.f_obtener_transacciones_tabla($1)`, [id]);
        res.status(200).json({
            datoAdicional: datos.rows,
            mensaje:"Se obtuvo las transacciones de la tabla.",
            cod:200
        });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}


const gestionDocumentos = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body;
    console.log(req.body);
    const query = {
        text: `call documentos.p_gestion_plantillas($1) `,
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

const obtenerCamposDocumentos = async (req, res) => {
    try {
        const id = req.params.id;
        const datos = await con.query(`select * from documentos.f_campos_planillas($1)`, [id]);
        res.status(200).json({
            datoAdicional: datos.rows,
            mensaje:"Se obtuvo los campos de las plantillas.",
            cod:200
        });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

const obtenerCamposTabla = async (req, res) => {
    try {
        const t = req.params.tabla;
        const datos = await con.query(`SELECT c.ordinal_position as id, c.column_name as value FROM information_schema.columns c WHERE table_name = ($1)`, [t]);
        res.status(200).json({
            datoAdicional: datos.rows,
            mensaje:"Se obtuvo los campos de las plantillas.",
            cod:200
        });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}*/

module.exports = {
    gestionAutorizacionesViaje,
    obtenerAutorizacionViaje
}