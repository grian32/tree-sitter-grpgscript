package tree_sitter_grpgscript_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_grpgscript "github.com/grian32/grpg/grpgscript/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_grpgscript.Language())
	if language == nil {
		t.Errorf("Error loading GRPGScript grammar")
	}
}
