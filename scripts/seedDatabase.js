require('dotenv').config();
const { connect } = require('../database');
const storeUser = require('../components/users/store');
const storeCompany = require('../components/companies/store');
const fields = require('../fields/index.json');

const main = async () => {
    const date = new Date();
    await connect();
    const company = await storeCompany.addCompany(fields.company);
    for (const user of fields.users) {
        await storeUser.addUser({ ...user, date, companyId: company._id });
        console.log('create User ', user.userName);
    }
    process.exit();
};
main();