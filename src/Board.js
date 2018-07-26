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
    hasRowConflictAt: function(rowIndex) {

      // var counter = 0;
      // var row = this.get(rowIndex);
      //
      // for (var i = 0; i < row.length; i++) {
      //   if (row[i]) {
      //     counter++;
      //   }
      // }
      //   if (counter > 1) {
      //       return true;
      // }
      // return false; // fixme

      // create total variable
      var total = 0;
      // iterate through row
      for (var x = 0; x < rowIndex.length; x += 1) {
        // if row index returns true
        if (rowIndex[x]) {
          // add one to total
          total += 1;
        }
      }
// if total is greater than 1 return true otherwise return false
return (total > 1);

// var total = rowIndex.reduce(function(sum, element) {
//   return sum + element;
// });
// return (total > 1);

// var inRow = 0;
// for (slot of this.rows()[rowIndex]) {
//   if (slot === 1) {
//     inRow++;
//   }
// }
// return inRow > 1;
// // var conflicts = function(curIndex, array) {
// //   var numConflicts = 0;
// //   if(curIndex === array[rowIndex].length) {
// //     return numConflicts;
// //   }
// //   if(array[rowIndex][curIndex]) {
// //     numConflicts++;
// //   }
// //   console.log(curIndex);
// //   return numConflicts+conflicts(curIndex+1);
// // };
//
// // return conflicts(0, this.rows()) > 1;

  // var n = this.get('n');
  // var row = this.get(rowIndex);
  //
  // var isOccupied = false;
  // for (var i = 0; i < n; i++) {
  //   if (row[i]) {
  //     if (isOccupied) {
  //       return true;
  //     } else {
  //       isOccupied = true;
  //     }
  //   }
  // }
  //
  // return false;

    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // // var index = this.get(rowIndex);
      // for (var i = 0; i < this.get('n'); i++) {
      //   if (this.hasRowConflictAt(i)) {
      //     return true;
      //   }
      // }
      // return false; // fixme

// call rows function
var board = this.rows();
// create collision detection
var collision = false;
// iterate through board length
for (var i = 0; i < board.length; i++) {
  // iterate through rows
  if (this.hasRowConflictAt(board[i])) {
    // if totale is more than 1, return true for variable collision
    collision = true;
  }
}
// return collision value
return collision;

// return board.every(function(row) {
//   return !this.hasRowConflictAt(row);
// });

// var hasConflict = false;
// for (var rowIndex in this.rows()) {
//   if (this.hasRowConflictAt(rowIndex)) {
//     hasConflict = true;
//   }
// }
// return hasConflict;

  // var n = this.get('n');
  // for (var i = 0; i < n; i++) {
  //   if (this.hasRowConflictAt(i)) {
  //     return true;
  //   }
  // }
  // return false;

    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // var counter = 0;
      // var col = this.get('n');
      //
      // for (var i = 0; i < col.length; i++) {
      //   if (col[i]) {
      //     counter++;
      //   }
      // }
      //   if (counter > 1) {
      //       return true;
      // }
      // return false; // fixme

      var board = this.rows();
      var tally = 0;

      // var has 1

      for (var i = 0; i < board.length; i++) {
        if (board[i][colIndex] === 1) {
          tally++;
        }
      }

      return (tally > 1);

      var inCol = 0;
      for (var row of this.rows()) {
        if(row[colIndex] === 1) {
          inCol++;
        }
      }
  return inCol > 1;

// var inCol = 0;
// for (var row of this.rows()) {
//   if(row[colIndex] === 1) {
//     inCol++;
//   }
// }
// return inCol > 1;

  // var n = this.get('n');
  //
  // var isOccupied = false;
  // for (var i = 0; i < n; i++) {
  //   if (this.get(i)[colIndex]) {
  //     if (isOccupied) {
  //       return true;
  //     } else {
  //       isOccupied = true;
  //     }
  //   }
  // }
  //
  // return false;

    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // // var index = this.get(colIndex);
      // for (var i = 0; i < this.get('n'); i++) {
      //   if (this.hasColConflictAt(i)) {
      //     return true;
      //   }
      // }
      // return false; // fixme

      var board = this.rows();
      var collision = false;

      for (var j = 0; j < board.length; j++) {
        if (this.hasColConflictAt(j)) {
          collision = true;
        }
      }
      return collision;

      // var hasConflict = false;
      // for (var colIndex in this.rows()[0]) {
      //   if (this.hasColConflictAt(colIndex)) {
      //     hasConflict = true;
      //   }
      // }
      // return hasConflict;

      // var n = this.get('n');
      // for (var i = 0; i < n; i++) {
      //   if (this.hasColConflictAt(i)) {
      //     return true;
      //   }
      // }
      // return false;

    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // return false; // fixme

      var board = this.rows();
      var tally = 0;
      var index = majorDiagonalColumnIndexAtFirstRow;

      if (index > 0) {
        for (let i = 0; i < board.length - index; i += 1) {
          if (board[i][i + index] === 1) {
            tally += 1;
          }
        }
      } else if (index === 0) {
        for (let i = 0; i < (board.length - 1); i += 1) {
          if (board[i][i] === 1) {
            tally += 1;
          }
        }
      } else if (index < 0) {
        for (let i = 0; i < board.length - Math.abs(index); i++) {
          if (board[Math.abs(index) + i][i] === 1) {
            tally += 1;
          }
        }
      }
      return (tally > 1);

      // var inDiagonal = 0;
      // var diagonalIndex = majorDiagonalColumnIndexAtFirstRow;
      // var getDiagonalIndex = this._getFirstRowColumnIndexForMajorDiagonalOn;
      // var board = this.rows();
      // for (var rowIndex in board) {
      //   for (var colIndex in board[rowIndex]) {
      //     if (getDiagonalIndex(rowIndex, colIndex) === diagonalIndex && board[rowIndex][colIndex] === 1) {
      //       inDiagonal++;
      //     }
      //   }
      // }
      // return inDiagonal > 1;

      var n = this.get('n');
      var absDiag = Math.abs(majorDiagonalColumnIndexAtFirstRow);
      var pos = [0, 0]; // [row, col]

      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        pos[0] = absDiag;
      } else {
        pos[1] = absDiag;
      }

      var isOccupied = false;
      while (pos[0] < n && pos[1] < n) {
        if (this.get(pos[0])[pos[1]]) {
          if (isOccupied) {
            return true;
          } else {
            isOccupied = true;
          }
        }

        pos[0]++;
        pos[1]++;
      }

      return false;

    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // return false; // fixme

      var board = this.rows();
      var collision = false;

      for (let j = -(board.length - 1); j < board.length; j += 1) {
        if (this.hasMajorDiagonalConflictAt(j)) {
          collision = true;
        }
      }
      return collision;

      // var hasConflict = false;
      // for (var rowIndex in this.rows()) {
      //   for (var colIndex in this.rows()[rowIndex]) {
      //     var diagonalIndex = this._getFirst RowColumnIndexForMajorDiagonalOn(rowIndex, colIndex);
      //     if (this.hasMajorDiagonalConflictAt(diagonalIndex)) {
      //       hasConflict = true;
      //     }
      //   }
      // }
      // return hasConflict;

      var n = this.get('n');

      for (var i = -(n); i < n - 1; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false;

      },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // return false; // fixme

      var board = this.rows();
      var tally = 0;
      var index = minorDiagonalColumnIndexAtFirstRow;

      if (index < board.length - 1) {
        for (let i = 0; i < (index + 1); i += 1) {
          if (board[i][index - i] === 1) {
            tally += 1;
          }
        }
      } else if (index === board.length - 1) {
        for (let i = 0; i < board.length - 1; i += 1) {
          if (board[i][index - i] === 1) {
            tally += 1;
          }
        }
      } else if (index > board.length - 1) {
        for (let i = 0; i < ((2 * board.length) - 1 - index); i += 1) {
          if ( board[Math.abs(board.length - 1 - index) + i][board.length - 1 - i] === 1) {
            tally += 1;
          }
        }
      }

      return (tally > 1);

      // var inDiagonal = 0;
      // var diagonalIndex = minorDiagonalColumnIndexAtFirstRow;
      // var getDiagonalIndex = this._getFirstRowColumnIndexForMinorDiagonalOn;
      // var board = this.rows();
      // for (var rowIndex in board) {
      //   for (var colIndex in board[rowIndex]) {
      //     if (getDiagonalIndex(JSON.parse(rowIndex), JSON.parse(colIndex)) === diagonalIndex && board[rowIndex][colIndex] === 1) {
      //       inDiagonal++;
      //     }
      //   }
      // }
      // return inDiagonal > 1;

      var n = this.get('n');
      var pos = [0, 0]; // [row, col]

      if (minorDiagonalColumnIndexAtFirstRow < n) {
        pos[1] = minorDiagonalColumnIndexAtFirstRow;
      } else {
        pos[1] = n - 1;
        pos[0] = minorDiagonalColumnIndexAtFirstRow - (n - 1);
      }

      var isOccupied = false;
      while (pos[0] < n && pos[1] >= 0) {
        if (this.get(pos[0])[pos[1]]) {
          if (isOccupied) {
            return true;
          } else {
            isOccupied = true;
          }
        }

        pos[0]++;
        pos[1]--;
      }

      return false;

    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // return false; // fixme

      var board = this.rows();
      var collision = false;

      for (let j = 0; j < (board.length - 1) * 2; j += 1) {
        if (this.hasMinorDiagonalConflictAt(j)) {
          collision = true;
        }
      }
      return collision;

      // var hasConflict = false;
      // for (var rowIndex in this.rows()) {
      //   for (var colIndex in this.rows()[rowIndex]) {
      //     var diagonalIndex = this._getFirstRowColumnIndexForMinorDiagonalOn(JSON.parse(rowIndex), JSON.parse(colIndex));
      //     if (this.hasMinorDiagonalConflictAt(diagonalIndex)) {
      //       hasConflict = true;
      //     }
      //   }
      // }
      //   return hasConflict;

      var n = this.get('n');
      var maxMinorDiagIndex = (n - 1) * 2;
      for (var i = 1; i <= maxMinorDiagIndex - 1; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false;

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
