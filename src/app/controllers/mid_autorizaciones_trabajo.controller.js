const con = require('../../infraestructure/config/config');

/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */

const listarAutorizacionesTrabajo = async (req, res) => {
  const query = {
    text: `select * from sinna_mid.f_listar_autorizaciones_trabajo('{ "estado":"${req.body.estado}","ci_usuario":"${req.user.ci}" }')`,
  };
  await con
    .query(query)
    .then((result) =>{
      //formateamos el resultado para que retorne solo Rows y Fields
      const resultado =  result.rows;
      res.status(200).json({
        datoAdicional: resultado,
        mensaje:"Se obtuvo el listado autorizaciones de trabajo",
        cod:200,
        correcto:true
      })}
    )
    .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const getBuscarEstablecimiento = async (req, res) => {
  try {
      let buscar = req.params.buscar;
      const datos = await con.query(`select * from sinna_mid.f_buscar_establecimiento($1)`, [buscar]);
      res.status(200).json({ 
          datoAdicional: datos.rows,
          mensaje:"Buscar establecimientos laboral",
          cod:200
      });
  } catch (e) {
      res.status(500).json({ msg: 'Error: ' + e });
  }
}

const gestionEstablecimiento = async (req, res) => {
  try {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body
    const query = {
      text: `call sinna_mid.p_establecimiento_laboral($1) `,
      values:[v_json]
    };
    const result = await con.query(query);
      res.status(200).json({ 
        datoAdicional: result.rows[0].datoadicional,
        mensaje:result.rows[0].notificacion,
        correcto:result.rows[0].correcto,
        cod:200
      });
  } catch (error) {
    res.status(500).json({ msg: 'Error: ' + error });
  }    
}

const gestionAutorizacionTrabajo = async (req, res) => {
  try {
    req.body.ci_usuario = req.user.ci;
    const v_json = req.body
    const query = {
      text: `call sinna_mid.p_autorizacion_trabajo($1) `,
      values:[v_json]
    };
    const result = await con.query(query);
    res.status(200).json({ 
      datoAdicional: result.rows[0].datoadicional,
      mensaje:result.rows[0].notificacion,
      correcto:result.rows[0].correcto,
      cod:200
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error: ' + error });
  }    
}

const gestionAutorizacionTrabajoPadres = async (req, res) => {
  try {
    //req.body.ci_usuario = req.user.ci;
    const v_json = req.body
    const query = {
      text: `call sinna_mid.p_autorizacion_trabajo_padres($1) `,
      values:[v_json]
    };
    const result = await con.query(query);
    res.status(200).json({ 
      datoAdicional: result.rows[0].datoadicional,
      mensaje:result.rows[0].notificacion,
      correcto:result.rows[0].correcto,
      cod:200
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error: ' + error });
  }    
}

const listarRequisitosTrabajo = async (req, res) => {
  try {
      let id = req.params.id;
      const datos = await con.query(`select * from sinna_mid.listar_requisitos_trabajo($1)`, [id]);
      res.status(200).json({ 
          datoAdicional: datos.rows,
          mensaje:"Lista de requerimientos",
          cod:200
      });
  } catch (e) {
      res.status(500).json({ msg: 'Error: ' + e });
  }
}

const cambiarRequerimiento = async (req, res) => {
  try {
      let id = req.params.id;
      let requerimiento = req.params.requerimiento;
      await con.query(`update sinna_mid.mid_requisitos_autorizacion_viaje set requerimiento = ($1) where id_requisito_autorizacion_viaje = ($2)`, [requerimiento, id]);
      res.status(200).json({ 
          datoAdicional: id,
          mensaje:"Modificado correctamente",
          cod:200
      });
  } catch (e) {
      res.status(500).json({ msg: 'Error: ' + e });
  }
}

const subirDocumento = async (req, res) => {
  try {
    req.body.documento = req.file.filename;
    const query = {
        text: `update sinna_mid.mid_requisitos_autorizacion_viaje set documento = ($1) where id_requisito_autorizacion_viaje = ($2) `,
        values:[req.body.documento, req.body.id_requisito_autorizacion_viaje]        
    };
    const resultado = await con.query(query)
    res.status(200).json({ 
      datoAdicional: req.body.id_requisito_autorizacion_viaje,
      mensaje:"El archivo se almacenó correctamente",
      cod:200
  });
  } catch (e) {
      res.status(500).json({ msg: 'Error: ' + e });
  }
  
}

const subirDocumentoAvaluar = async (req, res) => {
  try {
    if(typeof req.files['doc_valoracion_medica']!== 'undefined')
      req.body.doc_valoracion_medica = req.files['doc_valoracion_medica'][0].filename;
    else
      req.body.doc_valoracion_medica = null;
    if(typeof req.files['doc_valoracion_socio_economica']!== 'undefined')
      req.body.doc_valoracion_socio_economica = req.files['doc_valoracion_socio_economica'][0].filename;
    else
      req.body.doc_valoracion_socio_economica = null;
    if(typeof req.files['doc_inpeccion_ocular']!== 'undefined')
      req.body.doc_inpeccion_ocular = req.files['doc_inpeccion_ocular'][0].filename;
    else
      req.body.doc_inpeccion_ocular = null;
    if(typeof req.files['doc_actividad_prohibida']!== 'undefined')
      req.body.doc_actividad_prohibida = req.files['doc_actividad_prohibida'][0].filename;
    else
      req.body.doc_actividad_prohibida = null;
    if(typeof req.files['doc_actividad_derechos']!== 'undefined')
      req.body.doc_actividad_derechos = req.files['doc_actividad_derechos'][0].filename;
    else
      req.body.doc_actividad_derechos = null;

    const query = {
        text: `update sinna_mid.mid_autorizacion_trabajo set doc_valoracion_medica = ($1),
              doc_valoracion_socio_economica = ($2),
              doc_inpeccion_ocular = ($3),
              doc_actividad_prohibida = ($4),
              doc_actividad_derechos = ($5)
              where id_autorizacion_trabajo = ($6) `,
        values:[req.body.doc_valoracion_medica, req.body.doc_valoracion_socio_economica, req.body.doc_inpeccion_ocular, 
          req.body.doc_actividad_prohibida, req.body.doc_actividad_derechos, req.body.id_autorizacion_trabajo]        
    };
    const resultado = await con.query(query)
    res.status(200).json({ 
      datoAdicional: req.body.id_autorizacion_trabajo,
      mensaje:"El archivo se almacenó correctamente",
      cod:200
    });
  } catch (e) {
      res.status(500).json({ msg: 'Error: ' + e });
  }

}

const listarAutorizacionesTrabajoPadres = async (req, res) => {
  const query = {
    text: `select * from sinna_mid.f_listar_autorizaciones_trabajo_padres('{ "id_autorizacion_trabajo":"${req.body.id_autorizacion_trabajo}" }')`,
  };
  await con
    .query(query)
    .then((result) =>{
      const resultado =  result.rows;
      res.status(200).json({
        datoAdicional: resultado,
        mensaje:"Se obtuvo el listado autorizaciones de trabajo",
        cod:200,
        correcto:true
      })}
    )
    .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

const listarSeguimientoLaboral = async (req, res) => {
  const query = {
    text: `select * from sinna_mid.f_listar_seguimiento_laboral('{ "id_autorizacion_trabajo":"${req.body.id_autorizacion_trabajo}" }')`,
  };
  await con
    .query(query)
    .then((result) =>{
      const resultado =  result.rows;
      res.status(200).json({
        datoAdicional: resultado,
        mensaje:"Se obtuvo el listado de seguimiento laboral",
        cod:200,
        correcto:true
      })}
    )
    .catch((e) => res.status(500).json({ mensaje: 'Error:'+ e }))
}

module.exports = {
  listarAutorizacionesTrabajo,
  getBuscarEstablecimiento,
  gestionEstablecimiento,
  gestionAutorizacionTrabajo,
  gestionAutorizacionTrabajoPadres,
  listarRequisitosTrabajo,
  cambiarRequerimiento,
  subirDocumento,
  subirDocumentoAvaluar,
  listarAutorizacionesTrabajoPadres,
  listarSeguimientoLaboral
}