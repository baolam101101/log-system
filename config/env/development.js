/* eslint-disable camelcase */
/**
 * Production environment settings
 * (sails.config.*)
 *
 * What you see below is a quick outline of the built-in settings you need
 * to configure your Sails app for production.  The configuration in this file
 * is only used in your production environment, i.e. when you lift your app using:
 *
 * ```
 * NODE_ENV=production node app
 * ```
 *
 * > If you're using git as a version control solution for your Sails app,
 * > this file WILL BE COMMITTED to your repository by default, unless you add
 * > it to your .gitignore file.  If your repository will be publicly viewable,
 * > don't add private/sensitive data (like API secrets / db passwords) to this file!
 *
 * For more best practices and tips, see:
 * https://sailsjs.com/docs/concepts/deployment
 */

module.exports = {
  /**************************************************************************
   *                                                                         *
   * Tell Sails what database(s) it should use in production.                *
   *                                                                         *
   * (https://sailsjs.com/config/datastores)                                 *
   *                                                                         *
   **************************************************************************/
  datastores: {
    /***************************************************************************
     *                                                                          *
     * Configure your default production database.                              *
     *                                                                          *
     * 1. Choose an adapter:                                                    *
     *    https://sailsjs.com/plugins/databases                                 *
     *                                                                          *
     * 2. Install it as a dependency of your Sails app.                         *
     *    (For example:  npm install sails-mysql --save)                        *
     *                                                                          *
     * 3. Then set it here (`adapter`), along with a connection URL (`url`)     *
     *    and any other, adapter-specific customizations.                       *
     *    (See https://sailsjs.com/config/datastores for help.)                 *
     *                                                                          *
     ***************************************************************************/
    default: {
      // adapter: 'sails-mysql',
      // url: 'mysql://user:password@host:port/database',
      //--------------------------------------------------------------------------
      //  /\   To avoid checking it in to version control, you might opt to set
      //  ||   sensitive credentials like `url` using an environment variable.
      //
      //  For example:
      //  ```
      //  sails_datastores__default__url=mysql://admin:myc00lpAssw2D@db.example.com:3306/my_prod_db
      //  ```
      //--------------------------------------------------------------------------

      /****************************************************************************
       *                                                                           *
       * More adapter-specific options                                             *
       *                                                                           *
       * > For example, for some hosted PostgreSQL providers (like Heroku), the    *
       * > extra `ssl: true` option is mandatory and must be provided.             *
       *                                                                           *
       * More info:                                                                *
       * https://sailsjs.com/config/datastores                                     *
       *                                                                           *
       ****************************************************************************/
      // ssl: true,

      adapter: 'sails-postgresql',
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: '2012003',
      database: 'FileLogSystem', 
    },
  },

  models: {
    /***************************************************************************
     *                                                                          *
     * To help avoid accidents, Sails automatically sets the automigration      *
     * strategy to "safe" when your app lifts in production mode.               *
     * (This is just here as a reminder.)                                       *
     *                                                                          *
     * More info:                                                               *
     * https://sailsjs.com/docs/concepts/models-and-orm/model-settings#?migrate *
     *                                                                          *
     ***************************************************************************/
    migrate: 'alter',

    /***************************************************************************
     *                                                                          *
     * If, in production, this app has access to physical-layer CASCADE         *
     * constraints (e.g. PostgreSQL or MySQL), then set those up in the         *
     * database and uncomment this to disable Waterline's `cascadeOnDestroy`    *
     * polyfill.  (Otherwise, if you are using a databse like Mongo, you might  *
     * choose to keep this enabled.)                                            *
     *                                                                          *
     ***************************************************************************/
    // cascadeOnDestroy: false,
  },
};
