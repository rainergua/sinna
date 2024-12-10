

const con = require('../../infraestructure/config/config');

/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */
const listarLineasAccion = async (req, res) => {
    let estado=req.params.est;
    let id=req.params.id_resp;
    let l=req.params.l;
    const query = {
        text: `select * from sinna_modipi.f_listar_lineas_accion($1,$2,$3)`,
        values:[estado,id,l],
    };

    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Se obtuvo el listado de Lineas de Accion correctamente",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}



const gestionLineasAccion = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body
    const query = {
        text: `call sinna_modipi.p_gestion_lineas_accion($1) `,
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



module.exports = {
    listarLineasAccion,
    gestionLineasAccion,
}