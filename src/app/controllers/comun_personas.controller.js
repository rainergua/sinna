const jwt = require('jsonwebtoken');

const con = require('../../infraestructure/config/config');

const parametricasPersona = async (req, res) => {
    try {
        //console.log(req.user);
        const tipo_fecha_nac = await con.query(`select * from sinna_modefa.f_combos_parametricas(18)`);
        const ci_exp = await con.query(`select * from sinna_modefa.f_combos_parametricas(21)`);
        const vulnerabilidad = await con.query(`select * from sinna_modefa.f_combos_parametricas(31)`);
        const sexo = await con.query(`select * from sinna_modefa.f_combos_parametricas(15)`);
        const instruccion = await con.query(`select * from sinna_modefa.f_combos_parametricas(231)`);
        const e_civil = await con.query(`select * from sinna_modefa.f_combos_parametricas(244)`);
        const ocupacion = await con.query(`select * from sinna_modefa.f_combos_parametricas(249)`);
        const vive_con = await con.query(`select * from sinna_modefa.f_combos_parametricas(299)`);

        res.status(200).json({
            datoAdicional: {
                tipo_fecha_nac: tipo_fecha_nac.rows,
                ci_exp: ci_exp.rows,
                vulnerabilidad: vulnerabilidad.rows,
                sexo: sexo.rows,
                instruccion: instruccion.rows,
                e_civil: e_civil.rows,
                ocupacion: ocupacion.rows,
                vive_con: vive_con.rows
            },
            mensaje:"Parámétricas obtenidas con éxito",
            cod:200}
        );
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

// Gestión de las personas
const gestionPersona = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body;
    //console.log(v_json);
    const query = {
        text: `call comun.p_personas($1) `,
        values:[v_json]        
    };
    await con
        .query(query)
        .then((result) =>{
            const resultado =  result.rows;
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Gestión de personas establecida con éxito",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}

const gestionPersonasDetalle = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body
    const query = {
        text: `call comun.p_personas($1) `,
        values:[v_json]
    };
    await con
        .query(query)
        .then((result) =>{
            const resultado =  result.rows[0];
            //console.log(resultado);
            res.status(200).json({
                result: resultado,

            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

// Listar a las personas registradas en el SINNA
const mostrarPersona = async (req, res) => {
    try {
        const listado = await con.query(`select * from comun.f_mostrar_personas()`);
        res.status(200).json({ 
            datoAdicional: listado.rows,
            mensaje:"Lista de personas registradas en el SINNA",
            cod:200 
        });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

// Listar a las personas registradas en el SINNA
const mostrarPersonaCI = async (req, res) => {
    try {
        let cip = req.body.ci;
        const listado = await con.query(`select * from comun.f_mostrar_persona_ci($1)`,[cip]);
        res.status(200).json({ 
            datoAdicional: listado.rows,
            mensaje:"Datos de la persona obtenidos por el CI",
            cod:200 
        });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

const getBuscarPersona = async (req, res) => {
    try {
        let buscar = req.params.buscar;
        const datos = await con.query(`select * from comun.f_buscar_persona($1)`, [buscar]);
        res.status(200).json({ 
            datoAdicional: datos.rows,
            mensaje:"Buscar personas",
            cod:200
        });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

module.exports = {
    parametricasPersona, 
    gestionPersona,
    mostrarPersona,
    mostrarPersonaCI,
    getBuscarPersona,
    gestionPersonasDetalle
}