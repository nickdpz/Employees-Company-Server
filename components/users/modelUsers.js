const { Schema, model } = require('mongoose');

const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    userName: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/],
    },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    role: {
        type: String,
        enum: ['client', 'customer', 'admin', 'worker', 'none'],
        default: 'none',
        required: true
    },
    phone: { type: String, default: '0000000000', required: true },
    document: { type: String, required: false, default: '' },
    active: { type: Boolean, default: true, required: true },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }
});

userSchema.index({
    userName: 'text',
    name: 'text',
    lastName: 'text'
});

userSchema.methods.equalPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.encryptPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }
    next();
});


module.exports = model('User', userSchema);