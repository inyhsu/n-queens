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



window.findNRooksSolution = function(n) {
  // check

  var board = new Board({n:n});
  var toggle = false;
  var toggleRow =[];
  var toggleCol =[];
  // [1,0,0]
  // [0,0,0]
  // [0,0,0]

  //(0,0) --> (0,1)
  for (let i = 0; i < board.rows().length; i ++) {
    let rows = board.get(i);
    let row = i;
    for(let j = 0; j < board.rows().length; j++) {
      let column = j;

      if(!toggleRow.includes(i) && !toggleCol.includes(j)){
        toggle = false;
      }

      if(!toggle) {
        board.togglePiece(row,column);
        toggle = true;
        toggleRow.push(i);
        toggleCol.push(j);
      }
    }
  }

  // for(let i = 0; i < board.rows(); i++) {
  //   solution.push(board.rows()[i]);
  // }
  var solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = undefined; //fixme
  // edge case n = 0 return []
  // set number of recursions
  // recursion function
  // call recursion



  var solutions = [];
  var recursionCounter = n * n

  for (let i = 0; i < recursionCounter; i++) {
    var board = new Board({n:n});
    for (let r = 0; r < n ; r++) {
      let rows = board.rows()[r] //[0,0]
      let row = r

      for(let c = 0; c < n ; c++) {
        let column = rows[c];
        board.togglePiece(row,column);

        solutions.push(board);
        }

    }
  }
  recursionCounter--;

        // increment rook position
      //
          //
          // if(board[row][column] === 1) {
          //   board.togglePiece(row,column+1)
    //        }

            //if the 1 instance was at the edge, which is equal to n

  var placeRooks = function() {
    var currentSolutions = solutions.slice(0, solutions.length-1);
    //looping thru the boards
    for(let j = 0 ; j < currentSolutions.length ; j++) {
      let board = currentSolutions[j];

      // for each space add a rook starting at 0 row, 0 column
      for (let r = 0; r < n ; r++) {
        let rows = board.rows()[r];
        let row = r;
        for(let c = 0; c < n ; c++) {
          let column = row[c];

        // if there is no rook add rook
        if (board[row][column] === 0){
          board.togglePiece(row,column)
        }

          // Check for conflicts. If there is no conflict push.
        if (!board.hasAnyRooksConflicts()){solutions.push(board)}
        }
      }
      // for loop end
    }
    // increment recursion counter and check
    recursionCounter--
    if (recursionCounter > 0){
      placeRooks();
    } else {
      return
    }
  };

  placeRooks();
  solutionCount = solutions.length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
