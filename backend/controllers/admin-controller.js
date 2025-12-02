import { registerAdmin, loginAdmin } from "../services/admin-service.js";

export const login = async (req, res) => {  
    const adminObject = req.body;
    try {
        const obj = await loginAdmin(adminObject);
        res.status(200).json(obj);
    } catch (err) {
        res.status(500).json({ message: "Login Fail....." });
        console.log(err);
    }
};

export const register = async (req, res) => {
    const adminObject = req.body;
    try {

        const message = await registerAdmin(adminObject);
        res.status(200).json({ message: message });

    } catch (err) {
        res.status(500).json({ message: "Error During Register....." });
        console.log(err);
    }
};