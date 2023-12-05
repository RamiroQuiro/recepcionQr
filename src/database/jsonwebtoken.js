import jwt from 'jsonwebtoken'

// Esta es tu clave secreta, asegúrate de mantenerla segura
const secretKey = 'R@m21231320';

const generateToken = (data) => {
  // Genera el token
  const token = jwt.sign(data, secretKey);
  return token;
};

const verifyToken = async (token) => {
  try {
    const data = await jwt.verify(token, secretKey);
    return data;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      console.error("Token expirado");
      // Aquí puedes manejar el error de token expirado
    } else if (err instanceof jwt.JsonWebTokenError) {
      console.error("Error en el token");
      // Aquí puedes manejar otros errores de token
    } else {
      console.error(err);
      // Aquí puedes manejar cualquier otro error
    }
    return null;
  }
};

export {generateToken,verifyToken}