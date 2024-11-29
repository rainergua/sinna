

const con = require('../../infraestructure/config/config');

/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */
const listarLineamientos = async (req, res) => {
    let estado=req.params.est;
    const query = {
        text: `select * from sinna_modipi.f_listar_lineamientos_estrategicos($1)`,
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
                mensaje:"Se obtuvo el listado de lineamientos estrategicos correctamente",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}



const gestionLineamientos = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body
    const query = {
        text: `call sinna_modipi.p_gestion_lineamientos($1) `,
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
    listarLineamientos,
    gestionLineamientos,
}