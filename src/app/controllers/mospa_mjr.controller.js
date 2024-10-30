const con = require("../../infraestructure/config/config");


const comboCasosSinMjr = async (req, res) => {
    const id = req.params.id
    const query = {
        text: `select * from sinna_mospa.f_combo_casos_sin_mjr($1) `,
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


const gestionMjr = async (req, res) => {

    req.body.ci_usuario = req.user.ci;
    const v_json = req.body;
    const query = {
        text: `call sinna_mospa.p_gestion_mjr($1) `,
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

const listaMjr = async (req, res) => {
    const id = req.params.id
    const gad = req.params.gad
    const query = {
        text: `select * from sinna_mospa.f_listar_mjr($1,$2) `,
        values:[id,gad]
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
    comboCasosSinMjr,
    gestionMjr,
    listaMjr,

}