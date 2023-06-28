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
   await queryInterface.bulkInsert('pets', [
    {
      name: 'petname1',
      type: 'pettype1',
      kind: 'petkind1',
      age: 10,
      etc: 'etc1',
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 1,
    },
    {
      name: 'petname2',
      type: 'pettype2',
      kind: 'petkind2',
      age: 1,
      etc: 'etc2',
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 1,
    },
    {
      name: 'petname3',
      type: 'pettype3',
      kind: 'petkind3',
      age: 6,
      etc: 'etc3',
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 4,
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
