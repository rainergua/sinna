const jwt = require('jsonwebtoken');

const con = require('../../infraestructure/config/config');

/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */
const gestionDefensoria = async (req, res) => {
    const v_json = req.body
    //console.log(v_json)
    const query = {
        text: `call sinna_mid.p_centro_dna($1) `,
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
 * 
 * @param {*} req 
 * @param {*} res 
 */
const obtieneDefensorias = async (req, res) => {
    const query = {
        text: `select * from sinna_mid.listar_dnas() order by id_defensorias`
            };
    //console.log(query)
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows
            console.log(result)
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
const obtieneDef= async (req, res) => {
    const id_def = req.params.id
    const query = {
        text: `select * from sinna_mid.listar_centros_dna($1)`,
        values:[id_def]
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
    obtieneDefensorias,
    obtieneDef,
    getToken
}