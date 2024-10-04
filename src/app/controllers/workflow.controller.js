const jwt = require('jsonwebtoken');

const con = require('../../infraestructure/config/config');
const bcrypt = require("bcrypt");

/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */
const listarTransacciones = async (req, res) => {

    const query = {
        text: `select * from workflow.f_obtener_lista_transacciones('${req.user.ci}', '${req.body.tabla}', '${req.body.estado}') `,
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            //console.log(resultado)
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
        text: `select * from workflow.f_obtener_lista_menu('${req.user.ci}', '${req.body.modulo}') `,
    };

    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            //console.log(resultado)
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
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Modulos obtenidos",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const listarModulos = async (req, res) => {
    //console.log(req.user)
    const query = {
        text: `select * from workflow.f_listar_modulos() `,
    };

    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Modulos obtenidos",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const gestionUsuarios = async (req, res) => {
    const bcrypt=require('bcrypt');
    req.body.ci_usuario = req.user.ci;
    if(req.body.password) {
        req.body.password=await bcrypt.hash(req.body.password,10);
    }
    const v_json = req.body;
    const query = {
        text: `call workflow.p_gestion_usuarios($1) `,
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

const listarUsuariosEstado = async (req, res) => {

    const query = {
        text: `select * from workflow.f_listar_usuarios_estado('{ "estado":"${req.body.estado}", "modulo":"${req.body.modulo}"}') `,

    };

    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Lista de usuarios obtenido.",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const subirDocumentosUsuario = async (req, res) => {
    try {
        if(typeof req.files['url_contrato_pdf']!== 'undefined')
            req.body.url_contrato_pdf = req.files['url_contrato_pdf'][0].filename;


        if(typeof req.files['url_foto_memo']!== 'undefined')
            req.body.url_foto_memo = req.files['url_foto_memo'][0].filename;


        if(typeof req.files['url_foto_ci']!== 'undefined')
            req.body.url_foto_ci = req.files['url_foto_ci'][0].filename;

        if(typeof req.files['url_foto_ddjj']!== 'undefined')
            req.body.url_foto_ddjj = req.files['url_foto_ddjj'][0].filename;
        req.body.ci_usuario = req.user.ci;
        const v_json = req.body;
        const query = {
            text: `call workflow.p_gestion_usuarios($1) `,
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
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

const subirContrato = async (req, res) => {
    try {
        console.log(req.file);
        if (typeof req.file !== 'undefined')
            req.body.url_contrato_pdf = req.file.filename;

        req.body.ci_usuario = req.user.ci;

        const v_json = req.body;
        const query = {
            text: `call workflow.p_gestion_usuarios($1) `,
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
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

const combrobarCiUsuario = async (req, res) => {
    //console.log(req.user)
    const ci=req.params.ci;

    const query = {
        text: `select * from workflow.f_comprobar_ci_usuario($1) `,
        values:[ci]
    };

    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"CI consultado",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const obtenerDocsUsr = async (req, res) => {
    //console.log(req.user)
    const ci=req.params.ci;
    const query = {
        text: `select * from workflow.f_obtener_documentos_usr($1) `,
        values:[ci]
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Documentos usuario obtenidos.",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const obtenerUsuarioCI = async (req, res) => {
    const ci=req.user.ci;
    const query = {
        text: `select * from workflow.f_obtener_usuario_ci($1) `,
        values:[ci]
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Datos obtenidos del usuario",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const obtenerUsuarioConsulta = async (req, res) => {
    const ci=req.params.ci;
    const id=req.params.id;
    const query = {
        text: `select * from workflow.f_obtener_usuario_ciid($1,$2) `,
        values:[ci,id]
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Datos consultados del usuario",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}



module.exports = {
    listarTransacciones,
    listarMenus,
    obtenerModulos,
    listarModulos,
    gestionUsuarios,
    listarUsuariosEstado,
    subirDocumentosUsuario,
    combrobarCiUsuario,
    subirContrato,
    obtenerDocsUsr,
    obtenerUsuarioCI,
    obtenerUsuarioConsulta
}