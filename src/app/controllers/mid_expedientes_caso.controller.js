const con = require("../../infraestructure/config/config");

const gestionExpedienteMid = async (req, res) => {

    req.body.ci_usuario = req.user.ci;
    const v_json = req.body;
    const query = {
        text: `call sinna_mid.p_gestion_expediente_caso_mid($1) `,
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

const listaExpedientesMid = async (req, res) => {
    const id = req.params.id
    const t = req.params.tipo
    const query = {
        text: `select * from sinna_mid.f_listar_expedientes_caso_mid($1,$2) `,
        values:[id, t]
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

module.exports = {
    listaExpedientesMid,
    gestionExpedienteMid
}