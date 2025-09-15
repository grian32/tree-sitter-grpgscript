/**
 * @file Tree Sitter for GRPGScript
 * @author Grian <grianguy32@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "grpgscript",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
