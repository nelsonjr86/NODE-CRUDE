const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pessoa = require('../models/pessoa'); 

passport.pessoa(new LocalStrategy({
  pessoanameField: 'email'
}, async (email, done) => {
  // Match Email's pessoa
  const pessoa = await pessoa.findOne({email: email});
  if (!pessoa) {
    return done(null, false, { message: 'Not pessoa found.' });
  } else {
    // Match Password's pessoa
    const match = await pessoa.matchPassword(password);
    if(match) {
      return done(null, pessoa);
    } else {
      return done(null, false, { message: 'Incorrect Password.' });
    }
  }
}));

passport.serializepessoa((pessoa, done) => {
  done(null, pessoa.id);
});

passport.deserializepessoa((id, done) => {
  pessoa.findById(id, (err, pessoa) => {
    done(err, pessoa);
  });
});
