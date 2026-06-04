const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const borrowingController =
require("../controllers/borrowingController");

router.get(
    "/",
    borrowingController.getBorrowings
);

router.get(
    "/:id",
    borrowingController.getBorrowingById
);

router.post(
    "/",
    auth,
    borrowingController.createBorrowing
);

router.put(
    "/:id",
    auth,
    borrowingController.updateBorrowing
);

router.patch(
    "/:id",
    auth,
    borrowingController.patchBorrowing
);

router.delete(
    "/:id",
    auth,
    borrowingController.deleteBorrowing
);

module.exports = router;