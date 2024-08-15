const con = require("../../infraestructure/config/config");

const comboExpediente = async (req, res) => {
    const id = req.params.id
    const query = {
        text: `select id, nna_caso as value from sinna_modefa.f_buscar_nna_expediente($1) `,
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

const obtenerDatosBase = async (req, res) => {
    const id = req.params.id
    const query = {
        text: `select * from sinna_modefa.f_datos_generales_expediente_nna($1) `,
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

const gestionExpediente = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body;
    const query = {
        text: `call sinna_modefa.p_gestion_expedientes($1) `,
        values:[v_json]
    };
    await con
        .query(query)
        .then((result) =>{
            const resultado =  result.rows[0];
            console.log('Consulta', query);
            res.status(200).json({
                result: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const listaExpediente = async (req, res) => {
    const id = req.params.id
    const tipo_doc = req.params.tipo
    const query = {
        text: `select * from sinna_modefa.f_mostrar_expediente_modefa($1,$2) `,
        values:[id, tipo_doc]
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
    obtenerDatosBase,
    gestionExpediente,
    comboExpediente,
    listaExpediente
}