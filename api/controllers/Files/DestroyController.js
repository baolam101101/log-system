module.exports = {
    destroy: function(req, res) {
      var fileId = req.params.id;
      File.destroyOne({ id: fileId }).exec(function(err, deletedFile) {
        if (err) return res.serverError(err);
        if (!deletedFile) return res.notFound('File not found');
        return res.ok(deletedFile);
      });
    }
};
