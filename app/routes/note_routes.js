var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.post('/notes', (req, res) => {
    const note = { title: req.body.title, body: req.body.body };
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({'Error': 'An error has occured'});
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'Error': 'An error has occured'});
      } else {
        res.send(item);
      }
    });
  });

  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { title: req.body.title, body: req.body.body };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
        res.send({'Error': 'An error has occured'});
      } else {
        res.send(note);
      }
    });
  });

  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({'Error': 'An error has occured'});
      } else {
        res.send('Note ' + id + ' has been deleted!');
      }
    });
  });
};
