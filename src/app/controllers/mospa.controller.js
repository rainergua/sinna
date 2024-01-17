const jwt = require('jsonwebtoken');

const con = require('../../infraestructure/config/config');

/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */
const listarCentros = async (req, res) => {

    const query = {
        text: `select * from sinna_mospa.f_listar_centros('{ "tipo_centro":${req.body.tipo_centro},"alcance":${req.body.alcance},"estado":"${req.body.estado}","ci_usuario":"${req.user.ci}" }') `,

    };

    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Se obtuvo el listado de centros correctamente",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const gestionCentros = async (req, res) => {

    const query = {
        text: `call sinna_mospa.p_gestion_centros('{ "json":${req.body.datos} }') `,

    };

    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Procesado correctamente",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

module.exports = {
    listarCentros,
    gestionCentros

}