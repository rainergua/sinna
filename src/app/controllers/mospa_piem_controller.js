const con = require("../../infraestructure/config/config");


const comboCasosSinPiem = async (req, res) => {
    const id = req.params.id
    const query = {
        text: `select * from sinna_mospa.f_combo_casos_sin_piem($1) `,
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


const gestionPiem = async (req, res) => {

    req.body.ci_usuario = req.user.ci;
    const v_json = req.body;
    const query = {
        text: `call sinna_mospa.p_gestion_piem($1) `,
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

const listaPiem = async (req, res) => {
    const id = req.params.id
    const query = {
        text: `select * from sinna_mospa.f_listar_piem($1) `,
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
    comboCasosSinPiem,
    gestionPiem,
    listaPiem
}