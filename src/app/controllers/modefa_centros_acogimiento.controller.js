const jwt = require('jsonwebtoken');

const con = require('../../infraestructure/config/config');

const getParametricas = async (req, res) => {
    try {
        //console.log(req.user);
        const tipo_administracion = await con.query(`select * from sinna_modefa.f_combos_parametricas(6)`);
        const rango_edad = await con.query(`select * from sinna_modefa.f_combos_parametricas(10)`);
        const sexo = await con.query(`select * from sinna_modefa.f_combos_parametricas(404)`);
        const territorio = await con.query(`select * from sinna_modefa.f_combos_territorial(1)`);

        res.status(200).json({
            datoAdicional: {
                tipo_administracion: tipo_administracion.rows,
                rango_edad: rango_edad.rows,
                sexo: sexo.rows,
                territorio: territorio.rows 
            },
            mensaje:"Se obtuvo el listado de combos parámétricos",
            cod:200}
        );
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

const getTerritorio = async (req, res) => {
    try {
        let id = req.params.id;
        const territorio = await con.query(`select * from sinna_modefa.f_combos_territorial($1)`, [id]);
        res.status(200).json({ 
            datoAdicional: territorio.rows,
            mensaje:"Se obtuvo el listado de ubicación geográfica",
            cod:200
         });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

const gestionCentroAcogida = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body

    const query = {
        text: `call sinna_modefa.p_centro_acogida($1) `,
        values:[v_json]        
    };
    await con
        .query(query)
        .then((result) =>{
            const resultado =  result.rows;
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Resultado de la gestión de acogida",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}

const listaCentroAcogida = async (req, res) => {
    try {
        const listado = await con.query(`select * from sinna_modefa.f_listar_centros_acogida()`);
        res.status(200).json({ 
            datoAdicional: listado.rows,
            mensaje:"Lista de gestión de acogida",
            cod:200 
        });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

module.exports = {
    getParametricas, 
    getTerritorio,
    gestionCentroAcogida,
    listaCentroAcogida
}