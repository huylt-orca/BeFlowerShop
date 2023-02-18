const User = require('../models/User');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');
const { getDataFromToken } = require('../utils/utils');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 78300,
    });
}
module.exports = {

    async login(req, res) {
        const { password, email, islogged } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({
                status: 0,
                message: 'Not Found',
                user: {}
            });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({
                status: 0,
                message: 'Wrong account',
                user: {}
            });
        }

        const user_id = user.id;

        await User.update({
            islogged
        }, {
            where: {
                id: user_id
            }
        });

        user.password = undefined


        const token = generateToken({ id: user.id });

        return res.status(200).json({
            status: 1,
            message: "Successful",
            user, token
        });


    },
    async index(req, res) {
        const users = await User.findAll();

        if (users == "" || users == null) {
            return res.status(200).json({ message: "Not Found" });

        }

        return res.status(200).json({ users });

    },

    async store(req, res) {

        const { name, password, email } = req.body;

        const user = await User.create({ name, password, email });

        const token = generateToken({ id: user.id });

        user.password = undefined

        return res.status(200).send({
            status: 1,
            message: 'Successful',
            user, token

        });

    },

    async update(req, res) {

        const { name, password, email } = req.body;

        const { user_id } = req.params;

        await User.update({
            name, password, email
        }, {
            where: {
                id: user_id
            }
        });

        return res.status(200).json({
            status: 1,
            message: "Update successful",
        });

    },

    async delete(req, res) {

        const { user_id } = req.params;

        await User.destroy({
            where: {
                id: user_id
            }
        });

        return res.status(200).send({
            status: 1,
            message: "Delete Successful",
        });

    },

    


};