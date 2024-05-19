const BookInventryModel = require("../models/inventoryModel");

/**
 * Adds a new book to the inventory.
 */
const addNewBook = async (req, res) => {
  try {
    const newBook = new BookInventryModel({
      title: req.body.title,
      author: req.body.author,
      ISBN: req.body.ISBN,
      price: req.body.price,
    });

    const createBook = await newBook.save();

    res.status(200).json({
      message: "Successfully saved!",
      result: createBook,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      error: error.message || error,
    });
  }
};

/*
 * Retrieves a list of books with pagination.
 */
const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided

    const skip = (page - 1) * limit;

    // Retrieve books with pagination
    const books = await BookInventryModel.find().skip(skip).limit(limit).lean();

    // Get the total count of books
    const totalBooks = await BookInventryModel.countDocuments();

    res.status(200).json({
      message: "Books retrieved successfully",
      page,
      limit,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      books,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      error: error.message || error,
    });
  }
};

/*
 * Retrieves a list of books by id.
 */
const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const findBook = await BookInventryModel.findOne({ _id: bookId });
    res.status(200).json({
      result: findBook,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      error: error.message || error,
    });
  }
};

/*
 * Update book
 */
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateBook = {
      title: req.body.title,
      author: req.body.author,
      ISBN: req.body.ISBN,
      price: req.body.price,
    };
    console.log(updateBook);

    const updatedBook = await BookInventryModel.findByIdAndUpdate(
      id,
      updateBook,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Successfully updated!",
      result: updatedBook,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      error: error.message || error,
    });
  }
};

/*
 * Delete book
 */
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await BookInventryModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Successfully deleted!",
      result: deleteBook,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      error: error.message || error,
    });
  }
};

module.exports = {
  addNewBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
