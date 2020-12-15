const Company = require('./modelCompanies');

const addCompany = async (newCompany) => {
    const myCompany = new Company(newCompany);
    const addCompany = await myCompany.save();
    return addCompany;
};

const listCompanies = async (filter) => {
    const users = await Company.find(filter);
    return users;
};

const getCompany = async (filter) => {
    const user = await Company.findOne(filter);
    return user;
};

const updateCompany = async (_id, name = null, nit=null, description = null) => {
    const foundCompany = await Company.findOne({ _id });
    if(foundCompany){
        if (name) foundCompany.name = name;
        if (nit) foundCompany.nit = nit;
        if (description) foundCompany.description = description;
        await foundCompany.save();
        return true;
    } else {
        return false;
    }
};

const deleteCompany = async (_id) => {
    const foundCompany = await Company.findOne({ _id });
    foundCompany.active = false;
    await foundCompany.save();
};

const deleteCompanyDefinitive = (_id) => (Company.deleteOne({ _id }));

module.exports = {
    addCompany,
    listCompanies,
    getCompany,
    updateCompany,
    deleteCompany,
    deleteCompanyDefinitive
};