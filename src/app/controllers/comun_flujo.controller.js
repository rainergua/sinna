const con = require('../../infraestructure/config/config');


const listarFlujos = async (req, res) => {
    const modulo = req.params.m;
    const estado = req.params.e;

    const query = {
        text: `select * from comun.f_listar_flujos($1,$2) `,
        values:[modulo, estado]
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows
            const resultado =  result.rows
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}

const gestionFlujos = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    if (typeof req.file !== 'undefined')
        req.body.url_imagen_flujo = req.file.filename;
    const v_json = req.body
    const query = {
        text: `call comun.p_gestion_flujos($1) `,
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
    listarFlujos,
    gestionFlujos
}