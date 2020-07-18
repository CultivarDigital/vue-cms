var mongoose = require('mongoose'),
  router = require('express').Router(),
  passport = require('passport'),
  User = mongoose.model('User')


router.post('/login', function(req, res, next) {
  if (!req.body.email) {
    return res.status(422).json("Email inválido")
  }

  if (!req.body.password) {
    return res.status(422).json("Senha inválida")
  }

  try {
    passport.authenticate('local', {
      session: true
    }, function(err, user, info) {
      console.log(err);
      if (err) {
        return res.status(500).json("Ocorreu um erro ao fazer a autenticação")
      }

      if (user) {
        user.token = user.generateJWT()
        return res.json(user.toAuthJSON())
      } else {
        return res.status(422).json(info)
      }
    })(req, res)

  } catch (e) {
    return res.status(500).json(e)
  }
})

router.post('/logout', function(req, res) {
  return res.json(true)
})


router.get('/init', function(req, res) {
  User.find({
    roles: 'super'
  }).exec(function(err, users) {
    if (err) {
      res.status(422).send('Ocorreu um erro ao carregar a lista: ' + err);
    } else {
      if (users && users.length == 0) {
        var user = new User();

        var email = 'admin@terrakrya.com'
        var password = Math.random().toString(36).substring(7)

        user.setPassword(password);

        user.name = 'Super usuário'
        user.email = email
        user.roles = ['super']


        user.save().then(function() {
          return res.send({
            status: 'success',
            user: email,
            password: password
          });
        }).catch(e => {
          return res.send(e)
        });

      } else {
        res.send('Admin já cadastrado')
      }
    }
  });
});

module.exports = router
