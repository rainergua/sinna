

const con = require('../../infraestructure/config/config');

/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */
const listarCentros = async (req, res) => {

    const query = {
        text: `select * from sinna_mospa.f_listar_centros('{ "tipo_centro":${req.body.tipo_centro},"estado":"${req.body.estado}","ci_usuario":"${req.user.ci}" }') `,

    };

    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Se obtuvo el listado de centros correctamente",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}



const datosCentro = async (req, res) => {
    try {
        const id = req.params.id;
        const datos = await con.query(`select * from sinna_mospa.f_obtener_centro($1)`, [id]);
        res.status(200).json({
            datoAdicional: datos.rows,
            mensaje:"Se obtuvo los datos del centro al que ingreso.",
            cod:200
        });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

const gestionCentros = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body
    const query = {
        text: `call sinna_mospa.p_gestion_centros($1) `,
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

const obtenerTerritorioUsr = async (req, res) => {
    const ci = req.user.ci;
    const query = {
        text: `select * from sinna_mospa.f_obtener_territorio_usr($1) `,
        values:[ci]
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
    listarCentros,
    gestionCentros,
    obtenerTerritorioUsr,
    datosCentro
}