const con = require('../../infraestructure/config/config');

/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */
const gestionDefensoria = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
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
 * @param {*} req 
 * @param {*} res 
 */
const gestionRedesReg = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body
    //console.log(v_json)
    const query = {
        text: `call sinna_mid.p_reg_redes($1) `,
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
 * @param {*} req 
 * @param {*} res 
 */
const updFileDef = async (req, res) => {
    const v_json = req.body
    //console.log(v_json)
    const query = {
        text: `select * from  sinna_mid.mid_defensorias`,
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
        text: `select * from sinna_mid.listar_dnas() order by id_defensorias desc`
            };
    //console.log(query)
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows
            //console.log(result)
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
//TODO: GENERAR LA FUNCION PARA OBTENER LAS DEFENSORIAS QUE CORRESPONDEN A UN MUNICIPIO
const getDefensoriaMuni = async(req, res) =>{
    const id_muni = req.params.id_muni
    const query = {
        text: `select id_defensorias as id, descripcion as value, * from sinna_mid.mid_defensorias md where municipio = $1`,
        values:[id_muni]
    };
    try {
        const result = await con.query(query);
        res.status(200).json({datos: result.rows,
        mensaje: "Defensorias obtenidas correctamente"})
    } catch (error) {
        res.status(500).json({msg: 'Error: ', error})
    }
    
}

const obtieneUsuarioDefensoria = async (req, res) =>{
    ci_usuario = req.user.ci;
    const query = {
        text: `select * from sinna_mid.obtieneUsuarioDefensoria($1)`,
        values:[ci_usuario]
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
const obtieneRedes = async (req, res) => {
    //const id_expediente = req.params.id_expediente
    const query = {
        text: `select * from sinna_mid.mid_reg_redes`
    };
    try {
        const result = await con.query(query);
        res.status(200).json({datos: result.rows,
        mensaje: "esta sacando los datos"})
    } catch (error) {
        res.status(500).json({msg: 'Error: ', error})
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
//TODO: ESTAMOS EN ESTE PUNTO LA DEVOLUCIÓN Y RECUPERACION DE PARAMETROS DE MUNICIPIO PARA REDESSS................
const obtieneSelMunis = async(req, res)=>{
    const munis = req.query.munis;
    //console.log('_________``````', munis)
    const munis_int = munis.map(function(item) {
        return parseInt(item, 10);
    });
    //console.log('_________``````', munis_int)
    const placeholders = munis.map((_, index) => `$${index + 1}`).join(',');
    const query = {
        text: `select distinct * from parametricas.par_territorial where id_parametro in (${placeholders})`,
        values: munis
    }
    try {
        const result = await con.query(query);
        const resultado = result.rows;
        res.status(200).json({ datos: resultado });
    } catch (error) {
        res.status(500).json({ msg: 'Error: ' + error });
    }
}

module.exports = {
    gestionDefensoria, 
    gestionRedesReg,
    obtieneDefensorias,
    getDefensoriaMuni,
    obtieneDef,
    updFileDef,
    obtieneRedes,
    obtieneSelMunis,
    obtieneUsuarioDefensoria
}