module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "1337",
    },
  },
  compilers: {
    solc: {
      version: "0.8.19", // instead of 0.8.20
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
        evmVersion: "istanbul", // stable for Ganache
      },
    },
  },
};
