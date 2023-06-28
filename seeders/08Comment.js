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
   await queryInterface.bulkInsert('comments', [
    {
      content: '1commentcomment',
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 1,
      PostId: 7,
    },
    {
      content: '2commentcomment',
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 2,
      PostId: 7,
    },
    {
      content: '3commentcomment',
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 3,
      PostId: 7,
    },
    {
      content: '4commentcomment',
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 4,
      PostId: 10,
    },
    {
      content: '5commentcomment',
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 5,
      PostId: 11,
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
