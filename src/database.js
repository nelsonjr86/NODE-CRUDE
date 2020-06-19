const mongoose = require("mongoose");

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;

const MONGODB_URI = `mongodb://localhost/note-teste`;

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,

    reconnectTries: 30,
    reconnectInterval: 500, // in ms
  })
  .then(db => console.log("DB is connected"))
  .catch(err => console.error(err));
