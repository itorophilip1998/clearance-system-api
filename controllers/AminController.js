 
const data = {
     email:"admin@admin.com",
     password:"admin",
     role:"admin",
 }
exports.creat_admin = async (req, res) => {
  try { 
    await User.create(data)
      .then((result) => { 
        res.json({
          result, 
          msg: "Admin Succesfully",
        });
      })
       
  } catch (error) {}
};

exports.get_asAdmin = async (req, res) => {
  try {
     
  } catch (error) {}
};

 