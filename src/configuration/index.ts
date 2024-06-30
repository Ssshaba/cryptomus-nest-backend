export default () => ({
  secret_jwt: process.env.SECRET_JWT,
  expire_jwt: process.env.JWT_EXPIRE,
});
