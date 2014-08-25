
var schemas = {
    
    user: {
        person: {
            first: String,
            last: String,
            suffix: String,
            birthday: Date
        },
        address: {
            line1: String,
            line2: String,
            city: String,
            state: String,
            postalCode: String
        },
        email: { type: String, required: true, unique: true },
        login: {
            username: { type: String, required: true, unique: true },
            password: String,
            token: String,
            tokenVaildThrough: Date,
            lastVisit: Date
        },
        create_date: {
            type: Date,
            default: Date.now
        },
        photo: {
            small: String,
            big: String
        }
    }
}

module.exports = schemas;