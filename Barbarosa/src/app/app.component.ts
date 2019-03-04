import {Component} from '@angular/core';
import {IDice} from "./dice.model";
import {DICE} from "./dice.data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private diceArr: Array<IDice>;
  private scores: Array<number>;
  private activePlayer: number;
  private roundScore: number;
  private gamePlaying: boolean;
  private winScore: number;
  private diceRolls: Array<number>;
  private canHold: boolean;

  constructor() {
    this.gamePlaying = false;
    this.canHold = false;
    this.diceArr = DICE;
  }

  public startNewGame() {
    this.gamePlaying = true;
    this.init();
  }

  public allDiceDisabled() {
    for (let current of this.diceArr) {
      if (current.disabled === false) {
        return false;
      }
    }
    return true;
  }

  public disableAllDice() {
    this.diceArr.forEach(current => {
      current.disabled = true;
      document.getElementById(current.id).style.display = 'none';
    });
  }

  public disableDice(value) {
    this.diceArr.forEach(current => {
      if (current.value === value) {
        current.disabled = true;
      }
    });
  }

  public checkRolls() {
    let score = 0;
    this.diceArr.forEach(current => this.diceRolls[current.value]++);

    for (let i = 1; i < this.diceRolls.length; i++) {
      switch (i) {
        case 1:
          if (this.diceRolls[i] <= 2) {
            score += 10 * this.diceRolls[i];
            this.disableDice(i);
          } else if (this.diceRolls[i] > 2 && this.diceRolls[i] <= 4) {
            score += 10 * 10 * (this.diceRolls[i] - 2);
            this.disableDice(i);
          } else {
            score += 10 * 10 * 4;
          }
          break;
        case 5:
          if (this.diceRolls[i] <= 2) {
            score += i * this.diceRolls[i];
            this.disableDice(i);
          } else if (this.diceRolls[i] > 2 && this.diceRolls[i] <= 4) {
            score += i * 10 * (this.diceRolls[i] - 2);
            this.disableDice(i);
          } else {
            score += i * 10 * 4;
          }
          break;
        default:
          if (this.diceRolls[i] <= 2) {
            score += 0;
          } else if (this.diceRolls[i] > 2 && this.diceRolls[i] <= 4) {
            score += i * 10 * (this.diceRolls[i] - 2);
            this.disableDice(i);
          } else {
            score += i * 10 * 4;
          }
          break;
      }
    }
    return score;
  }

  public checkScore() {
    switch (true) {
      case this.roundScore === 0:
        // document.querySelector('.btn-hold').style.display = 'none';
        this.canHold = false;
        break;
      case (this.roundScore + this.scores[this.activePlayer]) < 100:
        // document.querySelector('.btn-hold').style.display = 'none';
        this.canHold = false;
        break;
      case (this.scores[this.activePlayer] > 300 && this.scores[this.activePlayer] < 400) && ((this.scores[this.activePlayer] + this.roundScore) < 400):
        // document.querySelector('.btn-hold').style.display = 'none';
        this.canHold = false;
        break;
      case (this.scores[this.activePlayer] > 700 && this.scores[this.activePlayer] < 800) && ((this.scores[this.activePlayer] + this.roundScore) < 800):
        // document.querySelector('.btn-hold').style.display = 'none';
        this.canHold = false;
        break;
      case (this.roundScore + this.scores[this.activePlayer]) > this.winScore:
        this.nextPlayer();
        break;
      default:
        // document.querySelector('.btn-hold').style.display = 'block';
        this.canHold = true;
    }
  }

  public resetRolls() {
    for (let i = 1; i < this.diceRolls.length; i++) {
      this.diceRolls[i] = 0;
    }
  }

  public enableDice() {
    this.diceArr.forEach(current => {
      current.disabled = false;
      document.getElementById(current.id).style.display = 'block';
    });
  }

  public rollDice() {
    this.diceArr.forEach(current => {
      if (current.disabled === true) {
        current.value = 0;
        document.getElementById(current.id).style.display = 'none';
      } else {
        current.value = Math.floor(Math.random() * 6) + 1;
        current.image = `assets/images/dice-${current.value}.png`;
      }
    })
  }

  public roll() {
    if (this.gamePlaying) {
      let currentRoll: number;

      if (this.allDiceDisabled()) {
        this.enableDice();
      }

      this.rollDice();
      currentRoll = this.checkRolls();
      this.resetRolls();

      if (currentRoll !== 0) {
        this.roundScore += currentRoll;
        // document.getElementById('current-' + this.activePlayer).textContent = this.roundScore;
        this.checkScore();

      } else {
        this.nextPlayer();
      }
    }
  }

  public hold() {
    if (this.gamePlaying) {
      if (this.scores[this.activePlayer] + this.roundScore <= this.winScore) {
        this.scores[this.activePlayer] += this.roundScore;
        // document.getElementById('score-' + this.activePlayer).textContent = this.scores[this.activePlayer];

        if (this.scores[this.activePlayer] === this.winScore) {
          this.gamePlaying = false;
          document.getElementById('name-' + this.activePlayer).textContent = 'Winner!';
          document.querySelector('.player-' + this.activePlayer + '-panel').classList.add('winner');
          document.querySelector('.player-' + this.activePlayer + '-panel').classList.remove('active');
        } else {
          this.nextPlayer();
        }
      } else {
        this.nextPlayer();
      }
    }
  }

  public nextPlayer() {
    this.resetRolls();
    this.disableAllDice();

    this.roundScore = 0;
    // document.getElementById('current-' + this.activePlayer).textContent = this.roundScore;

    document.querySelector('.player-' + this.activePlayer + '-panel').classList.toggle('active');
    this.activePlayer === 0 ? this.activePlayer = 1 : this.activePlayer = 0;
    document.querySelector('.player-' + this.activePlayer + '-panel').classList.toggle('active');
    this.checkScore();
  }

  public init() {
    this.scores = [0, 0];
    this.activePlayer = 0;
    this.roundScore = 0;
    this.winScore = 1000;
    this.diceRolls = [0, 0, 0, 0, 0, 0, 0];
    this.enableDice();

    // document.getElementById('score-0').textContent = '0';
    // document.getElementById('score-1').textContent = '0';
    // document.getElementById('current-0').textContent = '0';
    // document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
  }

}
