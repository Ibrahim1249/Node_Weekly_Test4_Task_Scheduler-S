const express = require("express");

const router = express.Router();

router.post("/task" , handleAddTask);
router.get("/task" , getAllTask);
router.get("/logs",getAllLogs);


module.exports = router