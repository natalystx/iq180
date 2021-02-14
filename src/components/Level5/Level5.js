import React from 'react'
import '../styles/Level.css'
import delIcon from '../../images/icons/delete.png'
import Services from '../../services/Services' //calculation services
import * as swal from 'sweetalert2'
import think from '../../images/think.svg'


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
                let indexTemp = [...this.state.lastButtonIndex]
                indexTemp.push(elem.getAttribute("index"))
                this.setState({ equation: temp, lastButtonIndex: indexTemp })
                elem.setAttribute("disabled", true)
            } else {
                this.setState({ equation: temp })
            }
            // this.openRootModal()
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

            this.setState({ isCheck: checkbox.getAttribute('checked') })
        } else {
            checkbox.setAttribute('checked', false)

            this.setState({ isCheck: checkbox.getAttribute('checked') })
        }

    }


    //calculate user's equation result and checks with default answer
    calAns = async () => {
        const services = new Services()
        const calculatedResult = await services.calInsertedEquation(this.state.equation,
            this.state.defaultAnswer,
            this.state.lastButtonIndex.length,
            4)

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
                <div className="modal fade" id="rootModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">

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
                                </div>


                            </div>
                            <div className="modal-footer">
                                <button type="button" data-bs-dismiss="modal" className="btn btn-primary">ตกลง</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="re-random-section-new">
                    <button className="re-random-btn-new" onClick={this.doRandomNumbers}>
                        สุ่มใหม่
                </button>
                </div>
                <div className="game-content">
                    <div className="info-text">
                        <div className="ans-icon-wrap">
                            <img src={think} alt="" className="think-icon" />
                        </div>
                        <p className="ans-text-new">
                            ผลลัพท์ {this.state.defaultAnswer}
                        </p>
                    </div>
                    <div className="input-section">
                        <input type="text" className="equationInput" readOnly={true} value={this.state.equation} placeholder="กรอกสมการของคุณ" />
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
                        <button className="operator-btn" value={','} onClick={this.insertAnswer} notnumber="true">,</button>
                        <button className="operator-btn" value={'√'} onClick={this.insertAnswer} data-bs-toggle="modal" data-bs-target="#rootModal" index="5" notnumber="true">√</button>
                        <button className="operator-btn" value={'('} onClick={this.insertAnswer} notnumber="true">(</button>
                        <button className="operator-btn" value={')'} onClick={this.insertAnswer} notnumber="true">)</button>


                        <div className={this.state.showAnsClass + ' ' + this.state.isCorrectClass}>
                            <p className="res-text">{this.state.respondText}</p>
                        </div>

                        {/* Submit */}
                        <button className="submit-btn" onClick={this.calAns}>ส่งคำตอบ</button>

                        {/* Show Answer */}
                        <button className="show-ans-btn" onClick={this.showExample}>เฉลย</button>

                        {/* Clear */}
                        <button className="clear-btn mt-0 mb-4" onClick={this.clearAns}>เคลียร์</button>
                    </div>
                </div>
            </div >
        )

    }
}

export default Level5