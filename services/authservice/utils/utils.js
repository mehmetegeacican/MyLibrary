const bcrypt = require('bcrypt');

const comparePasswords = async (password1,password2) => {
   return  await bcrypt.compare(password1,password2);
}


module.exports = {
    comparePasswords
}