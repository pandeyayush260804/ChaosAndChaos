import jwt from "jsonwebtoken";

export const generateToken = (email) => {
    const token = jwt.sign({ email: email }, "UCANTSEEME", { expiresIn: "12h" });
    return token;
};

export const verifyToken = (token) => {
    const decode = jwt.verify(token, "UCANTSEEME");
    return decode.email;
};
