/**
 * @file Tree Sitter for GRPGScript
 * @author Grian <grianguy32@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check
module.exports = grammar({
  name: "grpgscript",

  extras: ($) => [/\s/],

  rules: {
    program: ($) => repeat($.statement),

    statement: ($) =>
      choice($.var_statement, $.return_statement, $.expression_statement),

    var_statement: ($) =>
      seq("var", $.identifier, "=", $.expression, optional(";")),

    return_statement: ($) => seq("return", $.expression, optional(";")),

    expression_statement: ($) => seq($.expression, optional(";")),

    expression: ($) =>
      choice(
        $.identifier,
        $.integer_literal,
        $.boolean,
        $.string_literal,
        $.array_literal,
        $.function_literal,
        $.if_expression,
        $.call_expression,
        $.index_expression,
        $.prefix_expression,
        $.infix_expression,
        $.grouped_expression,
      ),

    identifier: ($) => /[a-zA-Z_][a-zA-Z_]*/,

    integer_literal: ($) => /\d+/,

    boolean: ($) => choice("true", "false"),

    string_literal: ($) =>
      seq('"', repeat(choice(/[^"\\]/, seq("\\", /./))), '"'),

    array_literal: ($) =>
      seq(
        "[",
        optional(
          seq($.expression, repeat(seq(",", $.expression)), optional(",")),
        ),
        "]",
      ),

    // hash_literal: ($) =>
    //   seq(
    //     "{",
    //     optional(
    //       seq($.hash_pair, repeat(seq(",", $.hash_pair)), optional(",")),
    //     ),
    //     "}",
    //   ),

    hash_pair: ($) => seq($.expression, ":", $.expression),

    function_literal: ($) =>
      seq("fnc", "(", optional($.parameter_list), ")", $.block_statement),

    parameter_list: ($) => seq($.identifier, repeat(seq(",", $.identifier))),

    block_statement: ($) => seq("{", repeat($.statement), "}"),

    if_expression: ($) =>
      seq(
        "if",
        "(",
        $.expression,
        ")",
        $.block_statement,
        optional(seq("else", $.block_statement)),
      ),

    call_expression: ($) =>
      prec.left(
        8,
        seq(
          field("fnc", $.expression),
          "(",
          field("arguments", optional($.argument_list)),
          ")",
          optional($.block_statement),
        ),
      ),

    argument_list: ($) => seq($.expression, repeat(seq(",", $.expression))),

    index_expression: ($) =>
      prec.left(9, seq($.expression, "[", $.expression, "]")),

    prefix_expression: ($) => prec(6, seq(choice("!", "-"), $.expression)),

    infix_expression: ($) =>
      choice(
        prec.left(1, seq($.expression, choice("==", "!="), $.expression)),
        prec.left(2, seq($.expression, choice("<", ">"), $.expression)),
        prec.left(3, seq($.expression, choice("+", "-"), $.expression)),
        prec.left(4, seq($.expression, choice("*", "/"), $.expression)),
      ),

    grouped_expression: ($) => seq("(", $.expression, ")"),
  },
});
