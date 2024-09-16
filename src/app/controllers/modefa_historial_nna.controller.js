const con = require("../../infraestructure/config/config");

const historialIngresos = async (req, res) => {
    const id = req.params.id
    const query = {
        text: `select * from sinna_modefa.f_mostrar_historial_ingresos_nna($1) `,
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

const historialTransferencias = async (req, res) => {
    const id = req.params.id
    const query = {
        text: `select * from sinna_modefa.f_mostrar_historial_transferencias_nna($1) `,
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

const historialEgresos = async (req, res) => {
    const id = req.params.id
    const query = {
        text: `select * from sinna_modefa.f_mostrar_historial_egresos_nna($1) `,
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

module.exports = {
    historialIngresos,
    historialTransferencias,
    historialEgresos
}