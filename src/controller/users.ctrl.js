import passport from 'passport';

import MongoUserManager from '../dao/MongoUserManager.js';

import CustomErrors from '../lib/errors.js';

import { statusMessage, nameMessage } from '../helper/statusMessage.js';
import { linkToken } from '../helper/token.js';

const userManager = new MongoUserManager()

export const users = async (req, res) => {

    try {

        const result = await userManager.getUsers()

        return res.status(statusMessage.OK).json(result)

    } catch (error) {
        req.logger.error(error.message)
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }

}

export const forgotPassword = async (req, res) => {

    const { email } = req.body

    try {

        const result = await userManager.passwordForgot(email)

        if (!result) {
            CustomErrors.generateError(nameMessage.BAD_REQUEST, "User does not exists", statusMessage.BAD_REQUEST)
        }

        const token = linkToken(email)

        return res.status(statusMessage.OK).json({ 
            message: "Check your email",
            token
        })

    } catch (error) {
        req.logger.error(error.message)
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }

}

export const recoverPassword = async (req, res) => {

    const { email } = req.params
    const { password } = req.body

    try {

        const result = await userManager.passwordRecover(email, password)

        if (!result) {
            CustomErrors.generateError(nameMessage.BAD_REQUEST, "User does not exists or password is not avaible", statusMessage.BAD_REQUEST)
        }

        return res.status(statusMessage.OK).json({ 
            message: "Password updated successfully",
            user: result
        })

    } catch (error) {
        req.logger.error(error.message)
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }

}

export const login = passport.authenticate('login', {
    failureRedirect: '/login',
    successRedirect: '/products',
    successFlash: true,
    failureFlash: true,
    session: false
})

export const register = passport.authenticate('register', {
    failureRedirect: '/register',
    successRedirect: '/products',
    successFlash: true,
    failureFlash: true,
    session: false
})