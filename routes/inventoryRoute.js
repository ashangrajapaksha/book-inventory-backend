const express = require("express");
const inventryController = require("../controllers/inventoryController");
const router = express.Router();

router.get("/", inventryController.getAllBooks);
router.post("/addNewBook", inventryController.addNewBook);
router.get("/:id", inventryController.getBookById);
router.patch("/:id", inventryController.updateBook);
router.delete("/:id", inventryController.deleteBook);

module.exports = router;
