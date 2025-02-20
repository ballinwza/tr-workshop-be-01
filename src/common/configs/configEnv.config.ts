export const configEnv = () => ({
  mongoDBConnecter: process.env.MONGODB_CONNECTER,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  frontendWebDomainDev: process.env.FRONTEND_WEB_DOMAIN_DEV,
  frontendWebDomainProd: process.env.FRONTEND_WEB_DOMAIN_PROD,
});
