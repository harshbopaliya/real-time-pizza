const passport = require("passport");
const local = require("passport-local");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
function authController() {
  const _getRedireccUrl = (req) => {
    return req.user.role === "admin" ? "/admin/orders" : "customer/orders";
  };
  //factory function
  return {
    //crud controller
    login(req, res) {
      res.render("auth/login");
    },
    postLogin(req, res, next) {
      const { email, password } = req.body;
      // Validate request
      if (!email || !password) {
        req.flash("error", "All fields are required");
        return res.redirect("/login");
      }
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }
        req.login(user, () => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }
          return res.redirect(_getRedireccUrl(req));
        });
      })(req, res, next);
    },

    register(req, res) {
      res.render("auth/register");
    },
    async postRegister(req, res) {
      const { name, email, password } = req.body;
      // Validate request
      if (!name || !email || !password) {
        req.flash("error", "All fields are required");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }

      // Check if email exists
      // Check if email already exists
      try {
        const emailExists = await User.exists({ email: email });
        if (emailExists) {
          req.flash("error", "Email already taken");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }
      } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong");
        return res.redirect("/register");
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a user
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      user
        .save()
        .then((user) => {
          // Login
          return res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "Something went wrong");
          return res.redirect("/register");
        });
    },
    logout(req, res) {
      req.logout((err) => {
        // Add a callback function
        if (err) {
          // Handle errors gracefully, e.g., using flash messages
          req.flash("error", "Something went wrong during logout");
          return res.redirect("/login");
        }
        res.redirect("/login"); // Redirect after successful logout
      });
    },
  };
}

module.exports = authController;
