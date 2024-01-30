const con = require('../../infraestructure/config/config');

/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */
const gestionDefensoria = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body
    console.log(v_json)
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
const updFileDef = async (req, res) => {
    const v_json = req.body
    console.log(v_json)
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

const obtieneUsuarioDefensoria = async (req, res) =>{
    ci_usuario = req.user.ci;
    const query = {
        text: `select wu.ci_usuario, wu.id_usuario, md.id_defensorias, md.departamento as id_depto, md.municipio as id_muni, 
        md.descripcion, md.responsable, md.telefono, pt.nombre as departamento, pt2.nombre as municipio, md.latitud, md.longitud 
        from workflow.wf_usuario wu 
        inner join workflow.wf_usuarios_centros wuc 
        on wu.id_usuario = wuc.id_usuario 
        inner join sinna_mid.mid_defensorias md 
        on wuc.id_centro = md.id_defensorias and wuc.modulo ilike 'mid'
        inner join parametricas.par_territorial pt 
        on md.departamento = pt.id_parametro 
        inner join parametricas.par_territorial pt2
        on md.municipio = pt2.id_parametro 
        where wu.ci_usuario =$1`,
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

module.exports = {
    gestionDefensoria, 
    obtieneDefensorias,
    obtieneDef,
    updFileDef,
    obtieneUsuarioDefensoria
}