'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('boards', [
    {      
      name:'notice',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name:'info',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name:'community',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name:'picture',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
