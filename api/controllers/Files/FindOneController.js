module.exports = {
    findOne: function(req, res) {
      var fileId = req.params.id;
      File.findOne({ id: fileId }).exec(function(err, file) {
        if (err) return res.serverError(err);
        if (!file) return res.notFound('File not found');
        return res.ok(file);
      });
    }
};
