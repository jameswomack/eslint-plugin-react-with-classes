# Disallow unused styles

## Rule Details

The following patterns are considered warnings:

``` jsx
function MyComponent({ classes }) {
  return (
    <div className={classes.foo}>
      Foo
    </div>
  );
}

export default withStyles(() => ({
  foo: {
    backgroundColor: 'red',
  },

  bar: { // <--- this style is not used
    backgroundColor: 'green',
  },
}))(MyComponent);
```

The following patterns are not warnings:

``` jsx
function MyComponent({ classes }) {
  return (
    <div className={classes.foo}>
      Foo
    </div>
  );
}

export default withStyles(() => ({
  foo: {
    backgroundColor: 'red',
  },
}))(MyComponent);
```

Examples of **correct** code for this rule with the `ignore: ['foo']` option:

```jsx
/*eslint react-with-classes/no-unused-classes: ["error", {"ignore": ["rule2"]}]*/

const styles = () => ({
  foo: {
    backgroundColor: 'red',
  },
  rule2: {
    backgroundColor: 'red',
  },
};

function MyComponent({ classes }) {
  return (
    <div className={classes.foo}>
      Foo
    </div>
  );
}

export default withStyles(styles)(MyComponent);
```

## Known limitations

- Will not detect styles defined by computed properties.
- Will not detect styles defined by object spread.
- Will not handle files that contain multiple styled components very well.
- Will not handle `classes` prop that has been renamed to something else.
