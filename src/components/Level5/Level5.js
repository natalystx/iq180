import React from 'react'
import * as Parser from 'mathjs' //math library
import './Level5.css'
import delIcon from '../../images/icons/delete.png'

class Level5 extends React.Component {

    //set initial values of variables 
    constructor(props) {
        super(props)
        this.state = {
            numbers: {
                'a': 0,
                'b': 0,
                'c': 0,
                'd': 0
            },
            equation: '',
            answer: 0,
            defaultAnswer: 0,
            defaultEquation: null,
            isAnsCorrect: false,
            respondText: 'คำตอบไม่ถูกต้อง',
            showAnsClass: 'ans-card-inactive',
            isCorrectClass: 'incorrect',
            lastButtonIndex: []
        }
    }

    //genarate default answer
    genDefaultAnswer = async () => {

        //add equation into the list 
        let equationList = {
            1: '(√(C)^A)*(D^B)',
            2: '(√(C)^A)/(D^B)',
            3: '(√(C)^A)-(D^B)',
            4: '(√(A^B)/C)+D',
            5: '(√(A^B)+C)-D',
            6: '(√(C)^(A+B))*D',
            7: '(√(C)^(A-B))/D',
            8: '(C^(A+B))/(√(D))',
            9: '(C^(A/B))-(√(D))',
            10: 'C^((√(A))/B)-D',
            11: 'C^((√(A))+B)/D',
            12: 'C^((√(A))-B)*D',
            13: 'C^(A-(√(B)))*D',
            14: 'C^(A/(√(B)))+D',
            15: 'C^(A+(√(B)))-D',
            16: 'C^(√(A-B))*D',
            17: 'C^(√(A/B))+D',
            18: 'C^(√(A*B))-D',
            19: '√((C^(A-B))+D)',
            20: '√((C^(A/B))*D)',
            21: '√((C^(A*B))+D)',
            22: '√(C)/(D^(A-B))',
            23: '√(C)-(D^(A*B))',
            24: '√(C)+(D^(A/B))',
            25: 'C+((√(D))^(A/B))',
            26: 'C/((√(D))^(A-B))',
            27: 'C*((√(D))^(A/B))',
            28: 'C*(D^((√(A))/B))',
            29: 'C+(D^((√(A))-B))',
            30: 'C/(D^((√(A))/B))',
            31: 'C+(D^((√(A))*B))',
            32: 'C*(D^(A/(√(B))))',
            33: 'C*(D^(A-(√(B))))',
            34: 'C+(D^(A-(√(B))))',
            35: 'C*(D^(√(A/B)))',
            36: 'C/(D^(√(A*B)))',
            37: 'C+(D^(√(A-B)))',
            38: '√(C*(D^(A/B)))',
            39: '√(C+(D^(A-B)))',
            40: '√(C/(D^(A/B)))',
            41: '√(D)^((A*B)-C)',
            42: '√(D)^((A*B)/C)',
            43: '√(D)^((A-B)+C)',
            44: 'D^(((√(A))-B)+C)',
            45: 'D^(((√(A))/B)*C)',
            46: 'D^(((√(A))/B)+C)',
            47: 'D^((A-(√(B)))+C)',
            48: 'D^((A*(√(B)))/C)',
            49: 'D^((A-(√(B)))-C)',
            50: 'D^((A+(√(B)))/C)',
            51: '(√(A^B)/C)*D',
            52: '(√(A^B)-C)+D',
            53: '((A^B)-(√(C)))+D',
            54: '((A^B)/(√(C)))*D',
            55: '√(A^B-C)*D',
            56: '√((A^B)/C)*D',
            57: '√((A^B)/C*D)',
            58: '√((A^B)-C*D)',
            59: '(A*(√(B)))/(C+D)',
            60: '(√(A)/B)/(C+D)',
            61: '(√(A/B))+(C+D)',
            62: '√(A,B)+C-D',
            63: 'A/(√(C,B))+D',
            64: '(A/C)-(√(D,B))',
            65: '√(A,B)*(C/D)',
            66: 'A/(√(C,B)*D)',
            67: 'A/(C*√(D,B))',
            68: '√(A/C,B)*D',
            69: 'A/(√(C*D,B))',
            70: '√(A*(C/D),B)',
            71: '√(C,(A*B))/(D)',
            72: 'C*(√(D,(A+B)))',
            73: '√(D,((A/B)+C))',
            74: '√(D,(A-(B/C)))',
            75: '√(C,D^(A+B))',
            76: '√((A+C),B)/D',
            77: '√(A+(C*D),B)',
            78: '√(D,((A/B)+C))',
            79: 'C^(√((A/B),D))',
            80: 'C^(√(A/B,D))'
        }

        //random one equation for list, 25 means the total numbers of list 
        let randomIndex = await Math.floor(Math.random() * 80)


        //recheck for make sure index of equationList is not equa 0 if equa 0 just +1
        let defaultEquation = randomIndex === 0 ? await equationList[randomIndex + 1] : await equationList[randomIndex]

        console.log('index: ' + randomIndex)

        //split equation and replace all a,b,c,d with numbers as same index name
        defaultEquation = await defaultEquation.split('A').join(this.state.numbers['a'])
        defaultEquation = await defaultEquation.split('B').join(this.state.numbers['b'])
        defaultEquation = await defaultEquation.split('C').join(this.state.numbers['c'])
        defaultEquation = await defaultEquation.split('D').join(this.state.numbers['d'])



        const tempDefaultEquation = defaultEquation.replace('√', 'nthRoot')
        // check root condition and wait for result 
        if (await this.checkRootValue(tempDefaultEquation)) {
            // Parse string to mathmatic equation for computable 
            let defaultAns = Parser.evaluate(tempDefaultEquation)

            //check default answer is 2 digits
            if (defaultAns < 10 || defaultAns > 99 || !Number.isInteger(defaultAns)) {
                await this.doRandomNumbers()
            } else {

                if (this.checkDivideResult(tempDefaultEquation)) {
                    await this.setState({
                        defaultAnswer: defaultAns,
                        defaultEquation: defaultEquation
                    })
                    console.log('equation: ' + this.state.defaultEquation)
                    console.log('answer: ' + this.state.defaultAnswer)
                } else {
                    await this.setState({
                        defaultAnswer: defaultAns,
                        defaultEquation: defaultEquation
                    })

                }



            }
        } else { // if root value it doesn't get on conditional rerandom numbers and equation 
            await this.doRandomNumbers() //random number then sync to equation's random function
        }


    }

    //check inside root value
    checkRootValue = (defaultEquation) => {

        const startIndex = defaultEquation.indexOf('nthRoot') //find start index of root 
        let rootPart = '' // set default value of rootPart 
        let insideRootCal = '' // set default value of insideRootCal 
        let openParathensesCounter = 0 // set default value of openParathensesCounter 
        let closeParathensesCounter = 0 // set default value of closeParathensesCounter 

        //loop to get a part of root in equation
        for (let index = startIndex; index < defaultEquation.length; index++) {

            if (defaultEquation[index] === '(') { // count open parathenses 
                rootPart += defaultEquation[index] // store value in index into rootPart
                openParathensesCounter++ // store openParathensesCounter
            } else if (defaultEquation[index] === ')') { // close open parathenses 
                rootPart += defaultEquation[index] // store value in index into rootPart
                closeParathensesCounter++ // close openParathensesCounter

                //check closeParathensesCounter and openParathensesCounter are both eqaul and aren't empty
                if (openParathensesCounter === closeParathensesCounter && openParathensesCounter !== 0 && closeParathensesCounter !== 0) {
                    insideRootCal = rootPart.replace('nthRoot', '') //get value inside parathenses of root 
                    break //break the loop 
                }
            } else {
                rootPart += defaultEquation[index] // store rootPart
            }

        }

        const insideRootValue = insideRootCal.includes(',') ? Parser.evaluate(this.getNRootForm(insideRootCal)) : Parser.evaluate(insideRootCal) //get the calculation of value inside parathenses of root 

        if (insideRootValue > 0 && Number.isInteger(insideRootValue)) { // check insideRootValue is >= 0
            return Number.isInteger(Parser.evaluate(rootPart)) // return the calculation of rootPart is integer or not
        } else {
            return false // incase insideRootValue < 0 get false
        }
    }


    //gen nthRoot form
    getNRootForm = (params) => {
        let newParams = params // define variable
        let baseRootPart = '' // set default value of baseRootPart 
        let openParathensesCounter = 0 // set default value of openParathensesCounter 
        let closeParathensesCounter = 0 // set default value of closeParathensesCounter 
        console.log('nthRoot' + newParams)

        const baseRootPartStartIndex = newParams.indexOf(',') + 1 //find start index of comma

        for (let index = baseRootPartStartIndex; index < newParams.length; index++) {

            if (newParams[index] === '(') { // count open parathenses 
                baseRootPart += newParams[index] // store value in index into baseRootPart
                openParathensesCounter++ // store openParathensesCounter
            } else if (newParams[index] === ')') { // close open parathenses 
                baseRootPart += newParams[index] // store value in index into baseRootPart
                closeParathensesCounter++ // close openParathensesCounter

                //check closeParathensesCounter and openParathensesCounter are both eqaul and aren't empty
                if (openParathensesCounter === closeParathensesCounter && openParathensesCounter !== 0 && closeParathensesCounter !== 0) {
                    break //break the loop 
                } else {
                    baseRootPart = baseRootPart.replace('(', '')
                    baseRootPart = baseRootPart.replace(')', '')
                }
            } else {
                baseRootPart += newParams[index] // store baseRootPart
            }

        }

        console.log('baseRootPart: ' + baseRootPart)
        if (Parser.evaluate(baseRootPart) >= 2) {
            return 'nthRoot' + newParams // return new form of equation
        } else {
            return 0
        }
    }

    checkDivideResult = async (defaultEquation) => {
        //check equation is contain "/"
        if (defaultEquation.search('/') > -1) {  // incase of equation is contain
            const marksPos = this.scanDivideMarkPos(defaultEquation)
            return this.splitEquation(marksPos, defaultEquation) ? true : this.doRandomNumbers()
        } else { // incase of equation isn't contain /
            return false
        }
    }

    //get Position of divide marks
    scanDivideMarkPos = (equation) => {
        let marksPos = []
        for (let index = 0; index < equation.length; index++) {
            if (equation[index] === '/') {
                marksPos.push(index)
            }
        }
        return marksPos
    }

    //split equation and check result of value 
    splitEquation = (marksPos, equation) => {

        let isAllResultInt = []
        marksPos.forEach(pos => {
            let left = equation[pos - 1]
            let right = equation[pos + 1]

            //left and right are numbers
            if (!isNaN(left) && !isNaN(right)) {
                let result = parseInt(left) / parseInt(right)
                isAllResultInt.push(Number.isInteger(result))
            }
            //left and right are parentheses
            else if (left === ')' && right === '(') {
                let leftPart = ''
                let rightPart = ''

                //get left part
                for (let index = pos - 1; index >= 0; index--) {
                    if (equation[index] === '(') {
                        leftPart += equation[index]

                        let openParathensesCounter = 0
                        let closeParathensesCounter = 0

                        //check parathenses
                        for (let index = 0; index < leftPart.length; index++) {


                            if (leftPart[index] === '(') {
                                openParathensesCounter++
                            }
                            if (leftPart[index] === ')') {
                                closeParathensesCounter++
                            }


                        }

                        if (openParathensesCounter === closeParathensesCounter) {
                            break
                        }
                    } else {
                        leftPart += equation[index]
                    }

                }

                //get right part
                for (let index = pos + 1; index < equation.length; index++) {
                    if (equation[index] === ')') {
                        rightPart += equation[index]

                        let openParathensesCounter = 0
                        let closeParathensesCounter = 0

                        //check parathenses
                        for (let index = 0; index < rightPart.length; index++) {


                            if (rightPart[index] === '(') {
                                openParathensesCounter++
                            }
                            if (rightPart[index] === ')') {
                                closeParathensesCounter++
                            }


                        }

                        if (openParathensesCounter === closeParathensesCounter) {
                            break
                        }

                    } else {
                        rightPart += equation[index]
                    }

                }

                let equationPart = leftPart.split("").reverse().join("") + '/' + rightPart
                isAllResultInt.push(Number.isInteger(Parser.evaluate(equationPart)))


            }
            //left or right is parentheses
            else if (left === ')' || right === '(') {

                if (left === ')') {
                    let leftPart = ''
                    //get left part
                    for (let index = pos - 1; index >= 0; index--) {
                        if (equation[index] === '(') {
                            leftPart += equation[index]
                            let openParathensesCounter = 0
                            let closeParathensesCounter = 0

                            //check parathenses
                            for (let index = 0; index < leftPart.length; index++) {


                                if (leftPart[index] === '(') {
                                    openParathensesCounter++
                                }
                                if (leftPart[index] === ')') {
                                    closeParathensesCounter++
                                }


                            }

                            if (openParathensesCounter === closeParathensesCounter) {
                                break
                            }

                        } else {
                            leftPart += equation[index]
                        }

                    }

                    let equationPart = leftPart.split("").reverse().join("") + '/' + equation[pos + 1]
                    isAllResultInt.push(Number.isInteger(Parser.evaluate(equationPart)))

                }

                if (right === '(') {
                    let rightPart = ''
                    //get right part
                    for (let index = pos + 1; index < equation.length; index++) {
                        if (equation[index] === ')') {
                            rightPart += equation[index]

                            let openParathensesCounter = 0
                            let closeParathensesCounter = 0

                            //check parathenses
                            for (let index = 0; index < rightPart.length; index++) {


                                if (rightPart[index] === '(') {
                                    openParathensesCounter++
                                }
                                if (rightPart[index] === ')') {
                                    closeParathensesCounter++
                                }


                            }

                            if (openParathensesCounter === closeParathensesCounter) {
                                break
                            }
                        } else {
                            rightPart += equation[index]
                        }

                    }

                    let equationPart = equation[pos - 1] + '/' + rightPart
                    isAllResultInt.push(Number.isInteger(Parser.evaluate(equationPart)))
                }

            }
        })

        //check all is Integer
        let finalResult = false
        for (let index = 0; index < isAllResultInt.length; index++) {

            finalResult = index > 0 ? isAllResultInt[index] && finalResult : isAllResultInt[index]

        }

        //return result
        return finalResult

    }

    //delete input answer
    delAnswer = async () => {

        const operatorList = ['-', '+', '*', '/', '(', ')', '^', ',']

        let temp = this.state.equation


        // check values
        if (operatorList.includes(this.state.equation[this.state.equation.length - 1]) || this.state.equation.length === 0) {
            //delete answer
            temp = await temp.slice(0, -1)
            //setState new answer
            await this.setState({ equation: temp })
        }
        else {
            //delete answer
            temp = await temp.slice(0, -1)
            //remove disable button
            let elem = document.querySelector('button[index = "' + this.state.lastButtonIndex[this.state.lastButtonIndex.length - 1] + '"]')
            let tempIndex = this.state.lastButtonIndex
            tempIndex = await tempIndex.slice(0, -1)
            elem.removeAttribute("disabled")

            //setState new answer and buttonIndex
            await this.setState({ equation: temp, lastButtonIndex: tempIndex })
        }

    }

    //get user input answer
    insertAnswer = (event) => {
        let temp = this.state.equation
        temp = temp + event.target.value
        let elem = event.target
        if (elem.hasAttribute("index")) {
            let indexTemp = [...this.state.lastButtonIndex]
            indexTemp.push(elem.getAttribute("index"))
            this.setState({ equation: temp, lastButtonIndex: indexTemp })
            elem.setAttribute("disabled", true)
        } else {
            this.setState({ equation: temp })
        }

    }

    //checkparatheses
    checkParatheses = (equation) => {

        let openParathensesCounter = 0
        let closeParathensesCounter = 0

        //check parathenses
        for (let index = 0; index < equation.length; index++) {


            if (equation[index] === '(') {
                openParathensesCounter++
            }
            if (equation[index] === ')') {
                closeParathensesCounter++
            }


        }

        if (openParathensesCounter === closeParathensesCounter) {
            return true
        } else {
            return false
        }

    }

    //calculate user's equation result and checks with default answer
    calAns = async () => {
        const operatorList = ['-', '+', '*', '/']
        let tempAns
        let equationTemp = this.state.equation.replace('√', 'nthRoot')
        console.log('temp: ' + equationTemp)

        if (this.checkParatheses(this.state.equation)) {
            if (await this.checkRootValue(equationTemp)) {
                tempAns = operatorList.includes(equationTemp.slice(-1)) ? false : await Parser.evaluate(equationTemp)
                console.log(tempAns)
                if (this.state.equation.length >= 6) {
                    if (tempAns === this.state.defaultAnswer) {
                        this.setState({
                            isAnsCorrect: true,
                            showAnsClass: 'ans-card',
                            respondText: 'คำตอบถูกต้อง',
                            isCorrectClass: 'correct',
                            answer: tempAns
                        })
                    } else {
                        this.setState({
                            isAnsCorrect: false,
                            showAnsClass: 'ans-card',
                            respondText: 'คำตอบไม่ถูกต้อง',
                            isCorrectClass: 'incorrect',
                            answer: tempAns
                        })
                    }
                } else if (this.state.equation.length === 0) {
                    this.setState({
                        isAnsCorrect: false,
                        showAnsClass: 'ans-card',
                        isCorrectClass: 'incorrect',
                        respondText: 'โปรดกรอกสมการ'
                    })
                }
                else {
                    this.setState({
                        isAnsCorrect: false,
                        showAnsClass: 'ans-card',
                        isCorrectClass: 'incorrect',
                        respondText: 'โปรดใช้ตัวเลขให้ครบทุกตัว'
                    })
                }
            } else if (this.state.equation.length >= 6) {
                this.setState({
                    isAnsCorrect: false,
                    showAnsClass: 'ans-card',
                    respondText: 'ค่าในเครื่องหมายรูทไม่สามารถติดลบได้และเป็นจำนวนเต็มเท่านั้น',
                    isCorrectClass: 'incorrect',
                    answer: 0
                })
            } else {
                this.setState({
                    isAnsCorrect: false,
                    showAnsClass: 'ans-card',
                    respondText: 'โปรดใช้ตัวเลขให้ครบทุกตัว',
                    isCorrectClass: 'incorrect',
                    answer: 0
                })
            }

        } else {
            this.setState({
                isAnsCorrect: false,
                showAnsClass: 'ans-card',
                respondText: 'โปรดใส่วงเล็บให้ครบถ้วน',
                isCorrectClass: 'incorrect',
                answer: 0
            })
        }

    }

    //random 4 numbers
    doRandomNumbers = () => {
        let temp = this.state.numbers
        let dummy = Math.floor(Math.random() * 10)
        temp['a'] = dummy
        dummy = Math.floor(Math.random() * 10)
        temp['b'] = dummy !== 0 ? dummy : Math.floor(Math.random() * 9)
        dummy = Math.floor(Math.random() * 10)
        temp['c'] = (dummy !== temp['a'] && dummy !== temp['b'] && dummy !== 0) ? dummy : Math.floor(Math.random() * 9)
        dummy = Math.floor(Math.random() * 10)
        temp['d'] = (dummy !== temp['a'] && dummy !== temp['b'] && dummy !== temp['c'] && dummy !== 0) ? dummy : Math.floor(Math.random() * 9)
        this.setState({ numbers: temp })

        //generate default ans
        this.setState({
            equation: '',
            respondText: 'คำตอบไม่ถูกต้อง',
            showAnsClass: 'ans-card-inactive',
            isCorrectClass: 'incorrect',
            lastButtonIndex: []
        })

        let elem = document.querySelectorAll('button[index]')
        elem.forEach(item => {
            item.removeAttribute("disabled")
        })

        this.genDefaultAnswer()

    }

    componentDidMount() {
        // do random number when page is loaded or reloaded
        this.doRandomNumbers()
    }

    // show example of equation to get same result as default answer
    showExample = () => {
        if (this.state.equation === '') {
            this.setState({
                showAnsClass: 'ans-card',
                respondText: 'โปรดกรอกสมการ'
            })
        } else if (this.state.equation.length >= 6) {
            this.setState({
                showAnsClass: 'ans-card',
                respondText: this.state.defaultEquation
            })
        }
        else {
            this.setState({
                showAnsClass: 'ans-card',
                respondText: 'โปรดใช้ตัวเลขให้ครบทุกตัว'
            })
        }
    }

    clearAns = () => {
        this.setState({
            equation: '',
            lastButtonIndex: [],
            showAnsClass: 'ans-card-inactive',
        })
        let elem = document.querySelectorAll('button[index]')
        elem.forEach(item => {
            item.removeAttribute("disabled")
        })
    }

    render() {
        return (
            <div className="level-1">
                <div className="re-random-section">
                    <button className="re-random-btn" onClick={this.doRandomNumbers}>
                        สุ่มใหม่
                </button>
                </div>
                <div className="game-content">
                    <div className="info-text">
                        <p className="ur-equation-text">
                            สมการของคุณ
                        </p>
                        <p className="ans-text">
                            ผลลัพท์ {this.state.defaultAnswer}
                        </p>
                    </div>
                    <div className="input-section">
                        <input type="text" className="equationInput" readOnly={true} value={this.state.equation} />
                        <button className="del-btn" onClick={this.delAnswer}><img src={delIcon} alt="del-icon" className="del-icon" /></button>
                    </div>
                    <div className="calculator-section">

                        {/* numbers */}
                        <button className="number-btn" value={this.state.numbers['a']} onClick={this.insertAnswer} index="1">{this.state.numbers['a']}</button>
                        <button className="number-btn" value={this.state.numbers['b']} onClick={this.insertAnswer} index="2">{this.state.numbers['b']}</button>
                        <button className="number-btn" value={this.state.numbers['c']} onClick={this.insertAnswer} index="3">{this.state.numbers['c']}</button>
                        <button className="number-btn" value={this.state.numbers['d']} onClick={this.insertAnswer} index="4">{this.state.numbers['d']}</button>

                        {/* Operators */}
                        <button className="operator-btn" value={'+'} onClick={this.insertAnswer}>+</button>
                        <button className="operator-btn" value={'-'} onClick={this.insertAnswer}>-</button>
                        <button className="operator-btn" value={'*'} onClick={this.insertAnswer}>*</button>
                        <button className="operator-btn" value={'/'} onClick={this.insertAnswer}>/</button>
                        <button className="operator-btn" value={'^'} onClick={this.insertAnswer}>^</button>
                        <button className="operator-btn" value={','} onClick={this.insertAnswer}>,</button>
                        <button className="operator-btn" value={'√'} onClick={this.insertAnswer} index="5">√</button>
                        <button className="operator-btn" value={'('} onClick={this.insertAnswer}>(</button>
                        <button className="operator-btn" value={')'} onClick={this.insertAnswer}>)</button>


                        {/* Clear */}
                        <button className="clear-btn" onClick={this.clearAns}>เคลียร์</button>

                        {/* Submit */}
                        <button className="submit-btn" onClick={this.calAns}>ส่งคำตอบ</button>

                        {/* Show Answer */}
                        <button className="show-ans-btn" onClick={this.showExample}>เฉลย</button>

                        <div className={this.state.showAnsClass + ' ' + this.state.isCorrectClass}>
                            <p className="res-text">{this.state.respondText}</p>
                        </div>
                    </div>
                </div>
            </div >
        )

    }
}

export default Level5