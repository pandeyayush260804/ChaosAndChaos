import { registerPlayer, loginPlayer } from "../services/player-service.js";

export const login = async (req, res) => {
    const playerObject = req.body;

    try {
        const obj = await loginPlayer(playerObject);
        res.status(200).json(obj);
    } catch (err) {
        res.status(500).json({ message: "Login Fail....." });
        console.log(err);
    }
};

export const register = async (req, res) => {
    const playerObject = req.body;

    try {
        const message = await registerPlayer(playerObject);
        res.status(200).json({ message: message });
    } catch (err) {
        res.status(500).json({ message: "Error During Register....." });
        console.log(err);
    }
};
