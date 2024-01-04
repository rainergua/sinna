const jwt = require('jsonwebtoken');

const con = require('../../infraestructure/config/config');

const getParametricas = async (req, res) => {
    try {
        let ine = '__0000';
        let nivel = 1;
        const tipo_administracion = await con.query(`select * from sinna_modefa.f_combos_parametricas(6)`);
        const rango_edad = await con.query(`select * from sinna_modefa.f_combos_parametricas(10)`);
        const sexo = await con.query(`select * from sinna_modefa.f_combos_parametricas(15)`);
        const territorio = await con.query(`select * from sinna_modefa.f_combos_territorial($1,$2)`, [ine, nivel]);

        const resultado = {
            tipo_administracion: tipo_administracion.rows,
            rango_edad: rango_edad.rows,
            sexo: sexo.rows,
            territorio: territorio.rows
        };

        res.status(200).json({ datos: resultado });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

const getTerritorio = async (req, res) => {
    try {
        let ine = req.params.ine;
        let nivel = req.params.nivel;
        const territorio = await con.query(`select * from sinna_modefa.f_combos_territorial($1,$2)`, [ine, nivel]);

        const resultado = {
            territorio: territorio.rows
        };

        res.status(200).json({ datos: resultado });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

const gestionCentroAcogida = async (req, res) => {
    const v_json = req.body

    const query = {
        text: `call sinna_modefa.p_centro_acogida($1) `,
        values:[v_json]        
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  {rows: result.rows, fields: result.fields}
            //console.log(resultado)
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}

const listaCentroAcogida = async (req, res) => {
    try {
        const listado = await con.query(`select * from sinna_modefa.f_listar_centros_acogida()`);

        const resultado = {
            listado: listado.rows
        };

        res.status(200).json({ datos: resultado });
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




















