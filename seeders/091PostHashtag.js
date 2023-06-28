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
   await queryInterface.bulkInsert('PostHashtag', [
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      HashtagId: 1,
      PostId: 7,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      HashtagId: 2,
      PostId: 7,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      HashtagId: 3,
      PostId: 3,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      HashtagId: 4,
      PostId: 9,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      HashtagId: 5,
      PostId: 9,
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
