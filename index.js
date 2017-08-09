const benchmark = require('benchmark');

/**
 * specs
 */
run('iterate', {
  'Iterate# for loop'() {
    const arr1 = [0, 0, 0];
    const arr2 = [];
    for (let i of arr1) {
      arr2.push(i);
    }
  },
  'Iterate# forEach'() {
    const arr1 = [0, 0, 0];
    const arr2 = arr1.map(v => v);
  },
});


run('def-fn', {
  'Define Function# outside loop'() {
    function foo(a) { return a; }
    [0, 0, 0].map(v => {
      foo(v);
    });
  },
  'Define Function# inside loop'() {
    [0, 0, 0].map(v => {
      function foo(a) { return a; }
      foo(v);
    });
  },
});

run('obj-spread', {
  'Merge Object# ...spread'() {
    const a = { x: 1, y: 2 };
    const b = { ...a };
  },
  'Merge Object# Object.assign'() {
    const a = { x: 1, y: 2 };
    const b = Object.assign({}, a);
  },
});

/**
 * util function
 */
function run(spec, suites) {
  const choice = process.argv[2];
  if (choice && choice !== spec) {
    return;
  }

  const suite = new benchmark.Suite(spec, {
    onStart() {
      console.log('------------------------------');
      console.log('Starting benchmark', spec);
    },
    onCycle(e) {
      console.log('>', e.target.toString());
    },
    onComplete() {
      console.log('Fastest is', this.filter('fastest').map('name'));
    },
  });
  Object.values(suites).forEach(v => suite.add(v.name, v));
  suite.run();
}

