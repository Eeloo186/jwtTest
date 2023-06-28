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
   await queryInterface.bulkInsert('contents', [
    {
      content: '1contentcontentcontentcontent',
      createdAt: new Date(),
      updatedAt: new Date(),
      PostId: 1,
    },
    {
      content: '2contentcontentcontentcontent',
      createdAt: new Date(),
      updatedAt: new Date(),
      PostId: 2,
    },
    {
      content: '3contentcontentcontentcontent',
      createdAt: new Date(),
      updatedAt: new Date(),
      PostId: 3,
    },
    {
      content: '4contentcontentcontentcontent',
      createdAt: new Date(),
      updatedAt: new Date(),
      PostId: 4,
    },
    {
      content: '5contentcontentcontentcontent',
      createdAt: new Date(),
      updatedAt: new Date(),
      PostId: 5,
    },
    {
      content: '6contentcontentcontentcontent',
      createdAt: new Date(),
      updatedAt: new Date(),
      PostId: 6,
    },
    {
      content: '7contentcontentcontentcontent',
      createdAt: new Date(),
      updatedAt: new Date(),
      PostId: 7,
    },
    {
      content: '8contentcontentcontentcontent',
      createdAt: new Date(),
      updatedAt: new Date(),
      PostId: 8,
    },
    {
      content: '9contentcontentcontentcontent',
      createdAt: new Date(),
      updatedAt: new Date(),
      PostId: 9,
    },
    {
      content: '10contentcontentcontentcontent',
      createdAt: new Date(),
      updatedAt: new Date(),
      PostId: 10,
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
