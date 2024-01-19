const con = require('../../infraestructure/config/config');

const getCentroAcogidaUsuario = async (req, res) => {
    try {
        const id_usuario = req.user.sub;
        const datos = await con.query(`select * from sinna_modefa.f_listar_centros_acogida($1)`, [id_usuario]);
        res.status(200).json({ 
            datoAdicional: datos.rows,
            mensaje:"Listar centro de acogida asignada a usuario",
            cod:200
        });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

const getBuscarPersonaMid = async (req, res) => {
    try {
        let buscar = req.params.buscar;
        const datos = await con.query(`select * from sinna_modefa.f_buscar_persona_mid($1)`, [buscar]);
        res.status(200).json({ 
            datoAdicional: datos.rows,
            mensaje:"Buscar personas en el MID",
            cod:200
        });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

const getListarAcogidosNna = async (req, res) => {
    try {
        let id_centro = req.body.id_centro;
        let estado = req.body.estado;
        const datos = await con.query(`select * from sinna_modefa.f_listar_acogidos_nna($1,$2)`, [id_centro,estado]);
        res.status(200).json({ 
            datoAdicional: datos.rows,
            mensaje:"Lista de NNA acogidos",
            cod:200
        });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

const getParametricasIngreso = async (req, res) => {
    try {
        //console.log(req.user);
        ///arreglar aqui mandar el municipio
        const juzgado = await con.query(`select * from sinna_modefa.f_buscar_juzgado(58)`);
        const montivo_ingreso = await con.query(`select * from sinna_modefa.f_combos_parametricas(199)`);
        const modalidad_egreso = await con.query(`select * from sinna_modefa.f_combos_parametricas(222)`);
        res.status(200).json({
            datoAdicional: {
                juzgado: juzgado.rows,
                montivo_ingreso: montivo_ingreso.rows,
                modalidad_egreso: modalidad_egreso.rows,
            },
            mensaje:"Paramétricas de ingreso de NNA a CDA",
            cod:200}
        );
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

const gestionAcogidaNaa = async (req, res) => {
    try {
        req.body.ci_usuario = req.user.ci;
        const v_json = req.body
        const query = {
            text: `call sinna_modefa.p_acogida_nna($1) `,
            values:[v_json]        
        };
        const resultado = await con.query(query)
        res.status(200).json(resultado.rows[0]);
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

module.exports = {
    getCentroAcogidaUsuario,
    getBuscarPersonaMid,
    getListarAcogidosNna,
    getParametricasIngreso,
    gestionAcogidaNaa
}