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
   await queryInterface.bulkInsert('posts', [
    {
      title: 'title1notice',
      view: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
      BoardId: 1,
      UserId: 1,
    },
    {
      title: 'title2notice',
      view: 101,
      createdAt: new Date(),
      updatedAt: new Date(),
      BoardId: 1,
      UserId: 1,
    },
    {
      title: 'title3notice',
      view: 102,
      createdAt: new Date(),
      updatedAt: new Date(),
      BoardId: 1,
      UserId: 1,
    },
    {
      title: 'title1info',
      view: 110,
      createdAt: new Date(),
      updatedAt: new Date(),
      BoardId: 2,
      UserId: 3,
    },
    {
      title: 'title2info',
      view: 120,
      createdAt: new Date(),
      updatedAt: new Date(),
      BoardId: 2,
      UserId: 4,
    },
    {
      title: 'title3info',
      view: 130,
      createdAt: new Date(),
      updatedAt: new Date(),
      BoardId: 2,
      UserId: 5,
    },
    {
      title: 'title1community',
      view: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      BoardId: 3,
      UserId: 1,
    },
    {
      title: 'title2community',
      view: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      BoardId: 3,
      UserId: 2,
    },
    {
      title: 'title3community',
      view: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      BoardId: 3,
      UserId: 3,
    },
    {
      title: 'title4community',
      view: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
      BoardId: 3,
      UserId: 5,
    },
    {
      title: 'title5community',
      view: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
      BoardId: 3,
      UserId: 5,
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
