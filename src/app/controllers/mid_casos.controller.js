const con = require("../../infraestructure/config/config");


const gestionCaso = async (req, res) => {

    req.body.ci_usuario = req.user.ci;
    if (typeof req.file !== 'undefined')
        req.body.url_foto_extravio = req.file.filename;
    const v_json = req.body;
    const query = {
        text: `call sinna_mid.p_gestion_casos($1) `,
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
   gestionCaso,
}