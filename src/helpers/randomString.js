const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;

const generateRandomString = (numberLength) => {
  let result = '';
  for (let i = 0; i < numberLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

module.exports = {
  generateRandomString,
};
