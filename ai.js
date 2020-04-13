class TicTacToeAI
{
    board = null
    player = null
    moves  = []
    maxDepth = 100

    constructor(player, board)
    {
        this.player = player
        this.board  = board
    }

    getBestMove()
    {
        let minimax = this.minimax(this.board, true, 0)
        
        // search best moves in depth 0
        // console.log(this.moves)
        // console.log(minimax)
        let bestScore       = -Infinity
        let filter_depth_0  = this.moves.filter((el) => {
            if (el.depth == 0) bestScore = Math.max(el.score, bestScore)
            return el.depth === 0
        })
        let filter_best_move= filter_depth_0.filter((el) => el.score >= bestScore)
        
        // if multiple move
        let bestMove = filter_best_move[Math.floor(Math.random() * filter_best_move.length)]
        bestMove.instance = this

        // return
        return bestMove
    }

    minimax(board, isMaximizing, depth)
    {
        let scores = { win: 1, lose: -1, tie: 0 }

        // terminal : check win
        let win = board.getWinner()
        if (win != null) {
            if (win == 'tie') return scores.tie
            return (this.player == win) ? scores.win : scores.lose
        }

        // terminal : check max depth
        if (depth == this.maxDepth) return scores.tie

        // maximizing
        if (isMaximizing)
        {
            let bestScore = -Infinity
            for (var i = 0; i < board.state.length; i++)
            {
                if (board.state[i] == '')
                {
                    let newBoard = new TicTacToeBoard([...board.state])
                    newBoard.move(this.player, i) // isMaximizing = ai isntance
                    let score = this.minimax(newBoard, false, depth + 1)
                    bestScore = Math.max(score, bestScore)
                    this.moves.push({ depth, isMaximizing, move: i, score })
                }
            }
            return bestScore
        
        // minimizing
        } else {
            let bestScore = Infinity
            for (var i = 0; i < board.state.length; i++)
            {
                if (board.state[i] == '')
                {
                    let newBoard = new TicTacToeBoard([...board.state])
                    let enemy = (this.player == 'x') ? 'o' : 'x'
                    newBoard.move(enemy, i) // isMaximizing = Enemy isntance
                    let score = this.minimax(newBoard, true, depth + 1)
                    this.moves.push({ depth, isMaximizing, move: i, score })
                    bestScore = Math.min(score, bestScore)
                }
            }
            return bestScore
        }
    }
}