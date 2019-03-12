const Items = require('../../models/Items');

module.exports = (app) => {

  app.get('/items', (req, res, next) => {
    const { query } = req;
    let { page, category, orderBy, orderAsc, searchText } = query;
    let searchQuery = {};
    let sortBy = {};
    const pagesize = 16;

    Items.countDocuments().then((count) => {
      if (!searchText.length || searchText === 'undefined') {
        searchText = {$regex: '.*'};
      } else {
        searchText = {$regex: '' + searchText, $options: "si"};
      }

      if (category === 'sale') {
        searchQuery = {sale: true, name: searchText}
      } else if (category === 'undefined') {
        searchQuery = {name: searchText};
      } else {
        searchQuery = {category: category, name: searchText}
      }
      if (orderBy == 0) {
        sortBy = {'bought': orderAsc}
      } else if (orderBy == 1) {
        sortBy = {'added': orderAsc}
      } else if (orderBy == 2) {
        sortBy = {'price': orderAsc}
      }

      Items.find(searchQuery, (err, items) => {
      // Items.find({name: {$regex: ".*"}}, (err, items) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          items: items,
          pages: count
        });
      }).skip(pagesize*(page-1)).limit(pagesize).sort(sortBy);
    });
  });

  app.post('/items/new', (req, res, next) => {

    const { body, headers } = req;
    const { authorization } = headers;
    const { data } = body;
    const {
      prodName,
      partner,
      price,
      descr,
      images,
      category,
      sale
    } = data;

    console.log('data', data);

    if (authorization.startsWith("Bearer ")){
       token = authorization.substring(7, authorization.length);

       if (!prodName || !price || !category) {
         return res.send({
           success: false,
           message: 'Error: Fields are cannot be blank.'
         });
       }

       Items.find({}, (err, items) => {
         if (err) {
           console.log(err);
           return res.send({
             success: false,
             message: 'Error: Server error 1'
           });
         }
         const id = items.length + 1;
         const newItem = new Items();
         console.log('images', images);

         newItem.id = id;
         newItem.name = prodName;
         newItem.partner = partner;
         newItem.price = price;
         newItem.descr = descr;
         newItem.images = images;
         newItem.category = category;
         newItem.sale = sale;
         newItem.save((err, item) => {
           if (err) {
             return res.send({
               success: false,
               message: 'Error: Server error 2'
             });
           }
           console.log('item', item);
           return res.send({
             success: true,
             item: item,
           });
         });
       });
    } else {
      return res.send({
        success: false,
        message: 'Error: Authentification failed.'
      });
       //Error
    }
  });

  app.put('/items/edit', (req, res, next) => {

    const { headers, body } = req;
    const { authorization } = headers;
    const { data, uId } = body;
    console.log('data', data);
    console.log('uId', uId);
    // const {
      //   prodName,
      //   price,
      //   descr,
      //   images,
      //   category,
      //   sale
      // } = data;

      if (authorization.startsWith("Bearer ")){
        token = authorization.substring(7, authorization.length);

        // if (!prodName || !price || !category) {
          //   return res.send({
            //     success: false,
            //     message: 'Error: Fields are cannot be blank.'
            //   });
            // }

            Items.findOneAndUpdate({_id: uId}, data, null, (err) => {
              if (err) {
                console.log(err);
                return res.send({
                  success: false,
                  message: 'Error: Server error 1'
                });
              }
              return res.send({
                success: true,
                message: 'Updete success'
              });
            });
          } else {
            return res.send({
              success: false,
              message: 'Error: Authentification failed.'
            });
            //Error
          }
        });

  app.delete('/items/delete', (req, res, next) => {

    const { headers, query } = req;
    const { authorization } = headers;
    const { uId } = query;

    if (authorization.startsWith("Bearer ")){
       token = authorization.substring(7, authorization.length);

       if (!uId) {
         return res.send({
           success: false,
           message: 'Error: Fields are cannot be blank.'
         });
       }

       Items.findOneAndDelete({_id: uId}, (err) => {
         if (err) {
           console.log(err);
           return res.send({
             success: false,
             message: 'Error: Server error 1'
           });
         }
         return res.send({
           success: true,
           message: 'Deleted success'
         });
       });
    } else {
      return res.send({
        success: false,
        message: 'Error: Authentification failed.'
      });
       //Error
    }
  });

};
