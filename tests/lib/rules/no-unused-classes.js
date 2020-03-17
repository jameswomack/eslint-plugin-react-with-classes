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
ruleTester.run('no-unused-classes', rule, {

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

    {
      parserOptions,
      code: `
        import React from 'react';
        import { withStyles } from '@material-ui/core/styles';
        
        import Slider from '../../Slider/Slider';
        
        const CostSlider = ({ classes, name, rate, handleChange, isDirty }) => (
          <div className={classes.root}>
            <div className={classes.slider}>
              <span className={classes.rate}>{name}</span>
              <Slider disabled={isDirty} rate={rate} onUpdate={handleChange} />
            </div>
            <span className={classes.sellingPrice}></span>
          </div>
        );
        
        CostSlider.defaultProps = {
          handleChange: () => {},
        };
        
        export default withStyles(theme => ({
          root: {
            padding: '60px 10px 0px 10px',
            margin: '20px 10px 20px 10px',
            fontSize: '1rem',
            flexGrow: 1,
          },
          rate: {
            marginRight: '10px',
            fontSize: '1rem',
            color: '#A1A1A1',
          },
          slider: {
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gridGap: '10px',
            marginBottom: '30px',
            alignItems: 'center',
          },
          sellingPrice: {
            textAlign: 'center',
            display: 'block',
            fontWeight: 'bold',
          },
        }))(CostSlider);
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
        import React from 'react';
        import { withStyles } from '@material-ui/core/styles';
        
        import Slider from '../../Slider/Slider';
        
        const CostSlider = ({ classes, name, rate, handleChange, isDirty }) => (
          <div className={classes.root}>
            <div className={classes.slider}>
              <span className={classes.rate}>{name}</span>
              <Slider disabled={isDirty} rate={rate} onUpdate={handleChange} />
            </div>
            <span className={classes.sellingPrice}></span>
          </div>
        );
        
        CostSlider.defaultProps = {
          handleChange: () => {},
        };
        
        export default withStyles(theme => ({
          root: {
            padding: '60px 10px 0px 10px',
            margin: '20px 10px 20px 10px',
            fontSize: '1rem',
            flexGrow: 1,
          },
          rate: {
            marginRight: '10px',
            fontSize: '1rem',
            color: '#A1A1A1',
          },
          rate2: {
            marginRight: '10px',
            fontSize: '1rem',
            color: '#A1A1A1',
          },
          slider: {
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gridGap: '10px',
            marginBottom: '30px',
            alignItems: 'center',
          },
          sellingPrice: {
            textAlign: 'center',
            display: 'block',
            fontWeight: 'bold',
          },
        }))(CostSlider);
      `.trim(),
      errors: [{
        message: 'Class `rate2` is unused',
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
