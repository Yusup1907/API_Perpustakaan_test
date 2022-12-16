import express from "express"
import Member from "../controllers/AnggotaController.js"


const router = express.Router();



router.route('/member/daftar').post(Member.creatMember);
router.route('/member/login').post(Member.login);
router.route('/member/logout').get(Member.logout);
router.route('/me').get(Member.memberDetails);





export default router