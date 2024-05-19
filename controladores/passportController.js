const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
const models = require("../models")

const {OAuth2Client, JWT} = require('google-auth-library')
const client = new OAuth2Client(process.env.Cliente)

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

        const ticket = await client.verifyIdToken({
          idToken: req.body.credential,
          audience: process.env.Cliente
        })

        if (ticket.payload.email.includes("@uabc.edu.mx")) {
          
          const payload = {
            sub: ticket.payload.sub, 
            name: ticket.payload.name,
            email: ticket.payload.email
          };
          
          const token = jwt.sign(payload, 'secret', { expiresIn: '1d' });

          const usuarioExistente = await models.Usuario.findOne({ where: { email: ticket.payload.email } });
          
          if (!usuarioExistente) {
            await models.Usuario.create({
              nombreUsuario: req.body.name,
              email: req.body.email,
              token: req.body.sub,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          }
          res.json({ token: token });
        } else {
          res.json({token:'No es un token valido'});
        }

    } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
    }      
}

module.exports = {passport,generateJwtToken};
