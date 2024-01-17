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

module.exports = {
    getCentroAcogidaUsuario,
    getBuscarPersonaMid,
    getListarAcogidosNna,
}