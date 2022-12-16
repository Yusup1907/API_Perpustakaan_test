import Member from "../models/AnggotaModel.js"

const emailExist = async (email) => {
    try {

        const member = await Member.findOne({ email: email });
        if(!member) { return false }
        return true;
    } catch (err) {
        return false;
    }
}

export default emailExist;