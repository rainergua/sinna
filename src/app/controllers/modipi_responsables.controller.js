

const con = require('../../infraestructure/config/config');

/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */
const listarResponsables = async (req, res) => {
    let estado=req.params.est;
    const query = {
        text: `select * from sinna_modipi.f_listar_responsables_modipi($1)`,
        values:[estado],
    };

    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Se obtuvo el listado de centros correctamente",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const comboResponsablesPadre = async (req, res) => {
    let id=req.params.id;
    let tipo=req.params.t;
    const query = {
        text: `select * from sinna_modipi.f_combo_responsables_modipi($1,$2)`,
        values:[id,tipo],
    };

    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Se obtuvo el listado de centros correctamente",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}


const gestionResponsables = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body
    const query = {
        text: `call sinna_modipi.p_gestion_responsables_modipi($1) `,
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



const listarResponsablesUsuario = async (req, res) => {
    try {
        //const id = req.params.id;
        const ci = req.user.ci;
        const datos = await con.query(`select * from sinna_modipi.f_listar_resposables_acceso_modipi($1)`, [ci]);
        res.status(200).json({
            datoAdicional: datos.rows,
            mensaje:"Se obtuvo los responsables de acceso del usuario.",
            cod:200
        });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

module.exports = {
    listarResponsables,
    gestionResponsables,
    listarResponsablesUsuario,
    comboResponsablesPadre
}