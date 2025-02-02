const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminAuthModal = require("../../modals/adminAuthModal");
const { findById } = require("../../modals/productModal");
const adminBioModel =  require("../../modals/adminBioModel")


class AdminsAuthController {
    admin_register = async(req, res) => {
        try {
            const { name, email, phone, password } = req.body;

            const existingUser = await adminAuthModal.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await adminAuthModal.create({
                name,
                email,
                phone,
                password: hashedPassword
            });

            // Generate token
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET || 'rehmanarshad',
                { expiresIn: '7d' }
            );

            return res.status(201).json({
                message: "Registration successful",
                token,
                user: { id: user.id, name: user.name, phone: user.phone, email: user.email }
            });

        } catch (error) {
            return res.status(500).json({ message: "Server error" });
        }
    }

    admin_login = async (req, res) => {
        const { email, password} = req.body;

        try {
            const user = await adminAuthModal.findOne({ email });
            if(!user){
                return res.status(400).json({ message: "User not found" });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.status(400).json({ message: "Invalid password" });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'rehmanarshad', { expiresIn: '7d' });
            return res.status(200).json({ message: "Login successful", success: true, token, user: { id: user.id, name: user.name, phone: user.phone, email: user.email } });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    admin_logout = async (req, res) => {
        res.clearCookie("customerToken");
        return res.status(200).json({ message: "Logout successful", success: true });
    }

    getadminById = async (req, res) => {
        try {
            const { id } = req.body;
            const user = await adminAuthModal.findById(id);
            return res.status(200).json({ message: "User get successfully", user });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    updatepassword  =  async(req , res) =>{
          try{
                  const {email , password , newPassword  , confirmPassword}  = req.body ;

                   if(!email  || !password  || !newPassword || !confirmPassword) 
                   {
                       return res.status(200).json({message : "all field are required"});
                   }

                   if (newPassword !== confirmPassword) {
                    return res.status(400).json({ message: "New password and confirm password do not match" });
                  }

                   const adminDetails  = await adminAuthModal.findOne({email})

                   if(!adminDetails)
                   {
                      return res.status(200).json({message : "all field are required"});
                   }

                   const isPasswordValid = await bcrypt.compare(password, adminDetails.password)

                   if(isPasswordValid)
                   {    
                            
                          const hashedNewPassword = await bcrypt.hash(newPassword, 10);
                          
                          adminDetails.password = hashedNewPassword;

                          await adminDetails.save();

                          return res.status(200).json({ message: "Password updated successfully" });
                         
                        
                   }
                   else
                   {
                           return res.status(400).json({ message: "Current password is incorrect" });
                   }
          }
          catch(error)
          {
                return res.status(500).json({ message: "An error occurred while updating the password" , error:error.message });
          }
    }
    
    getAdminDetails = async(req , res)=>{
        try{  
                
                const  adminDetails =  await adminAuthModal.find({});

                if(adminDetails.length === 0)
                {
                    return res.status(200).json({message : "admin details not exist"});
                }

                return res.status(200).json({message : "admin details" , adminDetails});

              
               

        }
        catch(error)
        {
            return res.status(500).json({ message: "An error occurred while fetching admin" , error:error.message });
        }

    }
   
    updateDetails   = async(req , res) =>{
         try{  

            const { adminId , email ,username, bio, image, fullName, phone } = req.body;

            if (!adminId) {
                return res.status(400).json({ message: "adminId is required" });
            }
    
            // Find admin details from authentication model
            const authDetails = await adminAuthModal.findById(adminId);
    
            if (!authDetails) {
                return res.status(404).json({ message: "Admin authentication details not found" });
            }
            // Check if admin exists in Admin model
            let adminDetails = await adminBioModel.findOne({ adminid: adminId });

            console.log(adminDetails);
    
            if (adminDetails  === null) {
                // Create a new admin entry if it does not exist
                adminDetails = new adminBioModel({
                    adminid: adminId,
                    email: email || authDetails.email,
                    username: username || authDetails.username,
                    bio: bio || "",
                    image: image || "",
                    fullName: fullName || "",
                    phone: phone || ""
                });
                
            } else {
                // Update existing admin details
                 adminDetails.email = email || adminDetails.email;
                adminDetails.username = username || adminDetails.username;
                adminDetails.bio = bio || adminDetails.bio;
                adminDetails.image = image || adminDetails.image;
                adminDetails.fullName = fullName || adminDetails.fullName;
                adminDetails.phone = phone || adminDetails.phone;
            }
    
            // Save the updated or newly created admin details
            await adminDetails.save();
         
    
            return res.status(200).json({ message: "Admin details updated successfully", admin: adminDetails });

         }
         catch(error)
         {
            return res.status(500).json({ message: "An error occurred while fetching admin" , error:error.message });
         }

}


}

module.exports = new AdminsAuthController()