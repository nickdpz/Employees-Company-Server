const storeCompany = require('./store');

const addCompany = async (name, description = undefined, nit = undefined) => {
    const section = 'CompaniesController | addCompany';
    try {
        let newCompany = await storeCompany.addCompany({ name, description, nit }); // add user
        return newCompany;
    } catch (e) {
        console.error(`ends ${section} with error ${e}`);
        throw (e);
    }
};

const listCompanies = async (filterCompany) => (storeCompany.listCompanies(filterCompany));

const getCompany = async (_id) => (await storeCompany.getCompany({ _id }));

const updateCompany = async (id, email, phone) => {
    const section = 'CompaniesController | updateCompany';

    try {
        const result = await storeCompany.updateCompany(id, null, email, phone);
        if (result) return ('ok');
        throw { code: 400, message: 'bad id' };
    } catch (e) {
        console.error(`ends ${section} with error ${e}`);
        throw (e);
    }
};

const deleteCompany = async (id) => {
    const section = 'CompaniesController | deleteCompany';

    try {
        if (process.env.NODE_ENV === 'test') {
            await storeCompany.deleteCompanyDefinitive(id);
        } else {
            await storeCompany.deleteCompany(id);
        }
        return ('ok');
    } catch (e) {
        console.error(`ends ${section} with error ${e}`);
        throw (e);
    }
};

module.exports = {
    addCompany,
    listCompanies,
    updateCompany,
    deleteCompany,
    getCompany,
};