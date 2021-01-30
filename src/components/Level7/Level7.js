import React from 'react'
import * as Parser from 'mathjs' //math library
import './Level7.css'
import delIcon from '../../images/icons/delete.png'
import Services from '../../services/Services' //calculation services

class Level7 extends React.Component {

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
            lastButtonIndex: [],
            isShowRootDetails: false,
            isNotShowRootAgain: false,
            isCheck: false
        }
    }

    //genarate default answer
    genDefaultAnswer = async () => {

        //add equation into the list
        let equationList = {
            1: '(((a!)/b)+c)-d',
            2: '((a+(b!))/c)/d',
            3: '((a-b)/(c!))/d',
            4: '((a-b)-c)/(d!)',
            5: '(((a!)-(b!))/c)+d',
            6: '(((a!)/b)-(c!))+d',
            7: '(((a!)/b)-c)-(d!)',
            8: '((a*(b!))/(c!))*d',
            9: '((a+(b!))+c)*(d!)',
            10: '(((a!)+(b!))/(c!))+d',
            11: '(((a!)-(b!))/c)+(d!)',
            12: '((a*(b!))/(c!))-(d!)',
            13: '(((a!)*(b!))/(c!))-(d!)',
            14: '(((a*b)!)+c)-d',
            15: '(((a*b)!)/(c!))-d',
            16: '(((a*b)!)+c)-(d!)',
            17: '(((a*b)!)/(c!))-(d!)',
            18: '(((a*b)+c)!)/d',
            19: '(((a*b)+c)!)-(d!)',
            20: '(((a*b)+c)/d)!',
            21: '((a!)-(b*c))+d',
            22: '(a+((b!)/c))/d',
            23: '(a+(b+(c!)))/d',
            24: '(a+(b-c))+(d!)',
            25: '((a!)-((b!)/c))*d',
            26: '((a!)-(b+(c!)))/d',
            27: '((a!)/(b+c))-(d!)',
            28: '(a+((b!)-(c!)))*d',
            29: '(a*((b!)+c))-(d!)',
            30: 'a*(b+(c!))-(d!)',
            31: '((a!)+((b!)-(c!)))/d',
            32: '(a!)+((b!)-c)-(d!)',
            33: '(a!)+(b+(c!))-(d!)',
            34: '(a*((b!)+(c!)))/(d!)',
            35: '((a!)*((b!)+(c!)))/(d!)',
            36: '(a+((b*c)!))/d',
            37: '((a!)+((b*c)!))/d',
            38: '(a+((b*c)!))-(d!)',
            39: '((a!)-((b*c)!))/(d!)',
            40: '((a*(b+c))!)/d',
            41: '((a*(b+c))!)-(d!)',
            42: '((a*(b+c))/d)!',
            43: '(a!)+((b*c)/d)',
            44: 'a+(((b!)-c)/d)',
            45: 'a+((b+(c!))/d)',
            46: 'a*((b+c)+(d!))',
            47: '(a!)-(((b!)/c)*d)',
            48: '(a!)-((b*(c!))/d)',
            49: '(a!)/((b+c)*(d!))',
            50: 'a*(((b!)-(c!))/d)',
            51: 'a*(((b!)*c)/(d!))',
            52: 'a*((b+(c!))-(d!))',
            53: '(a!)-(((b!)/(c!))*d)',
            54: '(a!)+(((b!)*c)-(d!))',
            55: '(a!)/((b+(c!))*(d!))',
            56: 'a*(((b!)+(c!))-(d!))',
            57: '(a!)*(((b!)+(c!))-(d!))',
            58: 'a*(((b+c)!)/d)',
            59: '(a!)+(((b+c)!)/d)',
            60: 'a*(((b+c)!)-(d!))',
            61: '(a!)*(((b+c)!)-(d!))',
            62: 'a+((b-c)+d)!',
            63: '(a!)-((b-c)+d)!',
            64: '(a*((b+c)+d))!',
            65: '(a!)-(b*(c+d))',
            66: 'a*((b!)-(c*d))',
            67: 'a+(b+((c!)/d))',
            68: 'a+(b*(c+(d!)))',
            69: '(a!)-((b!)*(c+d))',
            70: '(a!)/(b*((c!)/d))',
            71: '(a!)-(b+(c*(d!)))',
            72: 'a*((b!)-((c!)+d))',
            73: 'a*((b!)-(c+(d!)))',
            74: 'a+(b*((c!)-(d!)))',
            75: '(a!)+((b!)/((c!)/d))',
            76: '(a!)*((b!)-(c+(d!)))',
            77: 'a*((b!)-((c!)/(d!)))',
            78: '(a!)*((b!)/((c!)+(d!)))',
            79: 'a*(b+((c*d)!))',
            80: 'a+((b!)+((c*d)!))'
        }

        const service = new Services()

        //random one equation for list, 25 means the total numbers of list 
        let randomIndex = await Math.floor(Math.random() * 80)

        //recheck for make sure index of equationList is not equa 0 if equa 0 just +1
        let defaultEquation = randomIndex === 0 ? equationList[randomIndex + 1] : equationList[randomIndex]

        //convert equation form to mathmatic equation
        defaultEquation = await service.generateEquation(defaultEquation, this.state.numbers)

        const equationValidResult = await service.equationValidate(defaultEquation)
        const equation = equationValidResult.equation
        //check default answer is 2 digits
        if (equationValidResult.answer < 10 || equationValidResult.answer > 99
            || equationValidResult.answer === 'invalid'
            || !Number.isInteger(equationValidResult.answer)) {
            this.doRandomNumbers()
        } else {

            this.setState({
                defaultAnswer: equationValidResult.answer,
                defaultEquation: equation
            })
        }

        console.log(this.state.defaultAnswer)
        console.log(this.state.defaultEquation)


    }


    //delete input answer
    delAnswer = async () => {

        const operatorList = ['-', '+', '*', '/', '(', ')', '^', ',', '!']

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
        } else if (elem.hasAttribute("notnumber") && elem.getAttribute("value") !== '√') {
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

        } else {
            if (elem.hasAttribute("index")) {
                this.setState({ equation: temp })
            } else {
                this.setState({ equation: temp })
            }
            this.openRootModal()
        }



    }

    //open root modal when check on root
    openRootModal = () => {
        const rootModal = document.querySelector('.alert-root')
        if (!this.state.isCheck) {
            if (!this.state.isShowRootDetails && !this.state.isNotShowRootAgain) {
                rootModal.style.display = 'flex'
                this.setState({ isShowRootDetails: true, isNotShowRootAgain: false })
            } else {
                rootModal.style.display = 'none'
                this.setState({ isShowRootDetails: false, isNotShowRootAgain: false })
            }
        } else {
            rootModal.style.display = 'none'
            this.setState({ isShowRootDetails: false, isNotShowRootAgain: true })

        }
    }

    checkShowAgain = (event) => {
        const checkbox = event.target
        if (!this.state.isCheck) {
            checkbox.setAttribute('checked', true)
            console.log(checkbox.getAttribute('checked'))

            this.setState({ isCheck: checkbox.getAttribute('checked') })
        } else {
            checkbox.setAttribute('checked', false)
            console.log(checkbox.getAttribute('checked'))

            this.setState({ isCheck: checkbox.getAttribute('checked') })
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
        const services = new Services()
        const calculatedResult = await services.calInsertedEquation(this.state.equation,
            this.state.defaultAnswer,
            this.state.lastButtonIndex.length,
            4)
        console.log(calculatedResult)

        this.setState(
            {
                isAnsCorrect: calculatedResult.isAnsCorrect,
                isCorrectClass: calculatedResult.isCorrectClass,
                respondText: calculatedResult.respondText,
                showAnsClass: calculatedResult.showAnsClass
            })

    }

    //random 4 numbers
    doRandomNumbers = async () => {
        const services = new Services()
        const temp = await services.randomNumbers(this.state.numbers)
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
                <div className="alert-root">
                    <span className="close" onClick={this.openRootModal}>x</span>
                    <div className="root-suggest-content">
                        <h4 className="root-suggest-texts">
                            รูปแบบการใช้การใช้รูท
                        </h4>
                        <p className="root-details">
                            √(ค่าที่ต้องการคำนวณ,ค่ารากที่ n)
                            <br />
                            หากไม่กำหนดรากที่ n จะเท่ากับรากที่ 2
                        </p>

                        <h4 className="root-suggest-texts">
                            ตัวอย่าง
                        </h4>
                        <p className="root-details">
                            √(16) ค่าที่จะได้เท่ากับ 4
                            <br />
                            √(8*2) ค่าที่จะได้เท่ากับ 4
                            <br />
                            √(27,3) ค่าที่จะได้เท่ากับ 3
                            <br />
                            √(5+3,2+1) ค่าที่จะได้เท่ากับ 2
                        </p>
                        <input type="checkbox" className="not-open-root" onClick={this.checkShowAgain} />
                        <label htmlFor="not-open-root" className="not-open-root-label">ฉันเข้าใจแล้วไม่ต้องแสดงอีก</label>
                    </div>


                </div>
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
                        <button className="operator-btn" value={'^'} onClick={this.insertAnswer} notnumber="true">^</button>
                        <button className="operator-btn" value={'!'} onClick={this.insertAnswer} notnumber="true">!</button>
                        <button className="operator-btn" value={','} onClick={this.insertAnswer} notnumber="true">,</button>
                        <button className="operator-btn" value={'√'} onClick={this.insertAnswer} notnumber="true">√</button>
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

export default Level7
