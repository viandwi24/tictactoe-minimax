class TicTacToeBoard
{
    state = [
        '', '', '',   // 0 1 2
        '', '', '',   // 3 4 5
        '', '', '',   // 6 7 8
    ]
    
    size = 3  // 3x3
    winCombo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ]

    constructor (state = null)
    {
        if (state != null) this.state = state
    }

    move (player, index)
    {
        if (player != 'x' && player != 'o')  player = ''
        this.state[index] = player
    }

    getPossibleMove()
    {
        let count = 0
        this.state.forEach(el  => { if (el == '') count++ })
        return count
    }

    getWinner()
    {
        let win, tmpPlayer
        for (var i = 0; i < this.winCombo.length; i++)
        {
            win = true
            tmpPlayer = null
            for (var j = 0; j < this.winCombo[i].length; j++)
            {
                let item = this.winCombo[i][j]
                // check if value not same with before value in combo
                if ( (tmpPlayer != null && tmpPlayer != this.state[item]) || this.state[item] == '' )
                {
                    win = false
                    break
                }
                tmpPlayer = this.state[item]
            }
            if (win) return tmpPlayer
        }

        // if 0 possible move, return tie (draw)
        return (this.getPossibleMove() == 0) ? 'tie' : null
    }

    printBoardPretty ()
    {
        let result = ''
        let size = this.size
        for (var i = 0; i < this.state.length; i++)
        {
            let item = this.state[i]
            if (item == '')
            {
                result += '   '
            } else {
                result += ' ' + item + ' '
            }

            // make vertical border
            if (i % size < 2) result += '|'

            // make horizontal border
            if ((i+1) % size == 0 && i < this.state.length-1) result += '\n-----------\n'
        }
        console.log("%c" + result, 'color: red;background: black;font-weight: bold;')
    }
}