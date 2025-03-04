'use strict';

const Parser = require('..');

class ExpandedShelfContents {
  type = 'ExpandedShelfContents';
  
  constructor(data) {
    this.items = Parser.parse(data.items);
  }
  
  // XXX: alias for consistency
  get contents() {
    return this.items;
  }
}

module.exports = ExpandedShelfContents;