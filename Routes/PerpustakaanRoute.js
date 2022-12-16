import express from "express"
import Books from "../controllers/PerpustakaanController.js"


const router = express.Router();


router.route('/tambah-buku').post(Books.createBookShelf);
router.route('/buku/pinjam/:id').put(Books.borrowedBooks);
router.route('/buku/kembalikan/:id').post(Books.returnBooks);
router.route('/buku/tersedia').get(Books.getAllBooks);
router.route('/member/details').get(Books.cekMember);


export default router