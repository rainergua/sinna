

const con = require('../../infraestructure/config/config');

/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */
const listarPlan = async (req, res) => {
    let resp=req.params.resp;
    let id=req.params.id;
    const query = {
        text: `select * from sinna_modipi.f_listar_plan_resp($1,$2)`,
        values:[resp,id],
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Se obtuvo los datos del plan de la institución",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}



const gestionPlan = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body
    const query = {
        text: `call sinna_modipi.p_gestion_planes($1) `,
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

const listResultadosPlan = async (req, res) => {
    let r=req.params.resp;
    let p=req.params.plan;
    const query = {
        text: `select * from sinna_modipi.f_listar_resultados_lineas_lineamientos($1,$2)`,
        values:[r,p],
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Planificacion de resultados obtenida",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const getComboPlanAccion = async (req, res) => {

    const query = {
        text: `select id_plan_accion as id , nombre_planificacion as value from sinna_modipi.f_listar_planes_accion($1)`,
        values:['PLANIFICANDO'],
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

module.exports = {
    listarPlan,
    gestionPlan,
    listResultadosPlan,
    getComboPlanAccion
}