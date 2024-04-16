module.exports = {
    find: function(req, res) {
      File.find().exec(function(err, files) {
        if (err) return res.serverError(err);
        return res.ok(files);
      });
    }
};
