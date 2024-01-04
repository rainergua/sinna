const jwt = require('jsonwebtoken');

const con = require('../../infraestructure/config/config');

/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */
const gestionDefensoria = async (req, res) => {
    const v_json = req.body.v_json
    console.log(v_json)
    const query = {
        text: `call sinna_mid.p_gestion_defensorias($1) `,
        values:[v_json]
            };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  {rows: result.rows, fields: result.fields}
            //console.log(resultado)
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}
/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */
const obtieneDepto = async (req, res) => {
    const query = {
        text: `select * from parametricas.f_listar_departamentos()`,
            };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            console.log(con)
            const resultado =  result.rows
            //console.log(resultado)
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}
/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */
const obtieneProv = async (req, res) => {
    const cod_depto = req.params.id
    console.log(cod_depto)
    const query = {
        text: `select * from parametricas.f_listar_provincias($1) `,
        values:[cod_depto]
            };
    console.log(query)
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
const getToken = async(req, res) =>{
    try {
    const token = jwt.sign({
      }, process.env.JWT_SECRET);
      res.status(200).json({
        accessToken: token
      })}
      catch (err){
        console.log(err)
        res.status(500).json({
            message: "Internal server error"
          });
      }
}
module.exports = {
    gestionDefensoria, 
    obtieneDepto, 
    obtieneProv,
    getToken
}