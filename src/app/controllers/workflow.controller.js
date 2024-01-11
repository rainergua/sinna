const jwt = require('jsonwebtoken');

const con = require('../../infraestructure/config/config');

/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */
const listarTransacciones = async (req, res) => {

    const query = {
        text: `select * from workflow.f_obtener_lista_transacciones('${req.body.ci_usuario}', '${req.body.tabla}', '${req.body.estado}') `,

    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Listado de transacciones obtenidas correctamente. Si no salen resultados, es porque el perfil no tiene asignada las transacciones, revisar el Workflow.",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const listarMenus = async (req, res) => {

    const query = {
        text: `select * from workflow.f_obtener_lista_menu('${req.body.ci_usuario}', '${req.body.modulo}') `,
    };

    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Menus obtenidos",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const obtenerModulos = async (req, res) => {
    //console.log(req.user)
    const query = {
        text: `select * from workflow.f_acceso_modulo('${req.user.ci}') `,
    };

    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Modulos obtenidos",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

module.exports = {
    listarTransacciones,
    listarMenus,
    obtenerModulos,
}