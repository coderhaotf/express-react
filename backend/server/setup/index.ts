import { Sequelize, Options } from "sequelize";

const {
  username = "root",
  password = "123456",
  host = "localhost",
  port = 3306,
  protocol,
  database = "mujin",
} = (process.env.database || {}) as Options;

const sequelize = new Sequelize({
  dialect: "mysql",
  database,
  username,
  password,
  host,
  port,
  protocol,
});

const authenticate = () =>
  sequelize
    .authenticate({ logging: false })
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
    });

const sync = () =>
  sequelize.showAllSchemas({ logging: false }).then((tables) => {
    return sequelize
      .sync({ logging: false })
      .then(() => {
        console.log("Tables created successfully!");
      })
      .catch((error) => {
        console.error("Unable to create table : ", error);
      });
  });

export { sequelize, authenticate, sync };
