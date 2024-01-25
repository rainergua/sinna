const jwt = require('jsonwebtoken');

const con = require('../../infraestructure/config/config');

const parametricasFamilia = async (req, res) => {
    try {
        //console.log(req.user);
        const relacion_familiar = await con.query(`select * from sinna_modefa.f_combos_parametricas(39)`);

        res.status(200).json({
            datoAdicional: {
                relacion_familiar: relacion_familiar.rows,
            },
            mensaje:"Parámétricas obtenidas con éxito",
            cod:200}
        );
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

// Gestión de las relaciones familiares
const gestionFamilia = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body;
    console.log(v_json);
    const query = {
        text: `call comun.p_familiares_hermanos($1) `,
        values:[v_json]        
    };
    await con
        .query(query)
        .then((result) =>{
            const resultado =  result.rows;
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Gestión de relaciones familiares establecida con éxito",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}

// Mostrar las relaciones familiares (global)
const mostrarFamilia = async (req, res) => {
    try {
        const listado = await con.query(`select * from comun.f_mostrar_familiares()`);
        res.status(200).json({ 
            datoAdicional: listado.rows,
            mensaje:"Lista de familiares registrados en el SINNA",
            cod:200 
        });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

// Mostrar las relaciones familiares (NNA)
const mostrarFamiliaNNA = async (req, res) => {
    let nna = req.body.nna;
    //const v_json = req.body;
    console.log(nna);
    try {
        await con
            .query(`SELECT * from comun.f_mostrar_familiares_nna($1)`,[nna])
            .then((result) =>{
                const resultado =  result.rows;
                res.status(200).json({
                    datoAdicional: resultado,
                    mensaje:"Lista de familiares del NNA",
                    cod:200
                })}
            )
        }
        catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

module.exports = {
    parametricasFamilia, 
    gestionFamilia,
    mostrarFamilia,
    mostrarFamiliaNNA
}