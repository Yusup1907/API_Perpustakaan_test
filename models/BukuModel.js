import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  judul: String,
  pengarang: String,
  tahun_terbit: Number,
  status_pinjam: String,
  id_pinjam: String, // ID anggota yang meminjam buku
});

export default mongoose.model("Book", bookSchema);
