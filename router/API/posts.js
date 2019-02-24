const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();

//IMPORT DB USER.JS
const User = require("../../models/User");
//IMPORT DB POST.JS
const Post = require("../../models/Post");
//IMPORT DB PROFILE.JS
const Profile = require("../../models/Profile");
// VALIDATE
const validatePostInput = require("../../validator/post");

// TEST ROUTER
router.get("/test", (req, res) => {
  res.json({ messenger: "posts đã chạy" });
}); // END TEST ROUTER

//TẠO CHAT
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    // KIỂM TRA VALIDATE
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => {
      return res.json(post);
    });
  }
);
//END TẠO CHÁT

// HIỂN THỊ POST
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      return res.status(200).json(posts);
    })
    .catch(err => {
      return res.status(404).json(err);
    });
});
// END HIỂN THỊ POST

// HIỂN THỊ POST BẰNG ID
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      return res.status(200).json(post);
    })
    .catch(err => {
      return res.status(404).json(err);
    });
});
// END HIỂN THỊ POST BẰNG ID

// XÓA POST
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        // KIỂM TRA QUYỀN SỞ HỮU BÀI POST
        // console.log(post.user);
        if (post.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ noAuthorized: "Đây không phải bài bạn đã đăng" });
        } else {
          // CHO PHÉP XÓA
          return post
            .remove()
            .then(() => {
              return res.json({ success: true });
            })
            .catch(err => {
              return res.status(404).json(err);
            });
        }
      });
    });
  }
);
// END XÓA POST

// CHỨC NĂNG LIKE
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        // KIỂM TRA QUYỀN SỞ HỮU LIKE
        // console.log(
        //   post.likes.filter(like => like.user.toString() === req.user.id)
        // );
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res.status(400).json({ liked: "Bạn đã like bài này" });
        } else {
          // ADD USER VÀO MẢNG LIKES
          post.likes.unshift({ user: req.user.id });
          post
            .save()
            .then(post => {
              return res.status(200).json(post);
            })
            .catch(err => {
              return res.status(404).json(err);
            });
        }
      });
    });
  }
);
// END CHỨC NĂNG LIKE

// CHỨC NĂNG UNLIKE
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // KIỂM TRA QUYỀN SỞ LIKE
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "Bạn chưa like bài viết này" });
          }
          // CHẤP NHẬN XÓA LIKE
          const removeIndex = post.likes
            .map(item => {
              return item.user.toString();
            })
            .indexOf(req.user.id);
          post.likes.splice(removeIndex, 1);
          // SAVE
          post.save().then(post => {
            return res.status(200).json(post);
          });
        })
        .catch(err => {
          return res.status(404).json(err);
        });
    });
  }
);
// END CHỨC NĂNG UNLIKE

// CHỨC NĂNG COMMENT VÀO POST
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id).then(post => {
      const { errors, isValid } = validatePostInput(req.body);
      // KIỂM TRA VALIDATE
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };
      // ADD newComment VÀO MẢNG comments
      post.comments.unshift(newComment);
      // SAVE
      post
        .save()
        .then(post => {
          return res.status(200).json(post);
        })
        .catch(err => {
          return res.status(404).json(err);
        });
    });
  }
);
// END CHỨC NĂNG COMMENT VÀO POST

// CHỨC NĂNG DELETE COMMENT VÀO POST
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id).then(post => {
      console.log(req.params.id);
      // KIỂM TRA QUYỀN SỞ HỮU COMMENT
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(401)
          .json({ noAuthorized: "Đây không phải comment bạn đã đăng" });
      }
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);
      post.comments.splice(removeIndex, 1);
      // SAVE
      post
        .save()
        .then(post => {
          return res.status(200).json(post);
        })
        .catch(err => {
          return res.status(404).json(err);
        });
    });
  }
);
// END CHỨC NĂNG DELETE COMMENT VÀO POST

module.exports = router;
