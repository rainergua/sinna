const jwt = require('jsonwebtoken');

const con = require('../../infraestructure/config/config');

const test = async(req, res) => {
    const url_page = `https://pokeapi.co/api/v2/pokemon/ditto`;
    try{
        const options = {
        "method" : "GET",
        }

        const response = await fetch(url_page,options)
            .then(res => res.json())
            .catch(e => {
                console.error({
                    "message":"error",
                    error: e
            })
        })
        return res.status(200).json(response)
    }catch (error){
        return res.status(400).json(error);
    }
};


const testdb = async(req,res) =>{
    const response = await con.query(`select * from comun.com_personas`);
    res.status(200).json(response.rows)
    
}

const testdbres = async (req, res) => {
    const query = {
        text: `select * from  codificacion.cod_matriz  
                where codigo_ocupacion ilike $1`,
        values:['75311']
            };
    await con
        .query(query)
        .then((result) =>
            res.status(200).json({
                datos: result,
            })
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}
const getToken = async(req, res) =>{
    try {
    const token = jwt.sign({
        //userId: user.id
      }, process.env.JWT_SECRET);
      res.status(200).json({
        accessToken: token
      })}
      catch (err){
        console.log(err)
        res.status(500).json({
            message: "Internal server error"
          });
      }
}
module.exports = {
    test,
    testdb,
    testdbres, 
    getToken
}
