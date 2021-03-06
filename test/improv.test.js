var improv = require('../lib/improv');
var charts = require('../sample/charts');

var assert = require('assert');

describe('Improv', function () {
  describe('#overChart', function () {
    it('should generate an improvisation', function () {
      var imp = improv.create().over('chart', charts.myFunnyValentine);

      assert(imp.chart[0].scale);
      assert(imp.chart[0].chord);
      assert.equal(imp.chart[0].notes.length, 4);
      assert.equal(imp.chart[0].duration.beats, 4);
    });

    it.skip('should generate an improvisation within a given range', function () {
      var imp;
      var i;

      for (i = 0; i < 25; i += 1) {
        imp = improv.create({range: ['C4', 'C5']}).over('chart', charts.myFunnyValentine);

        imp.chart.forEach(function (obj) {
          obj.notes.forEach(function (arr) {
            arr.forEach(function (note) {
              if (note) {
                assert(!note.lowerThan('C4'));
                assert(!note.higherThan('C5'));
              }
            });
          });
        });
      }
    });

    it.skip('should terminate', function () {
      var imp;
      var i;

      for (i = 0; i < 50; i += 1) {
        imp = improv.create().over('chart', charts.myFunnyValentine);
      }
    });

    it('should obey the `rests` setting', function () {
      var imp = improv.create({rests: 1}).over('chart', charts.myFunnyValentine);
      var foundRest = false;

      imp.chart.forEach(function (obj) {
        obj.notes.forEach(function (arr) {
          arr.forEach(function (note) {
            if (!note) foundRest = true;
          });
        });
      });

      assert(foundRest);

      imp = improv.create({rests: 0}).over('chart', charts.myFunnyValentine);

      imp.chart.forEach(function (obj) {
        obj.notes.forEach(function (arr) {
          arr.forEach(function (note) {
            assert(note);
          });
        });
      });
    });

    it('should obey the `rhythmicVariety` setting', function () {
      var imp = improv.create({rhythmicVariety: 0.5}).over('chart', charts.myFunnyValentine);
      var found = [false, false, false];

      imp.chart.forEach(function (obj) {
        obj.notes.forEach(function (arr) {
          found[arr.length - 2] = true;
        });
      });

      assert(found[0]);
      assert(found[1]);
      assert(found[2]);

      imp = improv.create({rhythmicVariety: 0}).over('chart', charts.myFunnyValentine);

      imp.chart.forEach(function (obj) {
        obj.notes.forEach(function (arr) {
          assert.equal(arr.length, 2);
        });
      });
    });

    it('should obey the `useSixteenths` setting', function () {
      var imp = improv.create({useSixteenths: true, rhythmicVariety: 0.5}).over('chart', charts.myFunnyValentine);
      var found4;

      imp.chart.forEach(function (obj) {
        obj.notes.forEach(function (arr) {
          if (arr.length === 4) found4 = true;
        });
      });

      assert(found4);

      imp = improv.create({useSixteenths: false, rhythmicVariety: 0.5}).over('chart', charts.myFunnyValentine);

      imp.chart.forEach(function (obj) {
        obj.notes.forEach(function (arr) {
          assert.notEqual(arr.length, 4);
        });
      });
    });

    it('should obey the `onlyEighthRests` setting', function () {
      var imp = improv.create({onlyEighthRests: true}).over('chart', charts.myFunnyValentine);
      var foundRest = false;

      imp.chart.forEach(function (obj) {
        obj.notes.forEach(function (arr) {
          if (arr.length !== 2) {
            assert.equal(arr.indexOf(null), -1);
          }
        });
      });
    });
  });
});