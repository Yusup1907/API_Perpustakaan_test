import Member from "../models/AnggotaModel.js";
import Book from "../models/BukuModel.js";

class Books {
  // Admin buat Rak Buku
  async createBookShelf(req, res, next) {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      book,
    });
  }

  // Anggota Meminjam Buku
  async borrowedBooks(req, res, next) {
    const { id_member, id_book } = req.body;

    const member = await Member.findById(id_member);

    // Jika anggota tidak ditemukan,
    if (!member) {
      throw { code: 500, message: "Member tidak ditemukan" };
    }

    // Data buku yang akan dipinjam
    const book = await Book.findById(id_book);

    // Jika buku tidak ditemukan, kirim error
    if (!book) {
      throw { code: 500, message: "Buku tidak ditemukan" };
    }

    // Validasi anggota tidak meminjam 2 buku atau lebih
    if (member.jumlah_buku_dipinjam >= 2) {
      throw {
        code: 409,
        message: "Anggota tidak bisa meminjam lebih dari 2 buku",
      };
    }

    // Validasi buku yang akan dipinjam sudah dipinjam oleh anggota lain
    if (book.status_pinjam === "Tersedia") {
      throw { code: 409, message: "Buku sudah dipinjam oleh anggota lain" };
    }

    // Validasi anggota saat ini sedang dihukum
    if (member.status_hukuman === "Dihukum") {
      throw { code: 401, message: "Anggota saat ini sedang dihukum" };
    }

    book.status_pinjam = "Tersedia";
    book.id_pinjam = id_member;
    await book.save();

    member.id_pinjam.push(id_book);

    member.jumlah_buku_dipinjam += 1;
    await member.save();

    res.status(200).json({
        success: true,
        book: book
      });
  }

  async returnBooks(req, res, next) {
    try {
        const member = await Member.findById(req.params.id);

        if (!memeber) return res.status(404).send({ error: 'Anggota tidak ditemukan' });

        const book = await Book.findById(req.params.id);

        if (!book) return res.status(404).send({ error: 'Buku tidak ditemukan' });

      if (
        book.status_pinjam == "dipinjam" &&
        member.id_pinjam == book.id_pinjam
      ) {
        // Selisih tanggal pengembalian dan tanggal peminjaman
        let selisih_hari =
          (tanggal_pengembalian - book.tanggal_pinjam) / (24 * 60 * 60 * 1000);
        if (selisih_hari > 7) {
          member.status_hukuman = "dihukum";
          member.tanggal_hukuman =
            tanggal_pengembalian + 3 * 24 * 60 * 60 * 1000;
        }
        member.kembalikan_buku(book);
        book.status_pinjam = "tersedia";
      } else {
        return res.status(400).json({ error: "Gagal mengembalikan buku buku" });
      }

      return res.status(201).json({
        message: "Buku berhasil dipinjam",
      });
    } catch (error) {
      if (!err.code) {
        err.code = 500;
      }
      return res.status(err.code).json({
        status: false,
        message: err.message,
      });
    }
  }

  // Menampilkan Semua Buku

  async getAllBooks(req, res, next) {
    const bukuTersedia = await Book.find({ status_pinjam: "Tersedia" });
    // jumlah buku yang tersedia
    const jumlahBukuTersedia = bukuTersedia.length;

    res.status(200).json({
      success: true,
      jumlahBukuTersedia,
    });
  }

  // cek Member

  async cekMember(req, res, next) {
    const member = await Member.find();

    member.forEach(async (item) => {
      const jumlahBukuDipinjam = await Book.find({ id_pinjam: item.id });
      item.jumlah_buku_dipinjam = jumlahBukuDipinjam.length;
    });

    res.status(200).json({
      success: true,
      member,
    });
  }
};


export default new Books();