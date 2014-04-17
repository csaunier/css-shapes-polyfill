var ShapeInfoTests = function() {

function register(mocha, expect) {
    mocha.setup('bdd');

    var offsetTests = {
        tests: [
        {
            name: 'offsets for inset on 100x100 square',
            shapeOutside: 'inset(21px 20px)',
            styles: {
                margin: '0',
                border: 'none',
                padding: '0',
                width: '100px',
                height: '100px',
                float: 'left'
            },
            step: 20,
            output: [
                { top: 0, bottom: 20, offset: 0, float: 'left' },
                { top: 20, bottom: 40, offset: 80, float: 'left' },
                { top: 40, bottom: 60, offset: 80, float: 'left' },
                { top: 60, bottom: 80, offset: 80, float: 'left' },
                { top: 80, bottom: 100, offset: 0, float: 'left' }
            ]
        }
        ],
        runTest: function(test) {
            var fn = test.only ? it.only : it;
            fn(test.name, function() {
                var el = document.createElement('div');
                for (var prop in test.styles)
                    el.style[prop] = test.styles[prop];
                el.setAttribute('data-shape-outside', test.shapeOutside);
                document.body.appendChild(el);
                var shapeInfo = new ShapeInfo(el);
                document.body.removeChild(el);


                var offsets;
                shapeInfo.onReady(function() {
                    // count on this executing immediately except for images
                    offsets = shapeInfo.offsets({mode: "step", step: test.step});
                });

                test.output.forEach(function(output, i) {
                    for (var prop in output)
                        expect(offsets[i][prop]).to.equal(output[prop]);
                });
            })
        }
    }

    function generateTests(testSet) {
        testSet.tests.forEach(function(test) {
            testSet.runTest(test);
        });
    }

    describe('ShapeInfo.offsets', function() {
        generateTests(offsetTests);
    })
}

return {
    'register': register
}
}()
