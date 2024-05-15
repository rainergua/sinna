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
      console.log(datos.rows);
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
    //console.log(v_json)
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
    console.log(v_json)
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
    console.log(v_json)
    const query = {
      text: `call sinna_mid.p_autorizacion_trabajo_padres($1) `,
      values:[v_json]
    };
    const result = await con.query(query);
    console.log(result.rows[0]);
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

module.exports = {
  listarAutorizacionesTrabajo,
  getBuscarEstablecimiento,
  gestionEstablecimiento,
  gestionAutorizacionTrabajo,
  gestionAutorizacionTrabajoPadres,
  listarRequisitosTrabajo,
  cambiarRequerimiento
}