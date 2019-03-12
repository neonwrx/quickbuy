const User = require('../../models/User');

module.exports = (app) => {

  app.post('/account/signup', (req, res, next) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email,
      name
    } = body;

    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!name) {
      return res.send({
        success: false,
        message: 'Error: Name cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }

    email = email.toLowerCase();
    email = email.trim();

    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exist.'
        });
      }

      // Save the new user
      const newUser = new User();

      newUser.email = email;
      newUser.name = name;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          token: user._id,
          name: user.name,
          rights: user.userRights,
        });
      });
    });

  });

  app.post('/account/signin', (req, res, next) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
    } = body;


    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }

    email = email.toLowerCase();
    email = email.trim();

    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        console.log('err 2:', err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'Error: User is not found'
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error: Invalid password'
        });
      }

      // Otherwise correct user
      if (user.userRights === 'admin') {
        User.find({}, (err, arr) => {
          let partners = [];
          for (var i=0; i<arr.length; i++) {
            partners = [arr[i].email, ...partners];
          }
          return res.send({
            success: true,
            token: user._id,
            name: user.name,
            rights: user.userRights,
            partners: partners,
          });
        });
      } else {
        return res.send({
          success: true,
          token: user._id,
          name: user.name,
          rights: user.userRights,
        });
      }
    });
  });
};
