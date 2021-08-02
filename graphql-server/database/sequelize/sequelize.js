import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.LOCAL_DB_URL); // Example for postgres

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;