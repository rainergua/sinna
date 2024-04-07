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
            text: `select md.id_derivacion, md.id_denuncia, md.estado, md.cod_caso, md.fecha_creado as fecha_derivacion, 
                md2.tipologia_denuncia, pc.descripcion as tipologia,  md2.caso, md2.fecha_denuncia,  md.id_usuario_a, md.id_creado_por
                from sinna_mid.mid_derivaciones md
                inner join workflow.wf_usuario wu on md.id_usuario_a = wu.id_usuario 
                inner join sinna_mid.mid_denuncias md2 on md.id_denuncia=md2.id_denuncia 
                inner join parametricas.par_clasificador pc on md2.tipologia_denuncia = pc.id_parametro 
                inner join workflow.wf_usuario wu2 on md.id_creado_por = wu2.id_usuario 
                where md.estado = 'CASO_DERIVADO' and id_usuario_a = $1
                order by md.id_derivacion desc`,
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
            text: `select md.id_derivacion, md.id_denuncia, md.estado, md.cod_caso, md.fecha_creado as fecha_derivacion, 
            md2.tipologia_denuncia, pc.descripcion as tipologia,  md2.caso, md2.fecha_denuncia,  md.id_usuario_a, md.id_creado_por
            from sinna_mid.mid_derivaciones md
            inner join workflow.wf_usuario wu on md.id_usuario_a = wu.id_usuario 
            inner join sinna_mid.mid_denuncias md2 on md.id_denuncia=md2.id_denuncia 
            inner join parametricas.par_clasificador pc on md2.tipologia_denuncia = pc.id_parametro 
            inner join workflow.wf_usuario wu2 on md.id_creado_por = wu2.id_usuario 
            where md.estado = 'CASO_ACEPTADO' and id_usuario_a = $1
            order by md.id_derivacion desc`,
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
        text: `select me.*, dd.json_datos, we.descripcion_estado, wu.nombre, wu.cargo, wu.telefono 
        from sinna_mid.mid_expedientes me 
        inner join comun.datos_documentos dd on dd.id_documento = me.id_expediente 
        inner join workflow.wf_estados we on me.estado = we.estado 
        inner join workflow.wf_usuario wu on me.id_creado_por = wu.id_usuario 
        where me.cod_caso ilike $1
        order by fecha_creado desc `,
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
