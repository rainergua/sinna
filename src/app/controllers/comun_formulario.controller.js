const con = require('../../infraestructure/config/config');

const formulario = async (req, res) => {
    try {
        const id = req.params.id;
        const formulario = await con.query(`select * from comun.com_formulario where id_formulario=${id}`);
        const cuerpo = await con.query(`select * from comun.com_formulario_cuerpo where estado = true and id_formulario=${id} order by orden`);
        res.status(200).json({
            datoAdicional: {
                formulario: formulario.rows[0],
                cuerpo: cuerpo.rows
            },
            mensaje:"Generar formulario",
            cod:200}
        );
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}


module.exports = {
    formulario
}