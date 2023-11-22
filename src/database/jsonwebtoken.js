import jwt from 'jsonwebtoken'

// Esta es tu clave secreta, asegúrate de mantenerla segura
const secretKey = 'R@m21231320';

const generateToken = (data) => {
  // Genera el token
  const token = jwt.sign(data, secretKey);
  return token;
};

const verifyToken = (token) => {
  try {
    // Verifica el token
    const data = jwt.verify(token, secretKey);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};


export {generateToken,verifyToken}