import React from 'react'
import * as Parser from 'mathjs' //math library
import './Level4.css'
import delIcon from '../../images/icons/delete.png'
import Services from '../../services/Services' //calculation services


class Level4 extends React.Component {

    //set initial values of variables 
    constructor(props) {
        super(props)
        this.state = {
            numbers: {
                'a': 0,
                'b': 0,
                'c': 0,
                'd': 0,
                'e': 0
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
            1: 'E^(((A*	B)*	C)*D)',
            2: 'E^((A+(B+C))+D)',
            3: 'E^(A+((B-C)-D))',
            4: 'E^(A+(B-(C/D)))',
            5: 'E^((A+B)*(C-D))',
            6: 'E^((A-B)/(C*D))',
            7: 'E^((A-B)-(C+D))',
            8: 'E^(((A^B)+C)+D)',
            9: 'E^((A-(C^B))/D)',
            10: 'E^((A-C)/(D^B))',
            11: 'E^((A^B)+(C/D))',
            12: 'E^((C^(A+B))/D)',
            13: 'E^((C^(A/B))/D)',
            14: 'E^((C+D)^(A+B))',
            15: 'E^((C/D)^(A+B))',
            16: 'E^((C*D)^(A/B))',
            17: 'E^(D^(A+(B*C)))',
            18: 'E^(D^(A-(B+C)))',
            19: 'E^(D^(A/(B*C)))',
            20: 'E^(A^B^C)*D',
            21: 'E^(A^B^C)+D',
            22: 'E^(A^B^C)-D',
            23: 'E^(A^B^C)/D',
            24: 'E^A^B^C^D',
            25: 'E^(A-D)^B^C',
            26: '(A^(B+C)+D)/E',
            27: '(A^(B-C)+D)*E',
            28: '(A^(B+C)*D)-E',
            29: '(A+D^(B/C))+E',
            30: '(A-D^(B/C))/E',
            31: '(A/D^(B*C))*E',
            32: '(A+D)+E^(B-C)',
            33: '(A/D)+E^(B*C)',
            34: '(A*D)-E^(B/C)',
            35: '(A-D)+E^(B*C)',
            36: 'A^(B+C)-(D+E)',
            37: 'A^(B/C)+(D+E)',
            38: 'A^(B*C)*(D/E)',
            39: 'A^(B-C)/(D+E)',
            40: 'A+(D^(B-C)+E)',
            41: 'A/(D^(B+C)+E)',
            42: 'A*(D^(B/C)/E)',
            43: 'A^(B+(C-D))/E',
            44: 'A^(B/(C-D))+E',
            45: 'A^(B+(C*D))-E',
            46: 'A^(B-C)+(D^E)',
            47: 'A^(B/C)-(D^E)',
            48: 'A^(B*C)/(D^E)',
            49: '(A^B)-(C^(D/E))',
            50: '(A^B)/(C^(D+E))',
            51: '(A^B)*(C^(D-E))',
            52: '((A^B+C)-D)-E',
            53: '((A^B-C)-D)-E',
            54: '((A^B/C)*D)+E',
            55: '((A^B-C)+D)-E',
            56: '((A+C^B)-D)/E',
            57: '((A/C^B)-D)*E',
            58: '((A-C^B)-D)+E',
            59: '((A+C)^B*D)-E',
            60: '((A+C)/D^B)*E',
            61: '((A+C)*D)^B/E',
            62: '((A+C)/D)+E^B',
            63: '(A^B/(C/D))-E',
            64: '(A-(C^B/D))/E',
            65: '(A*(C-D^B))/E',
            66: '(A/(C-D)^B)+E',
            67: '(A*(C+D))^B/E',
            68: '(A-(C/D))/E^B',
            69: 'A^E*((B+C)*D)',
            70: 'A/((B^E/C)+D)',
            71: 'A/((B*C^E)+D)',
            72: 'A*((B/C)^E/D)',
            73: 'A/((B-C)/D^E)',
            74: 'A/((B*C)+D)^E',
            75: 'A*(C/(D^B+E))',
            76: 'A/(C+(D+E^B))',
            77: 'A/(C/(D/E)^B)',
            78: 'A/(C-(D+E))^B',
            79: 'A^B*(C*(D-E))',
            80: 'A/(C^B/(D/E))'
        }

        const service = new Services()

        //random one equation for list, 80 means the total numbers of list 
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
        } else if (this.state.equation.length >= 9) {
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
                        <button className="number-btn" value={this.state.numbers['e']} onClick={this.insertAnswer} index="5" isnumber="true">{this.state.numbers['e']}</button>

                        {/* Operators */}
                        <button className="operator-btn" value={'+'} onClick={this.insertAnswer} notnumber="true">+</button>
                        <button className="operator-btn" value={'-'} onClick={this.insertAnswer} notnumber="true">-</button>
                        <button className="operator-btn" value={'*'} onClick={this.insertAnswer} notnumber="true">*</button>
                        <button className="operator-btn" value={'/'} onClick={this.insertAnswer} notnumber="true">/</button>
                        <button className="operator-btn" value={'^'} onClick={this.insertAnswer} notnumber="true">^</button>
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

export default Level4