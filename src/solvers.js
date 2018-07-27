/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// window.findSolution = function(row, n, board, validator, callback) {
//   // var solutionCount = 0;
//   if (row === n) {
//     // solutionCount++;
//     callback();
//     return;
//   }
//   for (var i = 0; i < n; i++) {
//     board.togglePiece(row, i);
//     if (!board[validator]()) {
//       findSolution(row + 1, n, board, validator, callback);
//     }
//     board.togglePiece(row, i);
//   }
//   // return solutionCount;
// };

window.checkRookSolution = function(matrix) {
  return _.uniq(matrix).length !== matrix.length ? false : true;
};

window.checkQueenSolution = function(matrix) {
  if(!checkRookSolution(matrix)){
    return false;
  }
  for(var i = 0; i < matrix.length; i++){
    for(var j = i+1; j < matrix.length; j++){
      if(i - j === matrix[i] - matrix[j] || i - j === -matrix[i] + matrix[j]){
        return false;
      }
    }
  }
  return true;
};

window.findNRooksSolution = function(n) {
  // var solution = undefined; //fixme
  //
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;

  var solution = new Board( { n: n } );
  var col = 0;
  for (var row = 0; row < n; row++) {
    solution.togglePiece(row, col);
    col++;
  }

  return solution.rows();

  };

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = undefined; //fixme
  //
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;

  // Fibonacci Version:
  // var solutionCount = 1;
  // loop from 2 to n
  //   solutionCount * = index

  var solutionCount = 1;
  for (var i = 2; i <= n; i++) {
    solutionCount *= i;
  }
  return solutionCount;

  };

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
//   var solution = undefined; //fixme
//
//   console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
//   return solution;
// };
//
// // return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other

  if (n === 2 || n === 3) {
    return (new Board( { n: n } )).rows();
  }

  var solution = new Board( { n: n } );

  var innerRecursion = (col) => {
    if (col === n) {
      if (solution.hasAnyQueensConflicts()) {
        return false;
      }
      return true;
    }

    for (var row = 0; row < n; row++) {
      solution.togglePiece(row, col);
      if (!solution.hasAnyQueensConflicts()) {
        if (innerRecursion(col + 1)) {
          return true;
        }
      }
      solution.togglePiece(row, col);
    }

    return false;
  };

  innerRecursion(0);

  return solution.rows();

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  // var solutionCount = 0;
  //
  // var board = new Board({n:n});
  //
  // findSolution(0, n, board, 'hasAnyQueensConflicts', function() {
  //   solutionCount++;
  // });
  //
  // // console.log('Number of solutions for ' + n + ' queens:', solutionCount, 'in', endTime - startTime, 'milliseconds');
  // // return solutionCount;
  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  // return solutionCount;

  //   var solutionCount = undefined; //fixme
  //
  //   console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  //   return solutionCount;

    var startTime = new Date();
    if (n===0){return 1;} //0 queens fit on a 0x0 board 1 time
    var solutionCount = 0;
    var rNQueens = function(tempBoard){
      if(tempBoard.length === n){
        checkQueenSolution(tempBoard) && solutionCount++;
        return;
      }
      for(var i = 0; i < n; i++){
        var boardCheck = tempBoard.concat(i);
        if (checkQueenSolution(boardCheck)){
          rNQueens(boardCheck);
        } else {
          continue;
        }
      }
    };
    rNQueens([]);
    var endTime = new Date();
    console.log('Number of solutions for ' + n + ' queens:', solutionCount, 'in', endTime - startTime, 'milliseconds');
    return solutionCount;
  // };


  // if (n === 2 || n === 3) {
  //   return 0;
  // }
  //
  // var solutionCount = 0;
  // var board = new Board({ n: n });
  // var innerRecursion = (col) => {
  //   if (col === n) {
  //     solutionCount++;
  //     return;
  //   }
  //
  //   if (n % 2 === 0 && n > 1) {
  //     var rowLen = (col === 0 ? (n / 2) - 0.5 : n);
  //     for (var row = 0; row < rowLen; row++) {
  //       board.togglePiece(row, col);
  //       if (!board.hasAnyQueensConflicts()) {
  //         innerRecursion(col + 1);
  //       }
  //       board.togglePiece(row, col);
  //     }
  //     if (n > 1 && col === 0) {
  //       solutionCount *= 2;
  //     }
  //   } else {
  //     for (var row = 0; row < n; row++) {
  //       board.togglePiece(row, col);
  //       if (!board.hasAnyQueensConflicts()) {
  //         innerRecursion(col + 1);
  //       }
  //       board.togglePiece(row, col);
  //     }
  //   }
  //
  // };
  //
  // innerRecursion(0);
  // return solutionCount;

  // var solutionCount = 0; // fixme
  // var solutionBoard = new Board(makeEmptyBoardMatrix(n));
  //
  // var helper = function(n, rowIndex, solutionBoard) {
  //   if(rowIndex === n) {
  //     solutionCount++;
  //     return;
  //   }
  //
  //   for(var colIndex = 0; colIndex < n; colIndex++){
  //     solutionBoard.setPiece(rowIndex, colIndex, 1);
  //     if(solutionBoard.hasAnyQueensConflicts() === false) {
  //       helper(n, rowIndex + 1, solutionBoard);
  //     }
  //     solutionBoard.setPiece(rowIndex, colIndex, 0);
  //   }
  // }
  //
  // helper(n, 0, solutionBoard);
  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  // return solutionCount;

};



// /*           _
//    ___  ___ | |_   _____ _ __ ___
//   / __|/ _ \| \ \ / / _ \ '__/ __|
//   \__ \ (_) | |\ V /  __/ |  \__ \
//   |___/\___/|_| \_/ \___|_|  |___/
//
// */
//
// // hint: you'll need to do a full-search of all possible arrangements of pieces!
// // (There are also optimizations that will allow you to skip a lot of the dead search space)
// // take a look at solversSpec.js to see what the tests are expecting
//
//
// // return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
//
// window.findNRooksSolution = function(n) {
//   var solution = new Board({'n': n});
//   var row = 0;
//   var col = 0;
//   var firstRun = false;
//   var realSolution = [];
//
//   if(n === 1){
//     return [[1]];
//   }
//
//   solution.togglePiece(0, 0);
//   //iterating through every row array
//   for(row; row < n; row++) {
//     col = 0;
//     //iterating through every column in that row
//     for (col; col < n; col++) {
//       //testing if it's the first run
//       if(!firstRun) {
//         firstRun = true;
//       } else {
//         //toggling piece and performing check on the piece
//         solution.togglePiece(row, col);
//         if(solution.hasAnyRowConflicts(row) || solution.hasAnyColConflicts(col)){
//           //if conflicts are flagged, we toggle the piece back to zero
//           solution.togglePiece(row, col);
//         }
//       }
//     }
//   }
//   //Iterating through the solution to get each row array from the object and pushing to our final array matrix
//   for(var i = 0; i < n; i ++) {
//     realSolution.push(solution.get(i));
//   }
//
//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   return realSolution;
// };
//
//
//
// // return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function(n) {
//   var realSolution = [];
//   var iT = [];
//   var realBoardSize = n-1;
//
//   if(n === 1){
//     return 1;
//   }
//
//   for(var masterRookIndex = 0; masterRookIndex < n; masterRookIndex++) {
//     //create new board
//     var board = new Board({'n': n});
//     //start initial rook position
//     board.togglePiece(0, masterRookIndex);
//     iT[0] = masterRookIndex;
//     //iterating through every row of array
//     //PER first row position.
//     for(var row = 1; row < n; row++) {
//
//       //iterating through every column in that row
//       for (var col = 0; col < n; col++) {
//
//         // if((0, masterRoo...) === (row, col)) {
//         //   //we might not need this line since we
//         //   //always start on row = 1 in the previous
//         //   //loop, no?
//
//               //NOTE: THIS DOES NOT WORK AS EXPECTED,
//               //DO NOT USE; ACTS LIKE AN 'OR' STATEMENT.
//         //   continue;
//         // }
//
//         // OBSOLETE: fixed source of glitch by preventing moving i on the last loop.
//         //(this paragraph)
//         // //to prevent a glitch; forces us to 'double break'
//         // //whenever we've done our rook incrementation on the last
//         // //row, meaning a second loop from that room isn't necessary,
//         // //so we can actually just reset the board (because this 'doube break'
//         // // will actually be a 'triple break' once the row loop sees it is
//         // //too high.)
//         // // if (row > realBoardSize) break;
//
//         //toggling piece and then see if it's conflict-free
//         board.togglePiece(row, col);
//         iT[row] = col;
//
//         if(board.hasAnyRooksConflicts()){
//           //if conflicts are flagged, we toggle the piece back to zero
//           board.togglePiece(row, col);
//           iT[row] = undefined;
//           //and ignore rest of code and reloop with this position reset to zero
//         } else {
//           //this runs if both tests above return false, meaning 'if' condition
//           //was not met, meaning there are no conflicts and it could be a solution.
//           if(row === realBoardSize) {
//             //if we're in this last row, and both tests were false,
//             //we have a solution and push it out. Otherwise, just continue with
//             //the loop onto the next row. (?) NEEDS TO BREAK HERE IF NOT LAST
//             //ROW (the 'else' of this evaluation) AND JUMP TO NEXT ROW!
//             realSolution.push(board);
//             //now we need to 'backtrack', the loop version of
//             //recursing. We're going to look for the first *previous*
//             //row where the rook is not currently on the far
//             //right of that row AND we will reset any row where the rook
//             //IS on the far right.
//
//             //start function? maybe lines 125-217 should go within a function?
//             for (var recursingRow = realBoardSize; recursingRow >= 0; recursingRow--){
//               //runs on every row BACKWARDS, from BOTTOM TO TOP.
//               //does one of three things:
//               //0. if we're in the last row, clear yourself and
//               //continue the loop. (Don't adjust yourself. Prevents glitches.)
//               //1. if we're not in the far right of the current row,
//               //then we shift the position of '1' one position right
//               //within that row...
//               //(NOTE: do we need to reset 'row'?)
//               //2. if we ARE in the far right, we check if we're then
//               //in the far right of the FIRST (0) ROW, which would indicate
//               //that we've reached the end of the search and can exit
//               //the function altogether.
//               //3. if we ARE in the far right, but NOT in the 0 row, then
//               //we simple 'reset' the row to all zeroes, and let the loop
//               //jump up to a PREVIOUS row.
//               if (recursingRow === realBoardSize) {
//                 board.togglePiece( recursingRow, (iT[recursingRow]) );
//                 iT[recursingRow] = undefined;
//                 continue;
//               }
//
//
//               else if(iT[recursingRow] < realBoardSize){
//               //this block runs if we're NOT on the far right of the recursing row.
//
//               //This is where my glitch lies. For some reason, after these operations,
//               //things go wrong. Seems we need to jump the row, but it doesn't seem
//               //to be working when I do that either... if I don't do anything about the
//               //row loop, though, it will "double flip" the most recently adjusted row's
//               //rook position, taking it off the board for that row, I think.
//
//                 //these two lines toggle the current rook position 'off',
//                 //and toggle the position to the right of the rook 'on'.
//                 board.togglePiece( recursingRow, (iT[recursingRow]) ) //toggle current position off
//                 board.togglePiece( recursingRow, (iT[recursingRow]+1) ) //toggle new position on
//                 iT[recursingRow]++
//
//                                 //bug is HERE for 4x4; see gist notes.
//                             //maybe a 'while' loop that checks for conflicts before continuing?
//                             //Note: so, if I add the following while loop, it breaks 3x3, barely...
//                             //probably because it doesn't check if i is all the way right.
//                             //hmmm....
//                 var loopEscape = false;
//                 while(board.hasAnyRowConflicts(row) || board.hasAnyColConflicts(col)){
//                 if (iT[recursingRow] === realBoardSize) {loopEscape = true;}
//                   board.togglePiece( recursingRow, (iT[recursingRow]) ) //toggle current position off
//                   board.togglePiece( recursingRow, (iT[recursingRow]+1) ) //toggle new position on
//                   iT[recursingRow]++
//                 }
//
//                 //do we now need to do row = a ?
//                 //CHECK HERE FOR PROBLEMS!-------(not currently active, so nm )
//                 //I think we need to jump to the row AFTER(below) the recursing row, since
//                 //that's the one we modified, and we're now
//                 //checking for permutations of it...
//
//                 // col = realBoardSize; //this used to allow line allows "2" to function, but not "3"
//
//                 //we need to make it so that the row test doesn't 'pop', causing it to reset our board!
//
//                 row = recursingRow +1//when we jump out to the collumn loop, we want our background
//                 //'row' value to be the row we just adjusted, +1
//
//                 col = -1 //we want to go through starting at the last clean row, on col position 0.
//                 //however, this will get incremented immediately after we break, so we set to -1 to
//                 //get the 0 position desired.
//
//                 if (!loopEscape) break; // we've now adjusted the recursing row, and toggled
//                 // the row we're going to start running at again, so now we need to exit
//                 // this loop, and run as normal with our newly right-adjusted rook.
//
//               }
//               else if ( recursingRow === 0){
//                 //this block runs if we're ON the far right of the MASTER (0) ROW.
//
//                 //here we should exit, because this means
//                 //that we've checked every possible permutation.
//                 //(because this row just failed prev test and
//                 //is therefore on the far right @ first row)
//                 console.log(realSolution)
//                 var solutionCount = realSolution.length;
//                 console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//                 return solutionCount;
//               }
//
//               else {
//                 //we're on the far right, but not on first row, so:
//                 //clean up the row, reloop on a row further up.
//                 board.togglePiece(recursingRow,realBoardSize);
//                 iT[recursingRow] = undefined;
//               }
//             }
//             //end function?
//           } else {
//             break;
//             //break out of collumn loop so that
//             //a non-conflicted, non-last-row situation forces out
//             //to the next row. (Seems to work!)
//           }//end of 'last row AND non conflict' if loop
//
//         }//end of 'non conflict' else loop (?)
//
//       } //end of col loop
//     } //end of row loop
//   } //end of MasterRook/board generation loop
//
//   console.log(realSolution)
//   var solutionCount = realSolution.length;
//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionCount;
// };
//
//
//
// // return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// window.findNQueensSolution = function(n) {
//   // var solution = undefined; //fixme
//
//   var solution = new Board({'n': n});
//   var row = 0;
//   var col = 0;
//   var firstRun = 0;
//   var realSolution = [];
//
//   if(n === 1){
//     return [[1]];
//   }
//
//   if (n > 1){
//     solution.togglePiece(0, 1);
//     //iterating through every row array
//     for(row; row < n; row++) {
//       col = 0;
//       //iterating through every column in that row
//       for (col; col < n; col++) {
//         //testing if it's the first run
//         if(firstRun < 2) {
//           firstRun ++;
//         } else {
//           //toggling piece and performing check on the piece
//           solution.togglePiece(row, col);
//           if(solution.hasAnyRooksConflicts() || solution.hasAnyMajorDiagonalConflicts() || solution.hasAnyMinorDiagonalConflicts()){
//             //if conflicts are flagged, we toggle the piece back to zero
//             solution.togglePiece(row, col);
//           }
//         }
//       }
//     }
//   }
//   //Iterating through the solution to get each row array from the object and pushing to our final array matrix
//   for(var i = 0; i < n; i ++) {
//     realSolution.push(solution.get(i));
//   }
//
//
//   console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
//   return realSolution;
// };
//
//
// // return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// window.countNQueensSolutions = function(n) {
//   var realSolution = [];
//   var iT = [];
//   var realBoardSize = n-1;
//
//   if(n === 0){
//     return 1;
//   }
//
//   if(n === 1){
//     return 1;
//   }
//
//   for(var masterRookIndex = 0; masterRookIndex < n; masterRookIndex++) {
//     //create new board
//     var board = new Board({'n': n});
//     //start initial rook position
//     board.togglePiece(0, masterRookIndex);
//     iT[0] = masterRookIndex;
//     if (iT[0] > realBoardSize) {return realSolution.length}
//
//     //iterating through every row of array
//     //PER first row position.
//     for(var row = 1; row < n; row++) {
//
//       //iterating through every column in that row
//       for (var col = 0; col < n; col++) {
//
//         // if((0, masterRoo...) === (row, col)) {
//         //   //we might not need this line since we
//         //   //always start on row = 1 in the previous
//         //   //loop, no?
//
//               //NOTE: THIS DOES NOT WORK AS EXPECTED,
//               //DO NOT USE; ACTS LIKE AN 'OR' STATEMENT.
//         //   continue;
//         // }
//
//         // OBSOLETE: fixed source of glitch by preventing moving i on the last loop.
//         //(this paragraph)
//         // //to prevent a glitch; forces us to 'double break'
//         // //whenever we've done our rook incrementation on the last
//         // //row, meaning a second loop from that room isn't necessary,
//         // //so we can actually just reset the board (because this 'doube break'
//         // // will actually be a 'triple break' once the row loop sees it is
//         // //too high.)
//         // // if (row > realBoardSize) break;
//
//         //toggling piece and then see if it's conflict-free
//         board.togglePiece(row, col);
//         iT[row] = col;
//
//         if(board.hasAnyRooksConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()){
//           //if conflicts are flagged, we toggle the piece back to zero
//
//           board.togglePiece(row, col);
//           iT[row] = undefined;
//           //and ignore rest of code and reloop with this position reset to zero
//         } else {
//           //this runs if both tests above return false, meaning 'if' condition
//           //was not met, meaning there are no conflicts and it could be a solution.
//           if(row === realBoardSize) {
//             //if we're in this last row, and both tests were false,
//             //we have a solution and push it out. Otherwise, just continue with
//             //the loop onto the next row. (?) NEEDS TO BREAK HERE IF NOT LAST
//             //ROW (the 'else' of this evaluation) AND JUMP TO NEXT ROW!
//             // (iT[0] === n) || (iT[n] === 0)
//
//             var dontPush = false;
//             iT.forEach(function(s){if (s === undefined || iT[0] === n || iT[n] === 0 ) dontPush = true})
//             if (!dontPush)
//               realSolution.push(board);
//             //now we need to 'backtrack', the loop version of
//             //recursing. We're going to look for the first *previous*
//             //row where the rook is not currently on the far
//             //right of that row AND we will reset any row where the rook
//             //IS on the far right.
//
//             //start function? maybe lines 125-217 should go within a function?
//             for (var recursingRow = realBoardSize; recursingRow >= 0; recursingRow--){
//               //runs on every row BACKWARDS, from BOTTOM TO TOP.
//               //does one of three things:
//               //0. if we're in the last row, clear yourself and
//               //continue the loop. (Don't adjust yourself. Prevents glitches.)
//               //1. if we're not in the far right of the current row,
//               //then we shift the position of '1' one position right
//               //within that row...
//               //(NOTE: do we need to reset 'row'?)
//               //2. if we ARE in the far right, we check if we're then
//               //in the far right of the FIRST (0) ROW, which would indicate
//               //that we've reached the end of the search and can exit
//               //the function altogether.
//               //3. if we ARE in the far right, but NOT in the 0 row, then
//               //we simple 'reset' the row to all zeroes, and let the loop
//               //jump up to a PREVIOUS row.
//               if (recursingRow === realBoardSize) {
//                 board.togglePiece( recursingRow, (iT[recursingRow]) );
//                 iT[recursingRow] = undefined;
//                 continue;
//               }
//
//
//               else if(iT[recursingRow] < realBoardSize){
//               //this block runs if we're NOT on the far right of the recursing row.
//
//               //This is where my glitch lies. For some reason, after these operations,
//               //things go wrong. Seems we need to jump the row, but it doesn't seem
//               //to be working when I do that either... if I don't do anything about the
//               //row loop, though, it will "double flip" the most recently adjusted row's
//               //rook position, taking it off the board for that row, I think.
//
//                 //these two lines toggle the current rook position 'off',
//                 //and toggle the position to the right of the rook 'on'.
//                 board.togglePiece( recursingRow, (iT[recursingRow]) ) //toggle current position off
//                 board.togglePiece( recursingRow, (iT[recursingRow]+1) ) //toggle new position on
//                 iT[recursingRow]++
//
//                                 //bug is HERE for 4x4; see gist notes.
//                             //maybe a 'while' loop that checks for conflicts before continuing?
//                             //Note: so, if I add the following while loop, it breaks 3x3, barely...
//                             //probably because it doesn't check if i is all the way right.
//                             //hmmm....
//                 var loopEscape = false;
//                 while(board.hasAnyRowConflicts(row) || board.hasAnyColConflicts(col)){
//                   if (iT[recursingRow] === realBoardSize) {loopEscape = true;}
//                   board.togglePiece( recursingRow, (iT[recursingRow]) ) //toggle current position off
//                   board.togglePiece( recursingRow, (iT[recursingRow]+1) ) //toggle new position on
//                   iT[recursingRow]++
//                 }
//
//                 //do we now need to do row = a ?
//                 //CHECK HERE FOR PROBLEMS!-------(not currently active, so nm )
//                 //I think we need to jump to the row AFTER(below) the recursing row, since
//                 //that's the one we modified, and we're now
//                 //checking for permutations of it...
//
//                 // col = realBoardSize; //this used to allow line allows "2" to function, but not "3"
//
//                 //we need to make it so that the row test doesn't 'pop', causing it to reset our board!
//
//                 row = recursingRow +1//when we jump out to the collumn loop, we want our background
//                 //'row' value to be the row we just adjusted, +1
//
//                 col = -1 //we want to go through starting at the last clean row, on col position 0.
//                 //however, this will get incremented immediately after we break, so we set to -1 to
//                 //get the 0 position desired.
//
//                 if (!loopEscape) break; // we've now adjusted the recursing row, and toggled
//                 // the row we're going to start running at again, so now we need to exit
//                 // this loop, and run as normal with our newly right-adjusted rook.
//
//               }
//               else if ( recursingRow === 0){
//                 //this block runs if we're ON the far right of the MASTER (0) ROW.
//
//                 //here we should exit, because this means
//                 //that we've checked every possible permutation.
//                 //(because this row just failed prev test and
//                 //is therefore on the far right @ first row)
//                 console.log(realSolution)
//                 var solutionCount = realSolution.length;
//                 console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//                 return solutionCount;
//               }
//
//               else {
//                 //we're on the far right, but not on first row, so:
//                 //clean up the row, reloop on a row further up.
//                 board.togglePiece(recursingRow,realBoardSize);
//                 iT[recursingRow] = undefined;
//               }
//             }
//             //end function?
//           } else {
//             break;
//             //break out of collumn loop so that
//             //a non-conflicted, non-last-row situation forces out
//             //to the next row. (Seems to work!)
//           }//end of 'last row AND non conflict' if loop
//
//         }//end of 'non conflict' else loop (?)
//
//       } //end of col loop
//     } //end of row loop
//   } //end of MasterRook/board generation loop
//
//   console.log(realSolution)
//   var solutionCount = realSolution.length;
//
//   console.log('Number of solutions for ' + n + ' queens:', solutionCount);
//   return solutionCount;
// };
//
// window.countNQueensBitwise = function(n){
//   var solutionCount = 0;
//
//   console.log('Bitwise: Number of solutions for ' + n + ' queens:', solutionCount);
//   return solutionCount;
// };
