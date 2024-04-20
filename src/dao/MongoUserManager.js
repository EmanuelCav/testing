import User from '../model/user.js';

import { forgotPasswordEmail } from '../helper/message.js';
import { hashPassword } from '../helper/encrypt.js';

export default class UserDAO {

    async getUsers(limit) {

        const result = await User.find().limit(limit)

        return result

    }

    async passwordForgot(email) {

        const result = await User.findOne({ email })

        if (!result) return

        await forgotPasswordEmail(email)

        return result

    }

    async passwordRecover(email, password) {

        const result = await User.findOne({ email })

        if (!result) return

        if (password.length < 6) return

        if (result.password === password) return

        const pass = await hashPassword(password)

        const passwordUpdated = await User.findOneAndUpdate({ email }, {
            password: pass
        }, {
            new: true
        }).select("-password")

        return passwordUpdated

    }

}