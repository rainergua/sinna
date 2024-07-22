const con = require("../../infraestructure/config/config");


const comboCasosSinPostEgreso = async (req, res) => {
    const query = {
        text: `select * from sinna_mospa.f_combo_casos_egresados_sin_post_egreso()`,
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


const gestionPostEgreso = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body;
    const query = {
        text: `call sinna_mospa.p_gestion_post_egreso($1) `,
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

const listaPostEgreso = async (req, res) => {
    const id = req.params.id
    const query = {
        text: `select * from sinna_mospa.f_listar_post_egresos($1) `,
        values:[id]
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

const listaSeguimientosPostEgreso = async (req, res) => {
    const id = req.params.id
    const query = {
        text: `select * from sinna_mospa.f_listar_seguimientos_post_egreso($1) `,
        values:[id]
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

const gestionSeguimientoPostEgreso = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body;
    const query = {
        text: `call sinna_mospa.p_gestion_seguimiento_post_egreso($1) `,
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
    comboCasosSinPostEgreso,
    gestionPostEgreso,
    listaPostEgreso,
    listaSeguimientosPostEgreso,
    gestionSeguimientoPostEgreso
}