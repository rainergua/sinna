const jwt = require('jsonwebtoken');

const con = require('../../infraestructure/config/config');


//Obtiene las derivaciones asignadas
//TODO: ELABORAR LA FUNCIÓN DE LOS CASOS DERIVADOS PERO NO ACEPTADOS A UN FUNCIOINARIO
const obtieneDerivacionesAsign = async (req, res) =>
{
    ci_usuario = req.user.ci;
    id_usuario = req.user.sub;
    try {
        const query = {
            text: `select distinct * from sinna_mid.obtieneDerivacionesAsign($1)`,
        values: [id_usuario]
        }
        const derivados = await con.query(query)
        res.status(200).json({
            parametros: {
                derivados: derivados.rows,
            },
            mensaje:"Se obtuvo los parámetros solicitados",
            cod:200
        }
        );
    } catch (error) {
        res.status(500).json({ msg: 'Error: ' + error });
    }
}
//Obtiene todas las derivaviones aceptadas
//TODO: ELABORAR LA FUNCIÓN QUE OBTIENE LAS DERIVAVIONES ACEPTADAS DE UN FUNCIONARIO
const obtieneDerivacionesAcept = async (req, res) =>
{
    ci_usuario = req.user.ci;
    id_usuario = req.user.sub;
    try {
        const query = {
            text: `select distinct * from sinna_mid.obtieneDerivacionesAcept($1)`,
            values: [id_usuario]
        }
        const aceptados = await con.query(query)
        res.status(200).json({
            parametros: {
                aceptados: aceptados.rows,
            },
            mensaje:"Se obtuvo los parámetros solicitados",
            cod:200
        }
        );
    } catch (error) {
        res.status(500).json({ msg: 'Error: ' + error });
    }
}

//Obtiene las parametricas selecciondas en el caso
const obtieneParams = async (req, res) => {
    const ids = req.query.id_par; // Obtener el array de IDs de la consulta
    const ids_int = ids.map(function(item) {
        return parseInt(item, 10);
    });
    //Convierte el array de cadenas a enteros
    const placeholders = ids.map((_, index) => `$${index + 1}`).join(',');
    const query = {
        text: `SELECT * FROM parametricas.par_clasificador WHERE id_parametro IN (${placeholders})`,
        values: ids
    };
    try {
      const result = await con.query(query);
      const resultado = result.rows;
      res.status(200).json({ datos: resultado });
    } catch (error) {
      res.status(500).json({ msg: 'Error: ' + error });
    }
  };
//TODO: ELABORAR LA FUNCIÓN PARA OBTENER EL ESTADO DEL EXPEDIENTE
const obtieneEstado = async (req, res) => {
    const params = req.query; 
    const cod_caso = params.cod_caso
    const cargo = params.cargo
    const id_usuario = req.user.sub;
    const query = { 
        text: `select * from sinna_mid.mid_expedientes me 
        where cod_caso ilike $1 and estado ilike '%'|| $2 ||'%' and  id_creado_por = $3
        order by id_expediente desc limit 1`,
        values:[cod_caso, cargo, id_usuario] 
    };
    try {
      const result = await con.query(query);
      const resultado = result.rows;
      res.status(200).json({ datos: resultado });
    } catch (error) {
      res.status(500).json({ msg: 'Error: ' + error });
    }
  };

//TODO: ELABORAR LA FUNCION QUE PERMITA OBTENER LOS EXPEDIENTES DE UN CASO
const obtieneExpedienteCaso = async (req, res) =>{
    const cod_caso = req.params.cod_caso
    const query ={
        text: `select distinct * from sinna_mid.obtieneExpedienteCaso($1)`,
        values: [cod_caso]
    };
    try {
        const result = await con.query(query);
        res.status(200).json({datos: result.rows})
    } catch (error) {
        res.status(500).json({msg: 'Error: ', error})
    }
}
const obtieneDoc = async (req, res) =>{
    const id_expediente = req.params.id_expediente
    const query = {
        text: `select * from comun.datos_documentos where id_documento = $1`,
        values: [id_expediente]
    };
    try {
        const result = await con.query(query);
        res.status(200).json({datos: result.rows})
    } catch (error) {
        res.status(500).json({msg: 'Error: ', error})
    }
}
//Graba expediente
const grabaExpediente = async(req, res)=>{
    //call sinna_mid.p_denuncias_personas($1)
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body;
    const query = {
        //text: `select * from sinna_mid.mid_expedientes`,
        text: `call sinna_mid.p_expedientes($1) `,
        values:[v_json]        
    };
    await con
        .query(query)
        .then((result) =>{
            const resultado =  result
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}

//grabadocumento
//TODO: ELABORAR EL PROCEDIMIENTO PARA EL ABM DE LOS DOCUMENTOS
const grabaDocumento = async(req, res)=>{
    const {
        id_documento, json_datos, estado, transaccion, id_creado_por
    } = req.body
    const ci_usuario = req.user.ci;
    const query = {
        text: `insert into comun.datos_documentos
        (id_documento, json_datos, estado, transaccion, id_creado_por, fecha_creado)
        values($1,$2,$3,$4,$5,now())`,
        values:[id_documento,json_datos,estado,transaccion,id_creado_por]
            };
    await con
        .query(query)
        .then((result) =>{
            const resultado =  result
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}

module.exports = {
    obtieneDerivacionesAsign,
    obtieneDerivacionesAcept,
    obtieneParams,
    grabaDocumento,
    grabaExpediente,
    obtieneEstado,
    obtieneExpedienteCaso,
    obtieneDoc 
}
