const jwt = require('jsonwebtoken');

const con = require('../../infraestructure/config/config');

/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */
const listarParametricas = async (req, res) => {

    const query = {
        text: `select * from parametricas.f_listar_parametricas('${req.body.id_parametro_padre}') `,

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

const listarDepartamentos = async (req, res) => {

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
}

module.exports = {
    listarDepartamentos,
    listarProvincias,
    listarMunicipios,
    listarParametricas
}