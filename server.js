const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Use ROutes
const useRoutes = require('./routes/routes');
useRoutes(app);

const PORT = process.env.PORT || 8000
mongoose.connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.fvpb1.mongodb.net/vacation
`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is Running at http://localhost:${PORT}`);
        })
    })
    .catch(error => {
        console.log(error);
    })

