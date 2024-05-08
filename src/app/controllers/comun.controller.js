const jwt = require('jsonwebtoken');

const con = require('../../infraestructure/config/config');

const getPersonaCi= async (req, res) => {
    const ci = req.params.ci
    const query = {
        text: `select * from comun.listar_personas_ci($1)`,
        values:[ci]
            };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows
            ////console.log(resultado)
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}


const listarPersonas = async (req, res) => {

    const query = {
        text: `select * from comun.listar_personas() `,
    };

    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Personas obtenidos",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}


// Gestión de las personas
const gestionPersona = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body;
    //console.log(v_json);
    const query = {
        //text: `call comun.p_personas($1) `,
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



module.exports = {
    getPersonaCi,
    listarPersonas,
    gestionPersona
}
