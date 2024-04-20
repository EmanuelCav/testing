import jwt from 'jsonwebtoken';

import { jwt_key, jwt_email_key } from '../config/config.js';

import { statusMessage } from '../helper/statusMessage.js';
import { forgotPasswordEmail } from '../helper/message.js';

export const auth = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(statusMessage.UNAUTHORIZED).json({ message: "Token does not exists" })
    }

    const verification = jwt.verify(token, `${jwt_key}`)

    if (!verification) {
        return res.status(statusMessage.UNAUTHORIZED).json({ message: "Token is not valid" })
    }

    req.user = verification

    next()

}

export const admin = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(statusMessage.UNAUTHORIZED).json({ message: "Token does not exists" })
    }

    const verification = jwt.verify(token, `${jwt_key}`)

    if (!verification) {
        return res.status(statusMessage.UNAUTHORIZED).json({ message: "Token is not valid" })
    }

    req.user = verification

    if (req.user.role !== 'admin') {
        return res.status(statusMessage.UNAUTHORIZED).json({ message: "You must be admin" })
    }

    next()

}

export const emailAuth = async (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        await forgotPasswordEmail(req.body.email)
        return res.status(statusMessage.UNAUTHORIZED).json({ message: "Token does not exists" })
    }

    const verification = jwt.verify(token, `${jwt_email_key}`)

    if (!verification) {
        await forgotPasswordEmail(req.body.email)
        return res.status(statusMessage.UNAUTHORIZED).json({ message: "Token is not valid" })
    }

    next()

}

export const premium = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(statusMessage.UNAUTHORIZED).json({ message: "Token does not exists" })
    }

    const verification = jwt.verify(token, `${jwt_key}`)

    if (!verification) {
        return res.status(statusMessage.UNAUTHORIZED).json({ message: "Token is not valid" })
    }

    req.user = verification

    if (req.user.role !== 'admin' || req.user.role !== 'premium') {
        return res.status(statusMessage.UNAUTHORIZED).json({ message: "You must be admin or premium" })
    }

    next()

}