module.exports = {
    upload: function(req, res) {
      req.file('file').upload({
        dirname: require('path').resolve(sails.config.appPath, 'uploads')
      }, function(err, uploadedFiles) {
        if (err) return res.serverError(err);
  
        // Create entries in the database for the uploaded files
        File.createEach(uploadedFiles.map(file => ({
          name: file.filename,
          path: file.fd
        })), function(err, files) {
          if (err) return res.serverError(err);
          return res.ok(files);
        });
      });
    }
};
