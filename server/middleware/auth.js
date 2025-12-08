const User = require("../model/user");
const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.header("Authorization").replace("Bearer ", "") ||
      req.body.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token found, authorization denied",
      });
    }

    // verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Token verification failed, authorization denied",
      });
    }

    req.user = decode;
    next();
  } catch (error) {
    console.log("Error in auth middleware:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    console.log("User role in isAdmin middleware:", req.user.role);
    if (req.user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Access denied, admin only",
      });
    }
    next();
  } catch (error) {
    console.log("Error in isAdmin middleware:", error);
  }
};
// exports.authorizeRoles = (...allowedRoles) => {
//   return (req, res, next) => {
//     try {
//       const userRoles = req.user.roles || [];
//       const hasPermission = allowedRoles.some((role) =>
//         userRoles.includes(role)
//       );

//       if (!hasPermission) {
//         return res.status(403).json({
//           success: false,
//           message: "Access denied. Required roles: " + allowedRoles.join(", "),
//         });
//       }

//       next();
//     } catch (error) {
//       console.log("Error in authorization middleware:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Authorization error",
//       });
//     }
//   };
// };
