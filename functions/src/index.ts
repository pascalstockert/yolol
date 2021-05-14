const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');

const app = express();

// Allow cross-origin requests
app.use(cors({ origin: true }));

app.get('/', (req: any, res: any) => res.send('success!'));

// Root at /widgets/
exports.widgets = functions.https.onRequest(app);
