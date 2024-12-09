import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('projetclinique', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;
