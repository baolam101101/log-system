module.exports = {
    login: async function(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
          return res.badRequest('Username and password are required');
        }
    
        try {
          const user = await User.findOne({ username });
          if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid username or password' });
          }
    
          return res.view('test');
        } catch (error) {
          return res.serverError(error);
        }
      },

    signup: async function(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
          return res.badRequest('Username and password are required');
        }
    
        try {
          const existingUser = await User.findOne({ username });
          if (existingUser) {
            return res.status(400).json({ error: 'Username is already taken' });
          }
    
          const newUser = await User.create({ username, password }).fetch();

          return res.ok('Signup successful');
        } catch (error) {
          return res.serverError(error);
        }
      }
  };
  
