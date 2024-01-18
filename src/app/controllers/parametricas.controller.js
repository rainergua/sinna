const jwt = require('jsonwebtoken');

const con = require('../../infraestructure/config/config');

const obtieneDepto = async (req, res) => {
    const query = {
        text: `select *, id_parametro as id, nombre as value from parametricas.f_listar_departamentos()`,
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

const obtieneProv = async (req, res) => {
    const cod_depto = req.params.id
    const query = {
        text: `select *, id_parametro as id, nombre as value from parametricas.f_listar_provincias($1) `,
        values:[cod_depto]
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
const obtieneMun = async (req, res) => {
    const cod_prov = req.params.id
    const query = {
        text: `select *, id_parametro as id, nombre as value from parametricas.f_listar_municipios($1) `,
        values:[cod_prov]
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

const obtieneParam = async (req, res) => {
    const id_parametro_padre = req.params.id
    const query = {
        text: `select * from parametricas.f_listar_parametricas($1) `,
        values:[id_parametro_padre]
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Parametros obtenidos correctamente",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

/*const listarDepartamentos = async (req, res) => {

    const query = {
        text: `select * from parametricas.f_listar_departamentos() `,
    };

    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Departamentos obtenidos",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const listarProvincias = async (req, res) => {

    const query = {
        text: `select * from parametricas.f_listar_provincias('${req.body.id_departamento}') `,
    };

    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Provincias obtenidos",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const listarMunicipios = async (req, res) => {

    const query = {
        text: `select * from parametricas.f_listar_municipios('${req.body.id_provincia}') `,
    };

    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Municipios obtenidos",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}*/

module.exports = {
    obtieneParam,
    obtieneDepto,
    obtieneMun,
    obtieneProv,
}