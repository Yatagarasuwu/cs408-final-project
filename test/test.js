import { sayHello } from '../js/main.js';

QUnit.module('hello', function() {

    QUnit.test('make sure the hello function says hello', function(assert) {
        var result = sayHello();
        assert.equal(result, 'hello');
    });


});

import { calcElo } from '../js/main.js';

QUnit.module('calcElo', function() {

    QUnit.test('calculate new Elo ratings for a win', function(assert) {
        const result = calcElo(1500, 1400, 1, 0); // player1 won 
        assert.equal(result.playerNewRating > 1500, true, 'player1 rating increases ');
        assert.equal(result.opponentNewRating < 1400, true, 'player2 rating should decrease');
    });

    QUnit.test('calculate new Elo ratings for a draw', function(assert) {
        const result = calcElo(1500, 1400, 0.5, 0.5); // Draw
        assert.equal(result.playerNewRating < 1500, true, 'player1 rating should slightly decrease cuz their elo was higher on a draw');
        assert.equal(result.opponentNewRating > 1400, true, 'self explainatory should gain a bit here.');
    });

    QUnit.test('calculate new Elo ratings for a loss', function(assert) {
        const result = calcElo(1500, 1400, 0, 1); // player1 lost lol
        assert.equal(result.playerNewRating < 1500, true, 'player1 rating should majorly decrease'); 
        assert.equal(result.opponentNewRating > 1400, true, 'player2 should get alot here.');
    });

});