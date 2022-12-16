import Member from "../models/AnggotaModel.js";
import emailExist from "../utils/emailExist.js";
import sendToken from "../utils/jsonWebToken.js";


class Anggotas {
  // Register
  async creatMember(req, res, next) {
    try {
      // Pengecekan request Body Required
      if (!req.body.nama) {
        throw { code: 428, message: "Nama diperlukan" };
      }
      if (!req.body.email) {
        throw { code: 428, message: "Email diperlukan" };
      }
      if (!req.body.password) {
        throw { code: 428, message: "Password diperlukan" };
      }

      // Pengecekan email apakah sudah ada
      const isEmailExist = await emailExist(req.body.email);
      if (isEmailExist) {
        throw { code: 409, message: "email exist" };
      }

      const member = await Member.create(req.body);
      if (!member) {
        throw { code: 500, message: "member register failed" };
      }

      sendToken(member, 200, res);
    } catch (err) {
      if (!err.code) {
        err.code = 500
      }
      return res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }

  // Login

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { code: 400, message: "Please enter your email & password" };
      }

      const member = await Member.findOne({ email }).select("+password");
      if (!member) {
        throw {
          code: 401,
          message: "Member is not found with this email & password",
        };
      }

      const hashPassword = await member.comparePassword(password);
      if (!hashPassword) {
        throw {
          code: 401,
          message: "Member is not found with this email & password",
        };
      }

      //generate token
      
      sendToken(member, 200, res);
    } catch (err) {
      if (!err.code) {
        err.code = 500
      }
      return res.status(err.code).json({
        status: false,
        message: err.message,
      });
    }
  }

  // Logout Member

  async logout(req, res, next) {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logout Success",
    });
  }


  // Get Member Details
  async memberDetails(req,res,next) {
    const member = await Member.findById(req.user.id);

    res.status(200).json({
      success: true,
      member,
    });
  }
}

export default new Anggotas();
