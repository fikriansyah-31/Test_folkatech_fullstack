const errorHandler = require('../middlewares/errorHandler')
const Hash = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { User, Product, Image } = require('../models')

module.exports = class Controller {
    static async register(req, res, next) {
        try {
            let { namaDepan, namaBelakang, email, nomorTelepon, password, confirmPassword } = req.body;
    
            // Periksa apakah password dan confirmPassword cocok
            if (password !== confirmPassword) {
                return res.status(400).json({ message: "Password and confirmPassword do not match" });
            }
    
            // Jika cocok, lanjutkan proses registrasi
            await User.create({
                namaDepan,
                namaBelakang,
                email,
                nomorTelepon,
                password
            });
    
            const message = `User ${namaDepan} has successfully registered`;
            res.status(201).json({ message });
        } catch (error) {
            next(error);
        }
    }
    

    static async login(req, res, next) {
        try {
            let { email, password } = req.body

            if (!email || email === undefined) throw { name: "empty_email" };
            if (!password || password === undefined) throw { name: "empty_password" };

            const selectUser = await User.findOne({
                where: { email }
            })

            if (!selectUser) {
                throw { name: "unauthorized" }
            }

            if (!Hash.verify(password, selectUser.password)) {
                throw { name: "unauthorized" };
            }

            const token = generateToken({ id: selectUser.id });
            res.status(200).json({
                access_token: token,
                email: selectUser.email
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getProducts(req, res, next) {
        try {
            let product = await Product.findAll({
                include: [
                    {
                        model: Image,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"],
                        },
                    }
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            })
            res.status(200).json(product);
        } catch (error) {
            next(error)
        }
    }

    static async getProductById(req, res, next) {
        try {
            let productId = req.params.id;
            let product = await Product.findByPk(productId, {
                include: [
                    {
                        model: Image,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"],
                        },
                    }
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            })

            if (!product) {
                throw { name: "DataNotFound" }
            }

            res.status(200).json(product);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}