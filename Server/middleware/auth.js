// import jwt from "jsonwebtoken"

// const auth=(req,res,next)=>{
//     try {
//         const token=req.headers.authorization.split(" ")[1];
//         let decodedata=jwt.verify(token,process.env.JWT_secret)
//         req.userid=decodedata?.id
//         next()
//     } catch (error) {
//         res.status(400).json("invalid credentials..")
//         return
//     }
// }
// export default auth
// middleware/auth.js
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json("No token provided");

        const decodedData = jwt.verify(token, process.env.JWT_secret);
        req.userid = decodedData.id;

        console.log("✔ Auth middleware: User ID:", req.userid); // Add this
        next();
    } catch (error) {
        console.error("❌ Auth Error:", error.message);
        res.status(401).json("Invalid credentials.");
    }
};

export default auth;
