// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterGrpgscript",
    products: [
        .library(name: "TreeSitterGrpgscript", targets: ["TreeSitterGrpgscript"]),
    ],
    dependencies: [
        .package(name: "SwiftTreeSitter", url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.9.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterGrpgscript",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterGrpgscriptTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterGrpgscript",
            ],
            path: "bindings/swift/TreeSitterGrpgscriptTests"
        )
    ],
    cLanguageStandard: .c11
)
