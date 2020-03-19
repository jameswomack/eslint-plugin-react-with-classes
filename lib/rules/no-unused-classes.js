'use strict';

const path = require('path');
const fs = require('fs');
const has = require('has');
const { parseForESLint } = require('babel-eslint');
const Traverser = require('eslint/lib/shared/traverser.js');

function getBasicIdentifier(node) {
  if (node.type === 'Identifier') {
    // classes.foo
    return node.name;
  }

  if (node.type === 'Literal') {
    // classes['foo']
    return node.value;
  }

  if (node.type === 'TemplateLiteral') {
    // classes[`foo`]
    if (node.expressions.length) {
      // classes[`foo${bar}`]
      return null;
    }
    return node.quasis[0].value.raw;
  }

  // Might end up here with things like:
  // classes['foo' + bar]
  return null;
}

module.exports = {
  meta: {
    docs: {
      description: 'Require that all styles that are defined are also referenced in the same file',
      recommended: true,
    },

    schema: [],
  },

  create: function rule(context) {
    const usedStyles = {};
    const definedStyles = {};

    const currentDir = path.dirname(context.getFilename());

    const addToExpectedStyles = (styles) => {
      if (styles && styles.type === 'ArrowFunctionExpression') {
        const body = styles.body;

        let stylesObj;
        if (body.type === 'ObjectExpression') {
          stylesObj = body;
        } else if (body.type === 'BlockStatement') {
          body.body.forEach((bodyNode) => {
            if (
              bodyNode.type === 'ReturnStatement'
              && bodyNode.argument.type === 'ObjectExpression'
            ) {
              stylesObj = bodyNode.argument;
            }
          });
        }

        if (stylesObj) {
          stylesObj.properties.forEach((property) => {
            if (property.computed) {
              // Skip over computed properties for now.
              // e.g. `{ [foo]: { ... } }`
              // TODO handle this better?
              return;
            }

            if (property.type === 'ExperimentalSpreadProperty' || property.type === 'SpreadElement') {
              // Skip over object spread for now.
              // e.g. `{ ...foo }`
              // TODO handle this better?
              return;
            }

            definedStyles[property.key.name] = property;
          });
        }
      }
    };

    return {
      ImportDeclaration(node) {
        node.specifiers.forEach((im) => {
          if (im.local && im.local.type === 'Identifier' && im.local.name === 'styles') {
            if (im.parent.type === 'ImportDeclaration') {
              let absolutePath = path.join(currentDir, im.parent.source.value);
              if (!absolutePath.includes('.js')) {
                absolutePath += '.js';
              }
              const contents = fs.readFileSync(absolutePath).toString();
              const result = parseForESLint(contents);

              // TODO: Could try esquery(result.ast, 'ExportDefaultDeclaration') to get AST nodes

              Traverser.traverse(result.ast, {
                enter(node0) {
                  switch (node0.type) {
                    case 'ExportDefaultDeclaration': {
                      if (node0.declaration.type === 'ArrowFunctionExpression') {
                        addToExpectedStyles(node0.declaration);
                      }
                      break;
                    }
                    default:
                      break;
                  }
                },
                // visitorKeys: []
                // leave (node, parent)
              }, {});
            }
          }
        });
      },
      VariableDeclarator(node) {
        if (node.id.name === 'styles' && node.id.parent && node.id.parent.init) {
          addToExpectedStyles(node.id.parent.init);
        }
      },
      CallExpression(node) {
        if (node.callee.name === 'withStyles') {
          const styles = node.arguments[0];

          addToExpectedStyles(styles);

          // Now we know all of the defined styles and used styles, so we can
          // see if there are any defined styles that are not used.
          Object.keys(definedStyles).forEach((definedStyleKey) => {
            if (!has(usedStyles, definedStyleKey)) {
              context.report(
                definedStyles[definedStyleKey],
                `Class \`${definedStyleKey}\` is unused`
              );
            }
          });
        }
      },

      MemberExpression(node) {
        if (node.object.type === 'Identifier' && node.object.name === 'classes') {
          const style = getBasicIdentifier(node.property);
          if (style) {
            usedStyles[style] = true;
          }
          return;
        }

        const stylesIdentifier = getBasicIdentifier(node.property);
        if (!stylesIdentifier) {
          // props['foo' + bar].baz
          return;
        }

        if (stylesIdentifier !== 'classes') {
          // props.foo.bar
          return;
        }

        const parent = node.parent;

        if (parent.type !== 'MemberExpression') {
          // foo.styles
          return;
        }

        if (node.object.object && node.object.object.type !== 'ThisExpression') {
          // foo.foo.styles
          return;
        }

        const propsIdentifier = getBasicIdentifier(parent.object);
        if (propsIdentifier && propsIdentifier !== 'props') {
          return;
        }
        if (!propsIdentifier && parent.object.type !== 'MemberExpression') {
          return;
        }

        if (parent.parent.type === 'MemberExpression') {
          // this.props.props.styles
          return;
        }

        const style = getBasicIdentifier(parent.property);
        if (style) {
          usedStyles[style] = true;
        }
      },
    };
  },
};
