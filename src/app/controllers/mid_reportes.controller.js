//const jwt = require('jsonwebtoken');

const con = require('../../infraestructure/config/config');


//Reporte de casos atendidos segun parámetro
const obtieneCasosAtendidos = async (req, res) =>
{
    //const v_json = req.body;
    const c_json = req.query
    try {
        const query = {
            text: `select distinct * from sinna_mid.f_reporte_casos($1)`,
        values: [c_json]
        }
        const derivados = await con.query(query)
        res.status(200).json({
            parametros: {
                atendidos: derivados.rows,
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
//Historial de derivaciones
//TODO: ELABORAR LA FUNCIÓN QUE OBTIENE EL HISTORIAL DE LAS DERIVAVIONES DE UN CASO
const obtieneHistoriaDeriva = async (req, res) => {
    const id_denuncia = req.params.id_denuncia; 
    //console.log('----------------------')
    //console.log(req.params)
    try {
        const query = {
            text: `select * from sinna_mid.obtienehistoriaderiva($1)`,
            values: [id_denuncia]
        }
        const respuesta = await con.query(query)
        res.status(200).json({
            parametros: {
                datos: respuesta.rows,
            },
            mensaje:"Se obtuvo los datos solicitados",
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
        text: `select * FROM sinna_mid.obtieneestado($1, $2, $3)`,
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
//mensajeSeguimiento
const mensajeSeguimiento = async(req, res) => {
    const cargo = req.params.cargo
    const id_usuario = req.user.sub;
    let query = ''
    switch (cargo) {
        case 'SOCIAL':
            query ={
                text: `select * from sinna_mid.f_define_seguimiento_social($1)`,
                values: [id_usuario]
            };
            break;
        case 'PSICO':
            query ={
                text: `select * from sinna_mid.f_define_seguimiento_psico($1)`,
                values: [id_usuario]
            };
            break;
        case 'LEGAL':
            query ={
                text: `select * from sinna_mid.f_define_seguimiento_legal($1)`,
                values: [id_usuario]
            };
            break;
        default:
            break;
    }
    try {
        const result = await con.query(query);
        res.status(200).json({datos: result.rows})
    } catch (error) {
        res.status(500).json({msg: 'Error: ', error})
    }
}
const mensajeFlujo = async(req, res) => {
    const cargo = req.params.cargo
    const id_usuario = req.user.sub;
    let query = ''
    switch (cargo) {
        case 'SOCIAL':
            query ={
                text: `select * from sinna_mid.f_define_flujo_social($1)`,
                values: [id_usuario]
            };
            break;
        case 'PSICO':
            query ={
                text: `select * from sinna_mid.f_define_flujo_psico($1)`,
                values: [id_usuario]
            };
            break;
        case 'LEGAL':
            query ={
                text: `select * from sinna_mid.f_define_flujo_legal($1)`,
                values: [id_usuario]
            };
            break;
        default:
            break;
    }
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
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body;
    const query = {
        //REVISAR en el BACK
        /*text: `insert into comun.datos_documentos
        (id_documento, json_datos, estado, transaccion, id_creado_por, fecha_creado)
        values($1,$2,$3,$4,$5,now())`,
        values:[id_documento,json_datos,estado,transaccion,id_creado_por]*/
        text: `call comun.p_datos_documentos($1) `,
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

module.exports = {
    obtieneCasosAtendidos,

    obtieneDerivacionesAcept,
    obtieneHistoriaDeriva,
    obtieneParams,
    mensajeFlujo,
    mensajeSeguimiento,
    grabaDocumento,
    grabaExpediente,
    obtieneEstado,
    obtieneExpedienteCaso,
    obtieneDoc 
}
