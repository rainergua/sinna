const con = require("../../infraestructure/config/config");


const gestionCasoMoliv = async (req, res) => {

    req.body.ci_usuario = req.user.ci;
    if (typeof req.file !== 'undefined')
        req.body.url_foto_extravio = req.file.filename;

    const v_json = req.body;
    const query = {
        text: `call sinna_moliv.p_gestion_casos_moliv($1) `,
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
    const query = {
        text: `select * from sinna_moliv.f_listar_insertar_casos_moliv($1,$2)`,
        values:[estado,dna]
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows
            res.status(200).json({
                datos: resultado,
                mensaje:"Se obtuvo con éxito los casos MOLIV",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}


module.exports = {
    gestionCasoMoliv,
    listarCasosEstado,

}