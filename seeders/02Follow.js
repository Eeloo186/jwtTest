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
   await queryInterface.bulkInsert('Follow', [
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      followingId: 1,
      followerId: 2,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      followingId: 1,
      followerId: 3,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      followingId: 1,
      followerId: 4,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      followingId: 3,
      followerId: 4,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      followingId: 3,
      followerId: 1,
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
