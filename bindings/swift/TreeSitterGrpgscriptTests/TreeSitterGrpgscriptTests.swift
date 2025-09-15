import XCTest
import SwiftTreeSitter
import TreeSitterGrpgscript

final class TreeSitterGrpgscriptTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_grpgscript())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading GRPGScript grammar")
    }
}
