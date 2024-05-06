const con = require('../../infraestructure/config/config');


const buscarEmail = async (req, res) => {
    const query = {
        text: `select * from workflow.f_obtener_usuario('${req.body.ci_usuario}') `,
    };
    try {
        const result = await con.query(query);
        if (result.rows.length === 0) {
            return null;
        } else {
            const { id_usuario, ci_usuario, nombre, cargo, correo, telefono, estado_wf, ciudadania, password } = result.rows[0];
            return { id_usuario, ci_usuario, nombre, cargo, correo, telefono, estado_wf, ciudadania, password }
        }
    } catch (e) {
        //console.log(e);
    }
}

const getMe = async (req, res) => {
    try {
        //console.log(req.user);
        const usuario = await con.query(`select * from workflow.f_obtener_usuario('${req.user.ci}')`);
        const resp = usuario.rows[0];
        delete resp.password;
        res.status(200).json({
            datoAdicional: resp,
            mensaje:"Mis datos son",
            cod:200}
        );
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

module.exports = {
    buscarEmail,
    getMe,
}