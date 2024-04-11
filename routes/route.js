const express = require('express')
const app = express()
const router = express.Router();

const {getAllData, getData, createUser, updateUser, deleteUser} = require('../controllers/controller')

router.route('/').get(getAllData).post(createUser)
router.route('/:id').get(getData).patch(updateUser).delete(deleteUser)

module.exports = router;