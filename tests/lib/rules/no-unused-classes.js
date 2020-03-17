/**
* @fileoverview Require that all styles that are defined are also referenced in the same file
* @author James Womack
*/

'use strict';

const RuleTester = require('eslint').RuleTester;

const rule = require('../../../lib/rules/no-unused-classes');

const parserOptions = {
  ecmaVersion: 2019,
  ecmaFeatures: {
    jsx: true,
  },
  sourceType: 'module',
};

const ruleTester = new RuleTester();
ruleTester.run('no-unused-styles', rule, {

  valid: [
    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';
        <div className="foo" />
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';
        const foo = props.classes;
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo({ classes }) {
          return (
            <div className={classes.foo} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo({ classes }) {
          return (
            <div className={classes['foo']} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo({ classes }) {
          return (
            <div className={classes[\`foo\`]} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo(props) {
          return (
            <div className={props.classes.foo} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo(props) {
          return (
            <div className={props.classes['foo']} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo(props) {
          return (
            <div className={props['classes'].foo} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo(props) {
          return (
            <div className={props['classes']['foo']} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo(props) {
          return (
            <div className={props.classes[\`foo\`]} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo(props) {
          return (
            <div className={props[\`classes\`].foo} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo(props) {
          return (
            <div className={props[\`classes\`][\`foo\`]} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        class Foo extends React.Component {
          render() {
            return <div className={this.props.classes.foo} />;
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        class Foo extends React.Component {
          render() {
            return <div className={this.props.classes['foo']} />;
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        class Foo extends React.Component {
          render() {
            return <div className={this.props['classes']['foo']} />;
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        class Foo extends React.Component {
          render() {
            return <div className={this['props'].classes['foo']} />;
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        class Foo extends React.Component {
          render() {
            return <div className={this['props']['classes']['foo']} />;
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        class Foo extends React.Component {
          render() {
            return <div className={this.props.classes[\`foo\`]} />;
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        class Foo extends React.Component {
          render() {
            return <div className={this.props[\`classes\`][\`foo\`]} />;
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        class Foo extends React.Component {
          render() {
            return <div className={this[\`props\`].classes[\`foo\`]} />;
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        class Foo extends React.Component {
          render() {
            return <div className={this[\`props\`][\`classes\`][\`foo\`]} />;
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },


    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        class Foo extends React.Component {
          render() {
            const { classes } = this.props;
            return <div className={classes.foo} />;
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo({ classes }) {
          const something = isActive ? classes.foo : null;
          return <div className={something} />;
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },

    { // TODO handle computed properties better?
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo({ classes }) {
          return (
            <div />
          );
        }

        export default withStyles(() => ({
          [foo]: {},
        }))(Foo);
      `.trim(),
    },

    { // TODO handle object spread better?
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo({ classes }) {
          return (
            <div />
          );
        }

        export default withStyles(() => ({
          ...foo,
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo({ classes }) {
          return (
            <div className={classes.foo} />
          );
        }

        export default withStyles(() => {
          return {
            foo: {},
          }
        })(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo({ classes }) {
          return (
            <div className={classes.foo, classes.bar} />
          );
        }

        export default withStyles(() => ({
          foo: {},
          bar: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo({ classes }) {
          return (
            <div className={classes.foo}>
              <div className={classes.bar} />
            </div>
          );
        }

        export default withStyles(() => ({
          foo: {},
          bar: {},
        }))(Foo);
      `.trim(),
    },

    {
      parserOptions,
      code: `
        function Foo({ classes }) {
          return (
            <div className={classes.foo} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
    },
  ],

  invalid: [
    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo({ classes }) {
          return (
            <div className={classes.foo} />
          );
        }

        export default withStyles(() => ({
          foo: {},
          bar: {},
        }))(Foo);
      `.trim(),
      errors: [{
        message: 'Class `bar` is unused',
        type: 'Property',
      }],
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo({ classes }) {
          return (
            <div className={classes.foo} />
          );
        }

        export default withStyles(() => {
          return {
            foo: {},
            bar: {},
          }
        })(Foo);
      `.trim(),
      errors: [{
        message: 'Class `bar` is unused',
        type: 'Property',
      }],
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        class Foo extends React.Component {
          render() {
            return (
              <div className={this.props.nonsense.foo} />
            );
          }
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
      errors: [{
        message: 'Class `foo` is unused',
        type: 'Property',
      }],
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo(props) {
          return (
            <div className={props.nonsense.foo} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
      errors: [{
        message: 'Class `foo` is unused',
        type: 'Property',
      }],
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo(props) {
          return (
            <div className={props.classes.foo.bar} />
          );
        }

        export default withStyles(() => ({
          bar: {},
        }))(Foo);
      `.trim(),
      errors: [{
        message: 'Class `bar` is unused',
        type: 'Property',
      }],
    },

    {
      parserOptions,
      code: `
        import { withStyles } from '@material-ui/core/styles';

        function Foo(props) {
          return (
            <div className={props.props.props.classes.foo} />
          );
        }

        export default withStyles(() => ({
          foo: {},
        }))(Foo);
      `.trim(),
      errors: [{
        message: 'Class `foo` is unused',
        type: 'Property',
      }],
    },

    {
      parserOptions,
      code: `
        function Foo({ classes }) {
          return (
            <div className={classes.foo} />
          );
        }

        export default withStyles(() => ({
          foo: {},
          bar: {},
        }))(Foo);
      `.trim(),
      errors: [{
        message: 'Class `bar` is unused',
        type: 'Property',
      }],
    },
  ],
});
