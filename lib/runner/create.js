'use strict';

var path = require('path');

/**
 * Create default template collections
 */

module.exports = function(options) {
  return function(verb) {
    create(verb, 'root', 'renderable');
    create(verb, 'docs', 'renderable');
    create(verb, 'badges', 'partial');
    create(verb, 'includes', 'partial');
    create(verb, 'layouts', 'layout');
  };
};

function create(verb, name, type) {
  // only create the collection if it doesn't already exist
  if (verb[name]) return;

  verb.create(name, {
    viewType: [type],
    renameKey: function(key) {
      return path.basename(key, path.extname(key));
    }
  });
}