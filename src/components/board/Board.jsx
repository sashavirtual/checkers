import React from 'react'
import './board.css'
import { whiteCell, blackCell } from './imports'
function Board({ setEnd }) {
    let chessBoard = []
    let turn = true; //true - белые, false - черные
    let onMove = false //при первом нажатии на шашку ходящей стороны становится true
    let prevIndex, onCapture
    const boardArr = [[1, 0, 1, 0, 1, 0, 1, 0], [0, 1, 0, 1, 0, 1, 0, 1]]
    let letters = '•ABCDEFGH'
    const [chessCount, setChessCount] = React.useState({
        "White": 0,
        "Black": 0
    })
    let capture = false
    const newGame = () => {
        //очищается доска, заполняются определённые клетки с черными и белыми шашками, действия с предыдущей игры приводятся к дефолтным значениям
        for (let i = 1; i < 9; i++) {
            for (let j = 1; j < 9; j++) {
                document.querySelector(`#${letters[i] + j}`).classList.remove('checkerBlack')
                document.querySelector(`#${letters[i] + j}`).classList.remove('checkerWhite')
                document.querySelector(`#${letters[i] + j}`).classList.remove('blocked')
                document.querySelector(`#${letters[i] + j}`).classList.remove('onMove')
            }
        }
        let filledBlack = ['B8', 'D8', 'F8', 'H8', 'A7', 'C7', 'E7', 'G7', 'B6', 'D6', 'F6', 'H6']
        let filledWhite = ['A1', 'C1', 'E1', 'G1', 'D2', 'B2', 'F2', 'H2', 'A3', 'C3', 'E3', 'G3']

        // filledWhite = ['C3', 'E3', 'E3']
        // filledBlack = ['B4', 'D4', 'F4', 'D2', 'F2']

        filledBlack.forEach(item => {
            document.getElementById(item).classList.add('checkerBlack')
            document.getElementById(item).classList.remove('checkerWhite')
        })
        filledWhite.forEach(item => {
            document.getElementById(item).classList.add('checkerWhite')
            document.getElementById(item).classList.remove('checkerBlack')
        })
        turn = true
        onMove = false
        prevIndex = undefined //первоначальный индекс шашки, которой сделали ход
        onCapture = false //
    }

    const checkCompulsoryCapture = (color, el) => {
        let opposite = color === 'White' ? 'Black' : 'White';
        chessBoard.forEach(row => row.forEach(cell => {
            if (document.querySelector(`#${cell}`) && [...document.querySelector(`#${cell}`).classList].includes(`checker${color}`)) {
                let first, second, third, fourth, possibleCapture, possibleCapture2, possibleCapture3, possibleCapture4
                let action = color === 'White' ? 1 : -1
                first = document.querySelector(`#${letters[letters.indexOf(cell[0]) + 1]}${+cell[1] + action}`);
                second = document.querySelector(`#${letters[letters.indexOf(cell[0]) - 1]}${+cell[1] + action}`);
                third = document.querySelector(`#${letters[letters.indexOf(cell[0]) + 1]}${+cell[1] - action}`);
                fourth = document.querySelector(`#${letters[letters.indexOf(cell[0]) - 1]}${+cell[1] - action}`);
                possibleCapture = document.querySelector(`#${letters[letters.indexOf(cell[0]) + 2]}${+cell[1] + 2 * action}`)
                possibleCapture2 = document.querySelector(`#${letters[letters.indexOf(cell[0]) - 2]}${+cell[1] + 2 * action}`)
                possibleCapture3 = document.querySelector(`#${letters[letters.indexOf(cell[0]) + 2]}${+cell[1] - 2 * action}`)
                possibleCapture4 = document.querySelector(`#${letters[letters.indexOf(cell[0]) - 2]}${+cell[1] - 2 * action}`)
                let simpleMove = [first, second, third, fourth]
                let toCapture = [possibleCapture, possibleCapture2, possibleCapture3, possibleCapture4]
                toCapture.forEach((posCap, index) => {
                    if (simpleMove[index]
                        && posCap
                        && [...simpleMove[index].classList].includes(`checker${opposite}`)
                        && ![...posCap.classList].includes(`checker${opposite}`)
                        && ![...posCap.classList].includes(`checker${color}`)
                    ) {
                        onCapture = true
                        simpleMove[index] = posCap
                    }
                })
                first && ![...first.classList].includes(`checker${color}`) && ![...first.classList].includes(`checker${opposite}`) && onCapture && first.classList.add('blocked')
                second && ![...second.classList].includes(`checker${color}`) && ![...second.classList].includes(`checker${opposite}`) && onCapture && second.classList.add('blocked')


                switch (true) {
                    case first && second && first === possibleCapture && second !== possibleCapture2: first.classList.remove('blocked');
                        break;
                    case first && second && first !== possibleCapture && second === possibleCapture2: second.classList.remove('blocked');
                }
            }
        }
        ))
    }
    const highLighting = (color, id, check = false) => {
        let opposite = color === 'White' ? 'Black' : 'White';
        // подсвечиваются клетки обычных шашек без требования срубить, возвращается массив с подсвеченными Id
        let first, second, third, fourth, possibleCapture, possibleCapture2, possibleCapture3, possibleCapture4, action = color === 'White' ? 1 : -1
        first = document.querySelector(`#${letters[letters.indexOf(id[0]) + 1]}${+id[1] + 1 * action}`);
        second = document.querySelector(`#${letters[letters.indexOf(id[0]) - 1]}${+id[1] + 1 * action}`);
        third = document.querySelector(`#${letters[letters.indexOf(id[0]) + 1]}${+id[1] - action}`);
        fourth = document.querySelector(`#${letters[letters.indexOf(id[0]) - 1]}${+id[1] - action}`);
        //требуется ли срубить шашку
        possibleCapture = document.querySelector(`#${letters[letters.indexOf(id[0]) + 2]}${+id[1] + 2 * action}`)
        possibleCapture2 = document.querySelector(`#${letters[letters.indexOf(id[0]) - 2]}${+id[1] + 2 * action}`)
        possibleCapture3 = document.querySelector(`#${letters[letters.indexOf(id[0]) + 2]}${+id[1] - 2 * action}`)
        possibleCapture4 = document.querySelector(`#${letters[letters.indexOf(id[0]) - 2]}${+id[1] - 2 * action}`)
        let simpleMove = [first, second, third, fourth]

        let toCapture = [possibleCapture, possibleCapture2, possibleCapture3, possibleCapture4]

        toCapture.forEach((posCap, index) => {
            if (simpleMove[index]
                && posCap
                && [...simpleMove[index].classList].includes(`checker${opposite}`)
                && ![...posCap.classList].includes(`checker${opposite}`)
                && ![...posCap.classList].includes(`checker${color}`)
            ) {
                onCapture = true
                simpleMove[index] = posCap
                simpleMove[index].classList.remove('blocked')
            }
        })
        if (!check) {
            first = simpleMove[0]
            second = simpleMove[1]
            third = simpleMove[2]
            fourth = simpleMove[3]
            first && ![...first.classList].includes(`checker${color}`) && ![...first.classList].includes(`checker${opposite}`) && first.classList.add('onMove')
            second && ![...second.classList].includes(`checker${color}`) && ![...second.classList].includes(`checker${opposite}`) && second.classList.add('onMove')
            third && third === document.querySelector(`#${letters[letters.indexOf(id[0]) + 2]}${+id[1] - 2 * action}`) && third.classList.add('onMove')
            fourth && fourth === document.querySelector(`#${letters[letters.indexOf(id[0]) - 2]}${+id[1] - 2 * action}`) && fourth.classList.add('onMove')
            onMove = true
            prevIndex = document.querySelector(`#${id}`)
        }
        return onCapture
    }
    const movePiece = (color, el) => {
        let opposite = color === 'White' ? 'Black' : 'White';
        checkCompulsoryCapture(color, el)
        //если впервые трогаешь свою шашку
        if ([...el.classList].includes(`checker${color}`) && !onMove) {
            highLighting(color, el.id)
        }
        //если трогаешь уже другую свою шашку
        else if ([...el.classList].includes(`checker${color}`) && onMove) {
            chessBoard.forEach(row => row.forEach(cell => document.querySelector(`#${cell}`) && document.querySelector(`#${cell}`).classList.remove('onMove')))
            highLighting(color, el.id)
            // chessBoard.forEach(row => row.forEach(cell => {
            //     if(document.querySelector(`#${cell}`)){
            //         document.querySelector(`#${cell}`).classList.remove('onMove')
            //     }
            //      }))
            console.log('tut', turn)
        }
        //если ходишь на пустую клетку или
        else if (onMove && ![...el.classList].includes(`checker${opposite}`) && ![...el.classList].includes(`checker${color}`) && [...el.classList].includes('onMove')) {
            console.log('i tut', turn)

            if (Math.abs(+prevIndex.id[1] - (+el.id[1])) !== 1) {
                let letter = (letters.indexOf(prevIndex.id[0]) - letters.indexOf(el.id[0])) / 2
                let num = (+prevIndex.id[1] - (+el.id[1])) / 2
                document.querySelector(`#${letters[letters.indexOf(prevIndex.id[0]) - letter]}${+prevIndex.id[1] - num}`).classList.remove(`checker${opposite}`)
                el.classList.remove('blocked')
                setChessCount(prev => {
                    prev[opposite]++;
                    return prev
                })
            }
            if (![...el.classList].includes('blocked')) {
                el.classList.add(`checker${color}`)
                el.classList.remove('onMove')
                prevIndex.classList.remove(`checker${color}`)
                chessBoard.forEach(row => row.forEach(cell => document.querySelector(`#${cell}`).classList.remove('onMove')))
                onCapture = false
                if (Math.abs(+prevIndex.id[1] - (+el.id[1])) !== 1 && highLighting(color, el.id, true)) {
                    onCapture = true
                    onMove = true
                    turn = !turn
                    capture = true
                    // turn = !turn
                    movePiece(color, el)
                }
                chessBoard.forEach(row => row.forEach(cell => {
                    !onCapture && document.querySelector(`#${cell}`).classList.remove('onMove')
                    !onCapture && document.querySelector(`#${cell}`).classList.remove('blocked')
                }
                ))

                turn = !turn
            }
        }
    }
    return (
        <div className='chessboard'>
            {
                [...new Array(4)].map((item, cycle) => boardArr.map((row, pair) => row.map((cell, index) => {
                    chessBoard.push(`${letters[index + 1]}${9 - ((cycle * 2) + 1 + pair)}`)
                    if (chessBoard.length === 64) {
                        for (let i = 0; i < 8; i++) {
                            chessBoard.push(chessBoard.splice(0, 8))
                        }
                    }
                    let temp = `${letters[index + 1]}${9 - ((cycle * 2) + 1 + pair)}`
                    return (cell ?
                        <div className="cell cellWhite" id={temp} key={temp} src={whiteCell} />
                        :
                        <div className="cell cellBlack" id={temp} key={temp} src={blackCell} onClick={(e) => movePiece(turn ? 'White' : 'Black', e.target, capture)} />
                    )
                }))
                )

            }
            <button className="newGame" onClick={newGame}>Start new game</button>

        </div>
    )
}

export default Board