export default () => ({
  port: parseInt(process.env.PORT) ?? 3000,
  database: {
    host: process.env.DB_HOST,
  },
  saltRounds: parseInt(process.env.SALT_ROUNDS),
  secretKey: process.env.SECRET_KEY,
});
