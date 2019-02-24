const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const validateProfileInput = require("../../validator/profile");
const validateExperienceInput = require("../../validator/experience");
const validateEducationInput = require("../../validator/education");
const router = express.Router();

//IMPORT DB USER.JS
const User = require("../../models/User");
//IMPORT DB PROFILE.JS
const Profile = require("../../models/Profile");

// TEST ROUTER
router.get("/test", (req, res) => {
  res.json({ messenger: "profile đã chạy" });
});
// END TEST ROUTER

//PASSPORT CHỨNG THỰC NGƯỜI DÙNG VÀ IN RA PROFIEL CỦA NGƯỜI DÙNG
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar", "email"])
      .then(profile => {
        if (!profile) {
          errors.noProfile = "Không có hồ sơ của người dùng này";
          return res.status(404).json(errors);
        } else {
          res.json(profile);
        }
      })
      .catch(err => {
        res.status(404).json(err);
      });
  }
);
//END PASSPORT CHỨNG THỰC NGƯỜI DÙNG VÀ IN RA PROFIEL CỦA NGƯỜI DÙNG

//ĐIỀU HƯỚNG URL ALL
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar", "email"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "Không có hồ sơ";
        return res.status(404).json(errors);
      } else {
        res.json(profile);
      }
    })
    .catch(err => {
      res.status(404).json({ profile: "Không có hồ sơ" });
    });
});
//END ĐIỀU HƯỚNG URL ALL

// ĐIỀU HƯỚNG URL THEO TÊN  NGƯỜI DÙNG
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar", "email"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "Không có hồ sơ người dùng này";
        res.status(404).json(errors);
      } else {
        res.json(profile);
      }
    })
    .catch(err => {
      res.status(404).json(err);
    });
});
// END ĐIỀU HƯƠNG URL THEO TÊN NGƯỜI DÙNG

// ĐIỀU HƯỚNG URL THEO ID
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar", "email"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "Không có hồ sơ người dùng này";
        res.status(404).json(errors);
      } else {
        res.json(profile);
      }
    })
    .catch(err => {
      res.status(404).json({ profile: "Không có hồ sơ người dùng này" });
    });
});
// END ĐIỀU HƯỚNG URL THEO ID

// TẠO (THÊM) THÔNG TIN CƠ BẢN NGƯỜI DÙNG
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // VALIDATE CHO CÁC TRƯỜNG INPUT
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //LẤY TRƯỜNG DỮ LIỆU INPUT ĐỐI VỚI 1 USER
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) {
      profileFields.handle = req.body.handle;
    }
    if (req.body.company) {
      profileFields.company = req.body.company;
    }
    if (req.body.webside) {
      profileFields.webside = req.body.webside;
    }
    if (req.body.location) {
      profileFields.location = req.body.location;
    }
    if (req.body.status) {
      profileFields.status = req.body.status;
    }
    if (req.body.bio) {
      profileFields.bio = req.body.bio;
    }
    if (req.body.gitHupUserName) {
      profileFields.gitHupUserName = req.body.gitHupUserName;
    }

    //SKILL LÀ MỘT MẢNG
    if (typeof req.body.skills !== "undefined") {
      //MỘT NGƯỜI CÓ THỂ CÓ NHIỀU SKILL NÊN SẼ CÁCH NHAU BĂNG ","
      profileFields.skills = req.body.skills.split(",");
    }
    //END TRƯỜNG SKILL

    //MẠNG XÃ HỘI USERS social
    profileFields.social = {};
    if (req.body.youtube) {
      profileFields.social.youtube = req.body.youtube;
    }
    if (req.body.twitter) {
      profileFields.social.twitter = req.body.twitter;
    }
    if (req.body.facebook) {
      profileFields.social.facebook = req.body.facebook;
    }
    if (req.body.linkedin) {
      profileFields.social.linkedin = req.body.linkedin;
    }
    if (req.body.instagram) {
      profileFields.social.instagram = req.body.instagram;
    }
    // END MẠNG XÃ HỘI USERS
    //END LẤY DỮ LIỆU INPUT ĐỐI VỚI 1 USER

    Profile.findOne({ user: req.user.id }).then(profile => {
      //NẾU ĐÃ CÓ THÔNG TIN SẼ UPDATE
      // console.log(profileFields);
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          .then(profile => {
            return res.status(200).json(profile);
          })
          .catch(err => {
            console.log(`update loi la  ${err}`);
          });
      }
      // NẾU CHƯA CÓ THÌ SẼ TẠO MỚI
      else {
        //KIỂM TRA NẾU ĐÃ TỒN TẠI
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "đã tồn tại";
            res.status(400).json(errors);
          }

          //LƯU LẠI BẢN GHI
          new Profile(profileFields)
            .save()
            .then(profile => {
              return res.status(200).json(profile);
            })
            .catch(err => {
              console.log(`save loi la ${err}`);
            });
        });
      }
    });
  }
);
// END TẠO THÔNG TIN CƠ BẢN NGƯỜI DÙNG

// THÊM THÔNG TIN KINH NGHIỆM NGƯỜI DÙNG
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // VALIDATE CHO CÁC TRƯỜNG INPUT
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      // THÊM MẢNG EXPERIENCE
      profile.experience.unshift(newExp);
      profile.save().then(profile => {
        return res.json(profile);
      });
    });
  }
);
// END THÊM THÔNG TIN KINH NGHIỆM NGƯỜI DÙNG

//XÓA THÔNG TIN KINH NGHIỆM
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //HIỆN THÔNG TIN REMOVE
        const removeIndex = profile.experience
          .map(item => {
            return item.id;
          })
          .indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        profile.save().then(profile => {
          return res.json(profile);
        });
      })
      .catch(err => {
        return res.status(404).json(err);
      });
  }
);
//END XÓA THÔNG TIN KINH NGHIỆM

// THÊM THÔNG TIN HỌC VẤN NGƯỜI DÙNG
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // VALIDATE CHO CÁC TRƯỜNG INPUT
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      // THÊM MẢNG EXPERIENCE
      profile.education.unshift(newEdu);
      profile.save().then(profile => {
        return res.json(profile);
      });
    });
  }
);
// END THÊM THÔNG TIN HỌC VẤN NGƯỜI DÙNG

//XÓA THÔNG TIN HỌC VẤN
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //HIỆN THÔNG TIN REMOVE
        const removeIndex = profile.education
          .map(item => {
            return item.id;
          })
          .indexOf(req.params.exp_id);
        profile.education.splice(removeIndex, 1);
        profile.save().then(profile => {
          return res.json(profile);
        });
      })
      .catch(err => {
        return res.status(404).json(err);
      });
  }
);
//END XÓA THÔNG TIN HỌC VẤN

// XÓA TOÀN BỘ THÔNG TIN + USER
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        return res.json({ success: true });
      });
    });
  }
);
// END XÓA TOÀN BỘ THÔNG TIN  + USER
module.exports = router;
