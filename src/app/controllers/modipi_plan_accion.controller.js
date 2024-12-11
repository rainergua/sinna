

const con = require('../../infraestructure/config/config');

/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */
const listarPlanAccion = async (req, res) => {
    let estado=req.params.est;
    const query = {
        text: `select * from sinna_modipi.f_listar_planes_accion($1)`,
        values:[estado],
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Se obtuvo los Planes de Accion correctamente",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}



const gestionPlanAccion = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body
    const query = {
        text: `call sinna_modipi.p_gestion_plan_accion($1) `,
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

const aprobarPlanAccion = async (req, res) => {
    try {
        if(typeof req.files['url_acta_subconsejo_aprobacion']!== 'undefined')
            req.body.url_acta_subconsejo_aprobacion = req.files['url_acta_subconsejo_aprobacion'][0].filename;
        req.body.ci_usuario = req.user.ci;
        const v_json = req.body;

        const query = {
            text: `call sinna_modipi.p_gestion_plan_accion($1) `,
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
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

const lstarConfigPlanAccion = async (req, res) => {
    let id=req.params.id;
    const query = {
        text: `select * from sinna_modipi.f_listar_configuracion_plan_accion($1)`,
        values:[id],
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Configuración obtenida",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

module.exports = {
    listarPlanAccion,
    gestionPlanAccion,
    aprobarPlanAccion,
    lstarConfigPlanAccion
}