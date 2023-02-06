const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports = {

    async test(req,res){
        // const value = await Category.create({name: req.body.name,description: req.body.description}); 

        const { user_id } = req.params;
        const { street, number, district, city } = req.body;

        const category = await User.findByPk(category_id, {
            include: { association: 'address'}
        });

        const values = await Category.findAll();
        res.json(values);
    },

    async add(req, res){
        const {name,description} = req.body;
        const category = await Category.create({description});

        return res.status(200).send({
            status: 1,
            message: 'Successful',
            category

        });

    },
    
    async index(req, res) {
        const products = await Product.findAll();

        if (products == "" || products == null) {
            return res.status(200).send({ message: "Nenhum usuário cadastrado" });

        }

        return res.status(200).send({ products });

    },

    async store(req, res) {

        const { name, password, email } = req.body;

        const product = await Product.create({ name, password, email });


        return res.status(200).send({
            status: 1,
            message: 'usuário cadastrado com sucesso!',
            product

        });

    },

    async update(req, res) {

        const { name, password, email } = req.body;

        const { user_id } = req.params;

        await Product.update({
            name, password, email
        }, {
            where: {
                id: user_id
            }
        });

        return res.status(200).send({
            status: 1,
            message: "Usuário atualizado com sucesso!",
        });

    },

    async delete(req, res) {

        const { user_id } = req.params;

        await Product.destroy({
            where: {
                id: user_id
            }
        });

        return res.status(200).send({
            status: 1,
            message: "Usuário deletado com sucesso!",
        });

    }

};