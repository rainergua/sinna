const jwt = require('jsonwebtoken');

const con = require('../../infraestructure/config/config');

/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */
const getParametrosDenuncia = async (req, res) => {
    try {
        const tipo_denuncia = await con.query(`select id_parametro as id, descripcion as value from parametricas.f_listar_parametricas(61) order by descripcion`);
        const poblacion_vulnerable = await con.query(`select id_parametro as id, nombre as value from parametricas.f_listar_parametricas(31)`);
        const sexo = await con.query(`select id_parametro as id, descripcion as value from parametricas.f_listar_parametricas(15)`);
        const vive_con = await con.query(`select id_parametro as id, nombre as value from parametricas.f_listar_parametricas(299)`);
        const relacion_denuncia = await con.query(`select id_parametro as id, nombre as value from parametricas.f_listar_parametricas(159)`);
        const relacion_familiar = await con.query(`select id_parametro as id, nombre as value from parametricas.f_listar_parametricas(39)`);
        const tipo_fec_nac = await con.query(`select id_parametro as id, nombre as value from parametricas.f_listar_parametricas(18)`);
        const tipo_denunciante = await con.query(`select id_parametro as id, nombre as value from parametricas.f_listar_parametricas(152)`);
        const tipo_denunciado = await con.query(`select id_parametro as id, nombre as value from parametricas.f_listar_parametricas(156)`);
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
    const v_json = req.body
    //console.log(v_json)
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
        text: `select * from sinna_mid.listar_denuncias() order by id_denuncia`
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
    const id_def = req.params.id
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
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getPersonaDenuncia= async(req, res) => {
    const query = {
        text: `select * from comun.com_personas`
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
    getParametrosDenuncia, 
    gestionDenuncias, 
    obtieneDenuncias,
    obtieneDen,
    getPersonaDenuncia
}