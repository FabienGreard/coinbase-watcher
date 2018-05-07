// const headers = (key, secret, passphrase) => {
//   return {
//     'Content-Type': 'application/json',
//     CB-ACCESS-KEY: key,
//     CB-ACCESS-SIGN: sign,
//     CB-ACCESS-TIMESTAMP: timestamp,
//     CB-ACCESS-PASSPHRASE: passphrase,
//   };
// };

//https://docs.gdax.com/#authentication

class headers {
  constructor() {
    return {
      'Content-Type': 'application/json'
    };
  }
}

export { headers };
