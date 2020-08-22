const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to DB!')
);
mongoose.set("useFindAndModify", false);
mongoose.set('useCreateIndex', true);
