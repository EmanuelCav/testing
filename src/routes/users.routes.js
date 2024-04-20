import { Router } from 'express';
import passport from 'passport';

import { users, register, login, forgotPassword, recoverPassword } from'../controller/users.ctrl.js';

import { auth, emailAuth } from'../middleware/auth.js';

import { UserDTO } from '../dto/user.dto.js';

const router = Router()

router.get('/api/users', users)

router.post('/api/register', register)
router.post('/api/login', login)

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/products');
  });

router.get('/api/sesions/current', auth, passport.authenticate("current"), (req, res) => {
  return res.json(new UserDTO(req.user))
})

router.post('/api/users', forgotPassword)
router.put('/api/users/:email', emailAuth, recoverPassword)

export default router
