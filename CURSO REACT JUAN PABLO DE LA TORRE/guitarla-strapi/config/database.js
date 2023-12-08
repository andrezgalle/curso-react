module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'dpg-cfp5nop4rebfdarbl070-a.oregon-postgres.render.com'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'guitarla_6xta'),
      user: env('DATABASE_USERNAME', 'root'),
      password: env('DATABASE_PASSWORD', '8cYuqzmOAX5OtuzJgNpsGmEhcA6dC5oC'),
      ssl: env.bool('DATABASE_SSL', true),
    },
  },
});
