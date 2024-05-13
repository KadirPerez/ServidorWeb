const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
const models = require("../models")

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {

    const usuarioExistente = await models.Usuario.findOne({ where: { email: jwt_payload.email } });

    if(usuarioExistente && usuarioExistente.token == jwt_payload.sub){
        return done(null, jwt_payload)
    } else {
        return done(null, false);
    }
    
}));

async function generateJwtToken(req, res) {
    try {
        const payload = {
          sub: req.body.sub, 
          name: req.body.name,
          email: req.body.email
        };
        
        const token = jwt.sign(payload, 'secret', { expiresIn: '1d' });
      
        if (req.body.email.includes("@uabc.edu.mx")) {
          const usuarioExistente = await models.Usuario.findOne({ where: { email: req.body.email } });
          
          if (!usuarioExistente) {
            await models.Usuario.create({
              nombreUsuario: req.body.name,
              email: req.body.email,
              token: req.body.sub,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          }
        }
      
        res.json({ token: token });
    } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
    }      
}

module.exports = {passport,generateJwtToken};
