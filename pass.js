const bcrypt = require('bcrypt');

async function hashPassword() {
    const pass = 'admin123';
    const hash = await bcrypt.hash(pass,10);
    console.log(hash);
}

hashPassword();