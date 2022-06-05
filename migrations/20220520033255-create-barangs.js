"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("barangs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      store_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "stores",
          key: "id",
          as: "store_id",
        },
      },
      nama_barang: {
        type: Sequelize.STRING,
      },
      harga: {
        type: Sequelize.INTEGER,
      },
      deskripsi: {
        type: Sequelize.STRING,
      },
      kategori: {
        type: Sequelize.ENUM(
          "elektronik",
          "makanan",
          "fashion",
          "aksesoris",
          "buku",
          "hiburan"
        ),
      },
      diskon: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      foto_barang: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("barangs");
  },
};
