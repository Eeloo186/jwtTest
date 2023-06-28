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
   await queryInterface.bulkInsert('users', [
    {
      userId: 'id1',
      password: 'pw1',
      nickname: 'nick1',
      email: '1@test.com',
      address1: 'address1',
      address2: 'address2',
      address3: 'address3',
      provider: 'local',
      snsId: null,
      pet: true,
      rank: '1',
      createdat: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 'id2',
      password: 'pw2',
      nickname: 'nick2',
      email: '2@test.com',
      address1: 'address1',
      address2: 'address2',
      address3: 'address3',
      provider: 'local',
      snsId: null,
      pet: false,
      rank: '3',
      createdat: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 'id3',
      password: 'pw3',
      nickname: 'nick3',
      email: '3@test.com',
      address1: 'address1',
      address2: 'address2',
      address3: 'address3',
      provider: 'local',
      snsId: null,
      pet: false,
      rank: '3',
      createdat: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 'id4',
      password: 'pw4',
      nickname: 'nick4',
      email: '4@test.com',
      address1: 'address1',
      address2: 'address2',
      address3: 'address3',
      provider: 'local',
      snsId: null,
      pet: true,
      rank: '2',
      createdat: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 'id5',
      password: 'pw5',
      nickname: 'nick5',
      email: '5@test.com',
      address1: 'address1',
      address2: 'address2',
      address3: 'address3',
      provider: 'local',
      snsId: null,
      pet: false,
      rank: '1',
      createdat: new Date(),
      updatedAt: new Date(),
    },
   ]);
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
