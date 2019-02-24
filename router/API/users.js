const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const router = express.Router();

// VALIDATE CHO INPUT
const validateRegisterInput = require("../../validator/register");
const validateLoginInput = require("../../validator/login");

// MODELS USER
const User = require("../../models/User");
router.get("/test", (req, res) => {
  res.json({ messenger: "users đã chạy" });
});

// CHỨC NĂNG THÊM MỚI USER
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // KIỂM TRA VALIDATE
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email này đã tồn tại";
      return res.status(400).json(errors);
    } else {
      //ĐẶT ẢNH ĐẠI DIỆN BẰNG gravatar
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg",
        d: "404"
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });
      //END ĐẶT ẢNH ĐẠI DIỆN BẰNG gravatar

      // MÃ HÓA PASSS
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
      // END MÃ HÓA PASSS
    }
  });
});
// END CHỨC NĂNG THÊM MỚI USER

// CHỨC NĂNG ĐĂNG NHẬP USER
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // KIỂM TRA VALIDATE
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  // //KIỂM TRA KHÔNG ĐIỀN EMAIL PASS
  // if (req.body.email.trim().length == 0) {
  //   return res.status(411).json({ email: "Bạn chưa nhập email" });
  // }
  // if (req.body.password.trim().length == 0) {
  //   return res.status(411).json({ password: "Bạn chưa nhập password" });
  // }

  // TÌM NGƯỜI DÙNG THÔNG QUA EMAIL ĐÃ INPUT
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "Email này không tồn tại";
      return res.status(404).json(errors);
    }
    // KIỂM TRA PASSS
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // res.json({ messenger: "Đăng nhập thành công" });

        // TOKEN ĐĂNG NHẬP
        //TẠO MỘT KHỐI CHỨA MÃ TOKEN
        const payLoad = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        // console.log(payLoad);
        jwt.sign(
          payLoad,
          keys.secretOrKey,
          { expiresIn: "2d" },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              success: true,
              token: "bearer " + token
            });
          }
        );
        //END TOKEN ĐĂNG NHẬP
      } else {
        errors.password = "Mật khẩu không đúng";
        res.status(400).json(errors);
      }
    });
  });
});
// END CHỨC NĂNG ĐĂNG NHẬP USER

//PASSPORT CHỨNG THỰC NGƯỜI DÙNG
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    res.json({
      // messenger: "Kết nối thành công"
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
//END PASSPORT CHỨNG THỰC NGƯỜI DÙNG
module.exports = router;
