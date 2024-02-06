const con = require("../../infraestructure/config/config");
const getParametricasIngresos = async (req, res) => {
    try {
        const sexo = await con.query(`select * from sinna_mospa.f_combos_parametricas(15)`);
        const poblacionVulnerable = await con.query(`select * from sinna_mospa.f_combos_parametricas(31)`);
        const tipoFechaNacimiento = await con.query(`select * from sinna_mospa.f_combos_parametricas(18)`);
        const lugarNacimiento = await con.query(`select * from sinna_mospa.f_listar_departamentos()`);
        const estadoCivil = await con.query(`select * from sinna_mospa.f_combos_parametricas(244)`);
        const aCargoDe = await con.query(`select * from sinna_mospa.f_combos_parametricas(39)`);
        const cursoEstudio= await con.query(`select * from sinna_mospa.f_combos_parametricas(328)`);
        const juzgados= await con.query(`select * from sinna_mospa.f_listar_juzgados()`);
        const tiposDelito= await con.query(`select * from sinna_mospa.f_combos_parametricas(61)`);
        const situacionProcesal= await con.query(`select * from sinna_mospa.f_combos_parametricas(321)`);
        const tipoMedida= await con.query(`select * from sinna_mospa.f_combos_parametricas(324)`);
        const parentesco= await con.query(`select * from sinna_mospa.f_combos_parametricas(39)`);
        const gradoInstruccion= await con.query(`select * from sinna_mospa.f_combos_parametricas(231)`);
        const ocupacion= await con.query(`select * from sinna_mospa.f_combos_parametricas(249)`);
        const modalidadEgreso= await con.query(`select * from sinna_mospa.f_combos_parametricas(222)`);
        const departamentos = await con.query(`select * from sinna_mospa.f_listar_departamentos()`);

        res.status(200).json({
            resCombos: {
                sexo: sexo.rows,
                poblacionVulnerable:poblacionVulnerable.rows,
                tipoFechaNacimiento:tipoFechaNacimiento.rows,
                lugarNacimiento:lugarNacimiento.rows,
                estadoCivil:estadoCivil.rows,
                aCargoDe:aCargoDe.rows,
                cursoEstudio:cursoEstudio.rows,
                juzgados:juzgados.rows,
                tiposDelito:tiposDelito.rows,
                situacionProcesal:situacionProcesal.rows,
                tipoMedida:tipoMedida.rows,
                parentesco:parentesco.rows,
                gradoInstruccion:gradoInstruccion.rows,
                ocupacion:ocupacion.rows,
                modalidadEgreso:modalidadEgreso.rows,
                departamentos:departamentos.rows,


            },
            mensaje:"Paramétricas obtenidas para el ingreso",
            cod:200}
        );
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

const obtieneMunicipioDpto = async (req, res) => {
    const dpto = req.params.id
    const query = {
        text: `select * from sinna_mospa.f_obtener_municipios_de_dpto($1) `,
        values:[dpto]
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows
            const resultado =  result.rows
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}





const obtenerPersona = async (req, res) => {
    try {
        const buscar = req.params.buscar;
        const datos = await con.query(`select * from sinna_mospa.f_obtener_persona($1)`, [buscar]);
        res.status(200).json({
            datoAdicional: datos.rows,
            mensaje:"Listar centro de acogida asignada a usuario",
            cod:200
        });
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}

const gestionMovimientos = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body
    const query = {
        text: `call sinna_mospa.p_gestion_movimientos($1) `,
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

const gestionPersonasDetalle = async (req, res) => {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body
    const query = {
        text: `call comun.p_personas_ajustado($1) `,
        values:[v_json]
    };
    await con
        .query(query)
        .then((result) =>{
            const resultado =  result.rows[0];
            console.log(resultado);
            res.status(200).json({
                result: resultado,

            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const listarMovimientos = async (req, res) => {

    const query = {
        text: `select * from sinna_mospa.f_listar_movimientos('${req.body.estado}',${req.body.id_centro} ) `,

    };

    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Se obtuvo el listado de movimientos del centro",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const obtieneCentrosDestino = async (req, res) => {
    const query = {
        text: `select * from sinna_mospa.f_combo_centros_destino(${req.body.id} ) `,
    };

    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Se obtuvo el listado de movimientos del centro",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))

}

module.exports = {
    getParametricasIngresos,
    obtenerPersona,
    gestionMovimientos,
    gestionPersonasDetalle,
    listarMovimientos,
    obtieneMunicipioDpto,
    obtieneCentrosDestino
}