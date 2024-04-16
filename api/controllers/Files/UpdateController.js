module.exports = {
    update: function(req, res) {
      var fileId = req.params.id;
      var updatedData = req.allParams();
      File.updateOne({ id: fileId }).set(updatedData).exec(function(err, updatedFile) {
        if (err) return res.serverError(err);
        if (!updatedFile) return res.notFound('File not found');
        return res.ok(updatedFile);
      });
    }
};
