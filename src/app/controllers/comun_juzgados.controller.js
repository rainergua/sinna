const jwt = require('jsonwebtoken');

const con = require('../../infraestructure/config/config');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const juzgadosParametricas = async (req, res) => {
    try {
        //console.log(req.user);
        const tipo_juzgado = await con.query(`select * from sinna_modefa.f_combos_parametricas(58)`);
        const territorio = await con.query(`select * from sinna_modefa.f_combos_territorial(1)`);

        res.status(200).json({
            datoAdicional: {
                tipo_juzgado: tipo_juzgado.rows,
                territorio: territorio.rows 
            },
            mensaje:"Parámétricas obtenidas correctamente",
            cod:200}
        );
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const juzgadosTerritorio = async (req, res) => {
    try {
        let id = req.params.id;
        const territorio = await con.query(`select * from sinna_modefa.f_combos_territorial($1)`, [id]);
        res.status(200).json({ 
            datoAdicional: territorio.rows,
            mensaje:"Datos de ubicación geográfica obtenidos correctamente",
            cod:200
         });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

/**
 * @param {v_json} JSON que maneja los datos para la gestión de juzgados
 */
const gestionJuzgados = async (req, res) => {
    // Pasar los datos del usuario para verificar que el usuario tiene permisos
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body
    
    //console.log(v_json) //Verificar lo que se envía
    const query = {
        text: `call comun.p_juzgados($1) `,
        values:[v_json]
            };
    await con
        .query(query)
        .then((result) =>{
            //Formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  {rows: result.rows, fields: result.fields}
            //console.log(resultado) //Verificar lo que se recibe
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const mostrarJuzgados = async (req, res) => {
    const query = {
        text: `select * from comun.f_mostrar_juzgados()`
            };
    //console.log(query)
    await con
        .query(query)
        .then((result) =>{
            //Formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows
            //console.log(result)
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const mostrarJuzgado = async (req, res) => {
    const id_juzgado = req.params.id_juzgado
    const query = {
        text: `select * from comun.f_mostrar_juzgado($1)`,
        values:[id_juzgado]
            };
    //console.log(query)
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

module.exports = {
    juzgadosParametricas,
    juzgadosTerritorio,
    gestionJuzgados, 
    mostrarJuzgados,
    mostrarJuzgado,
}