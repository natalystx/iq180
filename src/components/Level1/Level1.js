import React from 'react'
import * as Parser from 'mathjs' //math library
import './Level1.css'
import delIcon from '../../images/icons/delete.png'

class Level1 extends React.Component {

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
            1: '((a+b)+c)+d',
            2: '((a-b)-c)+d',
            3: '((a*b)*c)-d',
            4: '((a/b)/c)*d',
            5: '((a*b)+c)*d',
            6: 'a+(b+(c+d))',
            7: 'a-(b-(c+d))',
            8: 'a*(b*(c-d))',
            9: 'a/(b/(c*d))',
            10: 'a-(b/(c+d))',
            11: 'a-(b/(c/d))',
            12: '(a-b)-(c+d)',
            13: '(a*b)*(c-d)',
            14: '(a/b)/(c*d)',
            15: '(a*b)/(c+d)',
            16: '(a-(b*c))/d',
            17: '(a-(b-c))+d',
            18: '(a*(b*c))-d',
            19: '(a/(b/c))*d',
            20: '(a-(b/c))*d',
            21: '(a-b)/(c/d)',
            22: 'a-((b-c)+d)',
            23: 'a*((b*c)-d)',
            24: 'a/((b/c)*d)',
            25: 'a-((b/c)*d)'
        }

        //random one equation for list, 25 means the total numbers of list 
        let randomIndex = await Math.floor(Math.random() * 25)

        //recheck for make sure index of equationList is not equa 0 if equa 0 just +1
        let defaultEquation = randomIndex === 0 ? equationList[randomIndex + 1] : equationList[randomIndex]

        //split equation and replace all a,b,c,d with numbers as same index name
        defaultEquation = await defaultEquation.split('a').join(this.state.numbers['a'])
        defaultEquation = await defaultEquation.split('b').join(this.state.numbers['b'])
        defaultEquation = await defaultEquation.split('c').join(this.state.numbers['c'])
        defaultEquation = await defaultEquation.split('d').join(this.state.numbers['d'])

        // Parse string to mathmatic equation for computable 
        let defaultAns = Parser.evaluate(defaultEquation)

        //check default answer is 2 digits
        if (defaultAns < 10 || defaultAns > 99 || !Number.isInteger(defaultAns)) {
            await this.doRandomNumbers()
        } else {

            if (this.checkDivideResult(defaultEquation)) {
                await this.setState({
                    defaultAnswer: defaultAns,
                    defaultEquation: defaultEquation
                })
                console.log(this.state.defaultAnswer)
                console.log(this.state.defaultEquation)
            } else {
                await this.setState({
                    defaultAnswer: defaultAns,
                    defaultEquation: defaultEquation
                })

            }



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

        const operatorList = ['-', '+', '*', '/', '(', ')']
        let temp = this.state.equation

        // check values
        if (operatorList.includes(this.state.equation[this.state.equation.length - 1]) || this.state.equation.length === 0) {
            //delete answer
            temp = await temp.slice(0, -1)
            //setState new answer
            await this.setState({ equation: temp })
        } else {
            //delete answer
            temp = await temp.slice(0, -1)
            //remove disable button
            let elem = document.querySelector('button[index = "' + this.state.lastButtonIndex[this.state.lastButtonIndex.length - 1] + '"]')
            let tempIndex = this.state.lastButtonIndex
            tempIndex = await tempIndex.slice(0, -1)
            elem.removeAttribute("disabled")

            //setState new answer and buttonIndex
            await this.setState({ equation: temp, lastButtonIndex: tempIndex })

            const allNumber = document.querySelectorAll('button[index]')

            await allNumber.forEach(elem => {
                const index = elem.getAttribute('index')
                if (this.state.lastButtonIndex.includes(index)) {
                    elem.setAttribute("disabled", true)
                } else {
                    elem.removeAttribute("disabled")
                }
            })
        }

    }

    //get user input answer
    insertAnswer = async (event) => {
        let temp = this.state.equation
        temp = temp + event.target.value
        let elem = event.target
        let allNumber = document.querySelectorAll("button[isnumber]")
        let allIndex = document.querySelectorAll("button[index]")
        if (elem.hasAttribute("isnumber")) {
            await allNumber.forEach(elem => {
                elem.setAttribute("disabled", true)
            })
            if (elem.hasAttribute("index")) {
                let indexTemp = [...this.state.lastButtonIndex]
                indexTemp.push(elem.getAttribute("index"))
                this.setState({ equation: temp, lastButtonIndex: indexTemp })
                elem.setAttribute("disabled", true)
            } else {
                this.setState({ equation: temp })
            }
        } else if (elem.hasAttribute("notnumber")) {
            await allNumber.forEach(elem => {
                elem.removeAttribute("disabled")
            })

            await allIndex.forEach(elem => {
                let index = elem.getAttribute("index")
                if (this.state.lastButtonIndex.includes(index)) {
                    elem.setAttribute("disabled", true)
                }
            })

            this.setState({ equation: temp })

        }

    }

    //checkparatheses
    checkParatheses = (eqaution) => {

        let openParathensesCounter = 0
        let closeParathensesCounter = 0

        //check parathenses
        for (let index = 0; index < eqaution.length; index++) {


            if (eqaution[index] === '(') {
                openParathensesCounter++
            }
            if (eqaution[index] === ')') {
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

        // check Paratheses 
        if (this.checkParatheses(this.state.equation)) {


            tempAns = operatorList.includes(this.state.equation.slice(-1)) ? false : await Parser.evaluate(this.state.equation)
            console.log(tempAns)
            if (this.state.equation.length >= 6 && this.state.lastButtonIndex.length >= 4) {
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
        }

        else {
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
                        <button className="number-btn" value={this.state.numbers['a']} onClick={this.insertAnswer} index="1" isnumber="true">{this.state.numbers['a']}</button>
                        <button className="number-btn" value={this.state.numbers['b']} onClick={this.insertAnswer} index="2" isnumber="true">{this.state.numbers['b']}</button>
                        <button className="number-btn" value={this.state.numbers['c']} onClick={this.insertAnswer} index="3" isnumber="true">{this.state.numbers['c']}</button>
                        <button className="number-btn" value={this.state.numbers['d']} onClick={this.insertAnswer} index="4" isnumber="true">{this.state.numbers['d']}</button>

                        {/* Operators */}
                        <button className="operator-btn" value={'+'} onClick={this.insertAnswer} notnumber="true">+</button>
                        <button className="operator-btn" value={'-'} onClick={this.insertAnswer} notnumber="true">-</button>
                        <button className="operator-btn" value={'*'} onClick={this.insertAnswer} notnumber="true">*</button>
                        <button className="operator-btn" value={'/'} onClick={this.insertAnswer} notnumber="true">/</button>
                        <button className="operator-btn" value={'('} onClick={this.insertAnswer} notnumber="true">(</button>
                        <button className="operator-btn" value={')'} onClick={this.insertAnswer} notnumber="true">)</button>

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

export default Level1