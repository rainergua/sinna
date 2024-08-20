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


const listarCasosEstado = async (req, res) => {
    const dna = req.params.id;
    const estado = req.params.est;
    const ci=req.user.ci;
    const query = {
        text: `select * from sinna_mid.f_listar_casos_estado($1,$2,$3)`,
        values:[estado,ci, dna]
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows
            res.status(200).json({
                datos: resultado,
                mensaje:"Se obtuvo con éxito los casos solicitados",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}

const comboCasosAgrupar = async (req, res) => {
    const dna = req.params.dna;
    const id = req.params.id;
    const query = {
        text: `select * from sinna_mid.f_combo_casos($1,$2)`,
        values:[dna,id]
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows
            res.status(200).json({
                datos: resultado,
                mensaje:"Se obtuvo los casos que se pueden agrupar",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}

const listarPersonasCasos = async (req, res) => {
    const c = req.params.c;
    const t = req.params.t;
    const query = {
        text: `select * from sinna_mid.listar_personas_caso_den($1,$2)`,
        values:[c,t]
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows
            res.status(200).json({
                datos: resultado,
                mensaje:"Se obtuvo con las personas involucradas",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}

const gestionPersonasCaso = async (req, res) => {

    req.body.ci_usuario = req.user.ci;
    const v_json = req.body;
    const query = {
        text: `call sinna_mid.p_gestion_casos_persona($1) `,
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
    listarCasosEstado,
    comboCasosAgrupar,
    listarPersonasCasos,
    gestionPersonasCaso
}