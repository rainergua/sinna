const con = require("../../infraestructure/config/config");
const getParametricasIngresos = async (req, res) => {
    try {
        const sexo = await con.query(`select * from sinna_mospa.f_combos_parametricas(15)`);
        const poblacionVulnerable = await con.query(`select * from sinna_mospa.f_combos_parametricas(31)`);
        const tipoFechaNacimiento = await con.query(`select * from sinna_mospa.f_combos_parametricas(18)`);
        const lugarNacimiento = await con.query(`select * from sinna_mospa.f_listar_departamentos()`);
        const estadoCivil = await con.query(`select * from sinna_mospa.f_combos_parametricas(244)`);
        const aCargoDe = await con.query(`select * from sinna_mospa.f_combos_parametricas(299)`);
        const cursoEstudio= await con.query(`select * from sinna_mospa.f_combos_parametricas(328)`);
        const juzgados= await con.query(`select * from sinna_mospa.f_listar_juzgados()`);
        const tiposDelito= await con.query(`select * from sinna_mospa.f_combos_parametricas(61)`);
        const situacionProcesal= await con.query(`select * from sinna_mospa.f_combos_parametricas(321)`);
        const tipoMedida= await con.query(`select * from sinna_mospa.f_combos_parametricas(324)`);
        const parentesco= await con.query(`select * from sinna_mospa.f_combos_parametricas(39)`);
        const gradoInstruccion= await con.query(`select * from sinna_mospa.f_combos_parametricas(231)`);
        const ocupacion= await con.query(`select * from sinna_mospa.f_combos_parametricas(249)`);
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
                ocupacion:ocupacion.rows
            },
            mensaje:"Paramétricas obtenidas para el ingreso",
            cod:200}
        );
    } catch (e) {
        res.status(500).json({ msg: 'Error: ' + e });
    }
}


const obtenerPersona = async (req, res) => {
    const query = {
        text: `select * from comun.f_obtener_persona('{ "ci":${req.body.ci},"ci_complemento":${req.body.ci_complemento},"nombre":"${req.body.nombre}","paterno":"${req.user.paterno}","materno":"${req.user.materno}" }') `,

    };

    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado =  result.rows;
            console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:"Se identifico a la persona",
                cod:200
            })}
        )
        .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

module.exports = {
    getParametricasIngresos,
    obtenerPersona
}