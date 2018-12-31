import Sequelize from 'sequelize';

export const sequelize = new Sequelize('mysql://movnetuser:password@localhost:3306/movnet');
