"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.logout = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_js_1 = __importDefault(require("../db/prisma.js"));
const generateToken_js_1 = require("../utils/generateToken.js");
const constant_js_1 = __importDefault(require("../contants/constant.js"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get all fields from user using request body
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        // if all fields are not provided the throw error
        if (!fullName || !userName || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }
        // if password and confiemPassword dont match then return error
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password don't match" });
        }
        // check if user is alreasy exists or not by userName
        const user = yield prisma_js_1.default.user.findUnique({ where: { userName } });
        // if userName is already exists then return error user already exists
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        // create salt for encrypting password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // get user avatar based on gender
        // https://avatar-placeholder.iran.liara.run/
        const profile_url = (0, constant_js_1.default)(gender, userName);
        // create user
        const newUser = yield prisma_js_1.default.user.create({
            data: {
                fullName,
                userName,
                password: hashedPassword,
                gender,
                profilePic: profile_url,
            },
        });
        // if user created successfully
        if (newUser) {
            // generate token in a sec
            (0, generateToken_js_1.generateToken)(newUser.id, res);
            // send the res to client
            res.status(201).json({
                id: newUser.id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic,
                gender: newUser.gender
            });
        }
        else {
            // if error while creating user
            res.status(400).json({ error: "Invalid user data" });
        }
    }
    catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.signup = signup;
/**
 * get user credentials email , password
 * check if user exixts in our database use email to check
 * and then encrypt the use password and compare with stored password
 * if password found correct then generate token
 * and send res 200
 * and catch error if anything thing happens
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        const userExists = yield prisma_js_1.default.user.findUnique({ where: { userName } });
        if (!userExists) {
            return res.status(400).json({ error: "Invalid creadentials" });
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, userExists.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        (0, generateToken_js_1.generateToken)(userExists.id, res);
        res.status(200).json({
            id: userExists.id,
            fullName: userExists.fullName,
            userName: userExists.userName,
            profilePic: userExists.profilePic,
        });
    }
    catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Excecuted");
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.logout = logout;
/**
 * get user by id
 * and if user not found the throw error
 */
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_js_1.default.user.findUnique({ where: { id: req.user.id } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic,
            gender: user.gender
        });
    }
    catch (error) {
        console.log("Error in getMe ", error.message);
        res.status(500).json({ error: "Internal Server Error " });
    }
});
exports.getUser = getUser;
//# sourceMappingURL=auth.controller.js.map