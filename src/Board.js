// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    /*
      use rowIndex to look up this row
      use includes to check if there is one
      filter to count the 1 occurences
      if count.length >= 2  reutrn true
      else false
    */
    hasRowConflictAt: function(rowIndex) {

      if (this.get(rowIndex).includes(1)) {
        let count = this.get(rowIndex).filter(ele => ele === 1);
        // console.log(`count: ${count.length}`)
        if (count.length >= 2) {
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // var result = false;
      // this.rows().forEach((row, i) => {
      //   if (this.hasRowConflictAt(i)) {
      //     result = true;
      //   }
      // })
      // return result;

      for ( let i = 0 ; i < this.rows().length ; i++) {
        if( this.hasRowConflictAt(i) ) {
          return true
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict

    // Get length of board
    // Get rows
    // loop thru rows and check if specified element at colIndex === 1
    // Count occurences of 1
    // If count >=2  return true
    hasColConflictAt: function(colIndex) {
      var rows = this.rows();
      var count = 0;
      for (var i = 0; i < rows.length; i++) {
        if (rows[i][colIndex] === 1){
          count++;
        }
      }
      if (count >= 2) {
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts

    //
    hasAnyColConflicts: function() {
      var colLength = this.rows().length
      for ( let i = 0 ; i < colLength; i++) {
        if( this.hasColConflictAt(i) ) {
          return true
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict

    // find the instance 1 position in majorDiagonalColumnIndexAtFirstRow (getting column position)
    // need var count to count how many times instance 1 has occurs
    // check position at majorDiagonalColumnIndexAtFirstRow + 1 and column + 1
    //    - need 2 for loops to move
    //    - stop point: either row or column reach n - 1
    // if count >= 2, return true, else return false
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      let count = 0;
      let board = this.rows();
      let startingPointRow = 0;

      for (let i = 0; i < board.length; i ++) {
        if (board[startingPointRow++][majorDiagonalColumnIndexAtFirstRow++] === 1) {
          count++;
        }
        if (startingPointRow === board.length || majorDiagonalColumnIndexAtFirstRow === board.length){
          break;
        }
      }
      if (count >= 2) {
        return true;
      }

      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {

      var rowLength = this.rows().length
      for ( let i = -rowLength; i < rowLength; i++) {
        if ( this.hasMajorDiagonalConflictAt(i) ) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // Starting position = [0, minorDiagonalColumnIndexAtFirstRow]
      let board = this.rows();
      let counter = 0;
      let y = minorDiagonalColumnIndexAtFirstRow - board.length + 1;
      // Counter for occurences
      // Check for occurences of 1 by traversing to each element in diagonal. For ever occurence add 1.
      for (let i = 0; i < board.length; i++){
        if (board[i][minorDiagonalColumnIndexAtFirstRow] === 1){
          counter++
        }

        if (minorDiagonalColumnIndexAtFirstRow < y) {
          break
        }
        minorDiagonalColumnIndexAtFirstRow--
      }
      // If occurences >=2 return true else return false.
      if (counter >=2){
        return true
      }

      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // check all diagonals for conflicts by traversing columns from 0 to board.length*2
      var rowLength = this.rows().length;
      for (let i = 0; i < rowLength * 2; i++){
        if (this.hasMinorDiagonalConflictAt(i)){
          return true
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
