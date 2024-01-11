const jwt = require('jsonwebtoken');

const con = require('../../infraestructure/config/config');

const getPersonaCi= async (req, res) => {
    const ci = req.params.ci
    const query = {
        text: `select * from comun.listar_personas_ci($1)`,
        values:[ci]
            };
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
    getPersonaCi,
}
