// Create token and saving that in cookies

const sendToken = (member, statusCode, res) => {
    const token = member.getJwtToken();
  
    //  Options for cookies
    const options = {
      expires: new Date(
        Date.now() + 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      member,
      token
    });
  };
  
  export default sendToken;
  