const con = require('../../infraestructure/config/config');

/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */

const listarAutorizacionesTrabajo = async (req, res) => {
  const query = {
    text: `select * from sinna_mid.f_listar_autorizaciones_trabajo('{ "estado":"${req.body.estado}","ci_usuario":"${req.user.ci}" }')`,
  };
  await con
    .query(query)
    .then((result) =>{
      //formateamos el resultado para que retorne solo Rows y Fields
      const resultado =  result.rows;
      res.status(200).json({
        datoAdicional: resultado,
        mensaje:"Se obtuvo el listado autorizaciones de trabajo",
        cod:200,
        correcto:true
      })}
    )
    .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

module.exports = {
  listarAutorizacionesTrabajo,
}