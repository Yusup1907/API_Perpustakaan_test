import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const memberSchema = new mongoose.Schema(
  {
    nama: String,
    email: {
      type: String,
      required: [true, "Masukkan email Anda"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Silakan masukkan kata sandi Anda!"],
      minlength: [6, "Kata sandi harus lebih dari 6 karakter"],
      select: false,
    },
    jumlah_buku_dipinjam: Number,
    id_pinjam: [String], // Array of IDs buku yang dipinjam
    status_hukuman: String,
    tanggal_hukuman: Date,
    role: {
      type: String,
      default: "member",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

// Hash password
memberSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// compare password
memberSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// jwt token
memberSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export default mongoose.model("Member", memberSchema);
