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

const obtieneDnasMunicipio = async (req, res) => {
    const id_municipio = req.params.id
    const query = {
        text: `select * from sinna_mid.listar_dnas_municipios($1) `,
        values:[id_municipio]
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

const obtieneMunDpto = async (req, res) => {
    const dpto = req.params.id
    const query = {
        text: `select * from parametricas.f_listar_depto_municipio($1) `,
        values:[dpto]
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

const obtenerPoblacionAtiende = async (req, res) => {
    const query = {
        text: `select * from sinna_mospa.f_combos_parametricas(404) `,

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
    const id_parametro_padre = req.params.id;

    const query = {
        text: `select *, id_parametro as id, nombre as value from parametricas.f_listar_parametricas($1) `,
        values:[id_parametro_padre]
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;

            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Parametros obtenidos correctamente",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const listaCdaTerritorio = async (req, res) => {
    const id = req.params.id;
    const t=req.params.tipo;

    const query = {
        text: `select * from sinna_modefa.f_listar_cda_dpto_mun($1,$2) `,
        values:[id,t]
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;

            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"CDAs obtenidos correctamente",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const listaCentrosMospaDpto = async (req, res) => {
    const id = req.params.id;
    const t=req.params.tipo;

    const query = {
        text: `select * from sinna_mospa.f_listar_centros_dpto($1,$2) `,
        values:[id,t]
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;

            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Centros MOSPA obtenidos correctamente",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const listarJuzgados = async (req, res) => {
    const query = {
        text: `select * from sinna_mospa.f_listar_juzgados() `
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;

            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Juzgados obtenidos correctamente",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}
const obtenerCdaGralCombo = async (req, res) => {
    const query = {
        text: `select * from parametricas.f_obtener_cda_combo_gral() `,

    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows
            const resultado =  result.rows
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"CDA obtenidos correctamente",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}

module.exports = {
    obtieneParam,
    obtieneDepto,
    obtieneMun,
    obtieneProv,
    obtieneMunDpto,
    obtenerPoblacionAtiende,
    obtieneDnasMunicipio,
    listaCdaTerritorio,
    listaCentrosMospaDpto,
    listarJuzgados,
    obtenerCdaGralCombo
}