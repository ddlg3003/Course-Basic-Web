const { Router } = require('express');
const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

// Chay vao siteController.index va render ra home.hbs
router.get('/', siteController.index);

// Xuat value cua router ra va dung cho routes/index
module.exports = router;
    