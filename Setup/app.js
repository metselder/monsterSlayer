new Vue({
    el:'#app',
    data:{
        test: 'kor',
        monsterHealth: 100,
        playerHealth: 100,
        gameIsRunning: false,
        logs: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.logs = [];
        },
        attack: function() {
            var dmg = this.calculateDmg(3, 10);
            this.monsterHealth -= dmg;
            this.logToUI(true, dmg, 'damage');

            if(this.checkWin())
                return;
            this.monsterAttacks();
            
        },
        specialAttack: function() {
            var dmg = this.calculateDmg(10, 20);
            this.monsterHealth -= dmg;
            this.logToUI(true, dmg, 'damage');

            if(this.checkWin())
                return;

            this.monsterAttacks();
        },
        heal: function() {
            if(this.playerHealth < 90) {
                this.playerHealth += 10;
                this.logToUI(true, 10, 'heal')
            } else {
                var diff = 100 - this.playerHealth;
                this.playerHealth = 100;
                this.logToUI(true, diff, 'heal')
            }
            
            this.monsterAttacks();
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        calculateDmg: function(min, max) {
         return Math.max(Math.floor(Math.random() * max) + 1, min); //math max ще вземе min, ако рандом генерираното число е под него
        },
        checkWin: function() {
            if(this.monsterHealth <= 0) {
                if(confirm('You Won! New game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if(confirm('You lost! New game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }

            return false;
        },
        monsterAttacks: function() {
            var dmg = this.calculateDmg(5, 12);
            this.playerHealth -= dmg;
            this.logToUI(false, dmg, 'damage')
            this.checkWin();
        },
        logToUI: function(isPlayer, points, noun) {
            if (isPlayer) {
                this.logs.unshift({
                    isPlayer,
                    text: `The player did ${points} points of ${noun}`
                });
            } else {
                this.logs.unshift({
                    isPlayer,
                    text: `The monster did ${points} points of ${noun}`
                });
            }
            
        }
    }
});