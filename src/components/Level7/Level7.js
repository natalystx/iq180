import React from 'react'
import '../styles/Level.css'
import delIcon from '../../images/icons/delete.png'
import sigmaIcon from '../../images/icons/sigma.svg'
import Services from '../../services/Services' //calculation services
import * as swal from 'sweetalert2'
import think from '../../images/think.svg'

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
            isCheck: false,
            inputTarget: '',
            cellingBound: '',
            lowerBound: '',
            itelator: '',
            inSigmaIndex: [],
            intersectionIndex: [],
            notIntersectionIndex: []
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
            80: 'a+((b!)+((c*d)!))',
            81: `Σ(c,a*b,d)`,
            82: 'Σ(c,a-b,d)',
            83: 'Σ(c,a+b,d)',
            84: 'Σ(c*b,a,d)',
            85: 'Σ(c+b,a,d)',
            86: 'Σ(c-b,a,d)',
            87: 'Σ(c^b,a,d)',
            88: 'Σ(a^b,c,d)',
            89: 'Σ(b,(a+d),c)',
            90: 'Σ(b,(a-d),c)',
            91: 'Σ(b,(a*d),c)',
            92: 'Σ(c,(b/d),a)',
            93: 'Σ(c,(b-d),a)',
            94: 'Σ(c,(b+d),a)',
            95: 'Σ(c^b,d,a)',
            96: 'Σ(c^b,a,d)',
            97: 'Σ(c^b,a,d)',
            98: 'Σ(c^a,d,b)',
            99: 'Σ(a^c,d,b)',
            100: 'Σ(b^a,c,d)',
        }

        const service = new Services()

        //random one equation for list, 25 means the total numbers of list 
        let randomIndex = await Math.floor(Math.random() * 100)

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

        const operatorList = ['-', '+', '*', '/', '(', ')', '^', ',', '!', 'Σ', '√']
        const allNumberIndexValue = document.querySelectorAll('button[index]')
        let allIndex

        let temp = this.state.equation


        // check values
        if (operatorList.includes(this.state.equation[this.state.equation.length - 1]) || this.state.equation.length === 0) {
            //delete answer
            temp = await temp.slice(0, -1)
            //setState new answer
            await this.setState({ equation: temp })
        }
        else {
            allNumberIndexValue.forEach(item => {

                const number = item.getAttribute('value').toString()
                const index = item.getAttribute('index').toString()

                if (number === temp[temp.length - 1]) {
                    if (this.state.lastButtonIndex.includes(index)) {
                        allIndex = this.state.lastButtonIndex.filter(item => item !== index)
                    }
                }
            })
            temp = await temp.slice(0, -1)
            this.setState({ equation: temp })

            this.setState({ lastButtonIndex: allIndex })

            allNumberIndexValue.forEach(elem => {
                const index = elem.getAttribute('index')
                if (allIndex.includes(index)) {
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

    insertSigma = async (event) => {

        let elem = event.target
        let value = event.target.value
        let allNumber = document.querySelectorAll("button[isnumber]")
        let allIndex = document.querySelectorAll("button[index]")
        let indexTemp = [...this.state.lastButtonIndex]
        let sigmaindex = [...this.state.inSigmaIndex]
        // let cellingindex = [...this.state.cellingIndex]
        // let itelatorindex = [...this.state.intelatorIndex]
        // let lowerindex = [...this.state.lowerIndex]

        if (elem.hasAttribute("isnumber")) {
            await allNumber.forEach(elem => {
                elem.setAttribute("disabled", true)
            })
            if (elem.hasAttribute("index")) {

                indexTemp.push(elem.getAttribute("index"))
                sigmaindex.push(elem.getAttribute("index"))

                if (this.state.inputTarget === '.celling-bound') {
                    const temp = this.state.cellingBound
                    this.setState({ cellingBound: temp + value })
                }

                if (this.state.inputTarget === '.lower-bound') {
                    const temp = this.state.lowerBound
                    this.setState({ lowerBound: temp + value })
                }

                if (this.state.inputTarget === '.itelator') {
                    const temp = this.state.itelator
                    this.setState({ itelator: temp + value })
                }

                elem.setAttribute("disabled", true)
            } else {
                if (this.state.inputTarget === '.celling-bound') {
                    const temp = this.state.cellingBound
                    this.setState({ cellingBound: temp + value })
                }

                if (this.state.inputTarget === '.lower-bound') {
                    const temp = this.state.lowerBound
                    this.setState({ lowerBound: temp + value })
                }

                if (this.state.inputTarget === '.itelator') {
                    const temp = this.state.itelator
                    this.setState({ itelator: temp + value })
                }
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

            if (this.state.inputTarget === '.celling-bound') {
                const temp = this.state.cellingBound
                this.setState({ cellingBound: temp + value })
            }

            if (this.state.inputTarget === '.lower-bound') {
                const temp = this.state.lowerBound
                this.setState({ lowerBound: temp + value })
            }

            if (this.state.inputTarget === '.itelator') {
                const temp = this.state.itelator
                this.setState({ itelator: temp + value })
            }

        }

        this.setState({ lastButtonIndex: indexTemp, inSigmaIndex: sigmaindex })

        // else {
        //     if (elem.hasAttribute("index")) {
        //         this.setState({ equation: temp })
        //     } else {
        //         this.setState({ equation: temp })
        //     }
        //     this.openRootModal()
        // }




    }

    setFieldSigma = async (className) => {
        let allNumber = document.querySelectorAll("button[isnumber]")
        let allIndex = document.querySelectorAll("button[index]")

        await allNumber.forEach(elem => {
            elem.removeAttribute("disabled")
        })

        await allIndex.forEach(elem => {
            let index = elem.getAttribute("index")
            if (this.state.lastButtonIndex.includes(index)) {
                elem.setAttribute("disabled", true)
            }
        })

        await this.setState({ inputTarget: className })
    }

    disabledAllNumbers = () => {
        let allNumber = document.querySelectorAll("button[isnumber]")
        let allIndex = document.querySelectorAll("button[index]")

        allNumber.forEach(elem => {
            elem.setAttribute("disabled", "true")
        })

    }

    fillSigma = async () => {
        const modal = document.querySelector('#sigmaModal')
        let allNumber = document.querySelectorAll("button[isnumber]")
        let allIndex = document.querySelectorAll("button[index]")
        const services = new Services()
        const itelatorStatus =  await services.equationValidate(this.state.itelator)
        const cellingBoundStatus =  await services.equationValidate(this.state.cellingBound)
        const lowerBoundStatus =  await services.equationValidate(this.state.lowerBound)

        if (this.state.lowerBound === '') {
            swal.fire({
                title: 'เกิดข้อผิดพลาด',
                icon: 'error',
                text: 'ค่าขอบล่างไม่สามารถเป็นค่าว่างได้'
            })
        }

        else if (this.state.cellingBound === '') {
            swal.fire({
                title: 'เกิดข้อผิดพลาด',
                icon: 'error',
                text: 'ค่าขอบขอบบนไม่สามารถเป็นค่าว่างได้'
            })
        }

        else if (this.state.itelator === '') {
            swal.fire({
                title: 'เกิดข้อผิดพลาด',
                icon: 'error',
                text: 'ตัวกระทำไม่สามารถเป็นค่าว่างได้'
            })
        } else if(this.state.cellingBound < this.state.lowerBound ){
            swal.fire({
                title: 'เกิดข้อผิดพลาด',
                icon: 'error',
                text: 'ค่าขอบบนไม่สามารถน้อยกว่าค่าขอบล่างได้'
            })
        }  else if(itelatorStatus.answer === 'invalid'){
            swal.fire({
                title: 'เกิดข้อผิดพลาด',
                icon: 'error',
                text: 'ผลลัพท์สมการตัวกระทำต้องเป็นจำนวนเต็มเท่านั้น'
            })

        }
        else if(lowerBoundStatus.answer === 'invalid'){
            swal.fire({
                title: 'เกิดข้อผิดพลาด',
                icon: 'error',
                text: 'ผลลัพท์สมการขอบล่างต้องเป็นจำนวนเต็มเท่านั้น'
            })
        }
        else if(cellingBoundStatus.answer === 'invalid'){
            swal.fire({
                title: 'เกิดข้อผิดพลาด',
                icon: 'error',
                text: 'ผลลัพท์สมการขอบบนต้องเป็นจำนวนเต็มเท่านั้น'
            })
        }
        
        else {
            const temp = this.state.equation
            this.setState({
                equation: temp + `Σ(${this.state.itelator},${this.state.lowerBound},${this.state.cellingBound})`,
                lowerBound: '',
                cellingBound: '',
                itelator: ''
            })





            const closeBTN = document.querySelector('.btn-close')
            closeBTN.click()

            const joinedIndex = this.state.intersectionIndex.concat(this.state.lastButtonIndex)
            allIndex.forEach(elem => {
                const index = elem.getAttribute('index')
                if (joinedIndex.includes(index)) {
                    elem.setAttribute("disabled", true)
                } else {
                    elem.removeAttribute("disabled")
                }
            })

            this.setState({
                intersectionIndex: [],
                notIntersectionIndex: [],
                lastButtonIndex: joinedIndex
            })




        }

    }

    doLastIndexListDisabled = async () => {
        let allNumber = document.querySelectorAll("button[isnumber]")
        let allIndex = document.querySelectorAll("button[index]")

        const notIntersectionIndex = this.state.lastButtonIndex.filter(item => !this.state.inSigmaIndex.includes(item))
        const intersectionIndex = this.state.lastButtonIndex.filter(item => this.state.inSigmaIndex.includes(item))

        allNumber.forEach(elem => {
            elem.removeAttribute("disabled")
        })

        allIndex.forEach(elem => {
            let index = elem.getAttribute("index")
            if (notIntersectionIndex.includes(index)) {
                elem.setAttribute("disabled", true)
            }
        })

        this.setState({
            cellingBound: '',
            lowerBound: '',
            itelator: '',
            lastButtonIndex: notIntersectionIndex,
            intersectionIndex: intersectionIndex,
            notIntersectionIndex: notIntersectionIndex,
            inSigmaIndex: []
        })
    }

    delSigma = async (targetInput) => {
        const operatorList = ['-', '+', '*', '/', '(', ')', '^', ',', '!', 'Σ', '√']

        let celling = this.state.cellingBound
        let itelatorTemp = this.state.itelator
        let lower = this.state.lowerBound
        const allNumberIndexValue = document.querySelectorAll('button[index]')
        let sigmaIndex
        let allIndex


        if (targetInput === '.lower-bound') {
            if (lower.length === 0 || operatorList.includes(lower[lower.length - 1])) {
                lower = lower.slice(0, -1)
                this.setState({ lowerBound: lower })

            }
            else {
                allNumberIndexValue.forEach(item => {

                    const number = item.getAttribute('value').toString()
                    const index = item.getAttribute('index').toString()

                    if (number === lower[lower.length - 1]) {
                        if (this.state.inSigmaIndex.includes(index)) {
                            sigmaIndex = this.state.inSigmaIndex.filter(item => item !== index)
                            allIndex = this.state.lastButtonIndex.filter(item => item !== index)
                        }
                    }
                })
                lower = lower.slice(0, -1)
                this.setState({ lowerBound: lower })

                this.setState({ inSigmaIndex: sigmaIndex, lastButtonIndex: allIndex })

                allNumberIndexValue.forEach(elem => {
                    const index = elem.getAttribute('index')
                    if (allIndex.includes(index)) {
                        elem.setAttribute("disabled", true)
                    } else {
                        elem.removeAttribute("disabled")
                    }
                })
            }




        }

        if (targetInput === '.itelator') {
            if (itelatorTemp.length === 0 || operatorList.includes(itelatorTemp[itelatorTemp.length - 1])) {
                itelatorTemp = itelatorTemp.slice(0, -1)
                this.setState({ itelator: itelatorTemp })

            }
            else {
                allNumberIndexValue.forEach(item => {

                    const number = item.getAttribute('value').toString()
                    const index = item.getAttribute('index').toString()

                    if (number === itelatorTemp[itelatorTemp.length - 1]) {
                        if (this.state.inSigmaIndex.includes(index)) {
                            sigmaIndex = this.state.inSigmaIndex.filter(item => item !== index)
                            allIndex = this.state.lastButtonIndex.filter(item => item !== index)
                        }
                    }
                })
                itelatorTemp = itelatorTemp.slice(0, -1)
                this.setState({ itelator: itelatorTemp })

                this.setState({ inSigmaIndex: sigmaIndex, lastButtonIndex: allIndex })

                allNumberIndexValue.forEach(elem => {
                    const index = elem.getAttribute('index')
                    if (allIndex.includes(index)) {
                        elem.setAttribute("disabled", true)
                    } else {
                        elem.removeAttribute("disabled")
                    }
                })
            }

        }

        if (targetInput === '.celling-bound') {
            if (celling.length === 0 || operatorList.includes(celling[celling.length - 1])) {
                celling = celling.slice(0, -1)
                this.setState({ cellingBound: celling })

            }
            else {
                allNumberIndexValue.forEach(item => {

                    const number = item.getAttribute('value').toString()
                    const index = item.getAttribute('index').toString()

                    if (number === celling[celling.length - 1]) {
                        if (this.state.inSigmaIndex.includes(index)) {
                            sigmaIndex = this.state.inSigmaIndex.filter(item => item !== index)
                            allIndex = this.state.lastButtonIndex.filter(item => item !== index)

                        }
                    }
                })
                celling = celling.slice(0, -1)
                this.setState({ cellingBound: celling })
                this.setState({ inSigmaIndex: sigmaIndex, lastButtonIndex: allIndex })

                allNumberIndexValue.forEach(elem => {
                    const index = elem.getAttribute('index')
                    if (allIndex.includes(index)) {
                        elem.setAttribute("disabled", true)
                    } else {
                        elem.removeAttribute("disabled")
                    }
                })
            }


        }


    }

    render() {
        return (
            <div className="level-1">

                <div className="modal fade" id="sigmaModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-white" id="exampleModalLabel">Sigma</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { this.doLastIndexListDisabled() }}></button>
                            </div>
                            <div className="modal-body d-flex flex-column align-items-center justify-content-center">
                                <div className="alert alert-info" role="alert">
                                    กรุณาเลือกค่าที่ต้องกรอกก่อนใส่ค่า
                                </div>
                                <div className="sigma-input-wrapper">
                                    <div className="input-wrapper">
                                        <label htmlFor="celling-bound text-white">ขอบบน</label>
                                        <input type="text" step="1" className="celling-bound" data-bs-dismiss="alert" readOnly={true} value={this.state.cellingBound} onClick={() => { this.setFieldSigma('.celling-bound') }} name="celling-bound" />
                                        <button className="del-btn sigma-del" onClick={() => { this.delSigma('.celling-bound') }}><img src={delIcon} alt="del-icon" className="del-icon" /></button>
                                    </div>
                                    <div className="sigma-symbol">
                                        <img src={sigmaIcon} alt="" className="sigma-icon" />
                                        <div className="input-wrapper">
                                            <label htmlFor="itelator text-white">ตัวกระทำ</label>
                                            <input type="text" step="1" className="itelator" data-bs-dismiss="alert" readOnly={true} value={this.state.itelator} name="itelator" onClick={() => { this.setFieldSigma('.itelator') }} />
                                            <button className="del-btn sigma-del" onClick={() => { this.delSigma('.itelator') }}><img src={delIcon} alt="del-icon" className="del-icon" /></button>
                                        </div>
                                    </div>
                                    <div className="input-wrapper">
                                        <label htmlFor="lower-bound text-white">ขอบล่าง</label>
                                        <input type="text" readOnly={true} step="1" className="lower-bound" data-bs-dismiss="alert" name="lower-bound" value={this.state.lowerBound} onClick={() => { this.setFieldSigma('.lower-bound') }} />
                                        <button className="del-btn sigma-del" onClick={() => { this.delSigma('.lower-bound') }}><img src={delIcon} alt="del-icon" className="del-icon" /></button>
                                    </div>

                                </div>
                                <div className="calculator-section calculator-section-on-modal">

                                    {/* numbers */}
                                    <button className="number-btn" value={this.state.numbers['a']} onClick={this.insertSigma} index="1" isnumber="true">{this.state.numbers['a']}</button>
                                    <button className="number-btn" value={this.state.numbers['b']} onClick={this.insertSigma} index="2" isnumber="true">{this.state.numbers['b']}</button>
                                    <button className="number-btn" value={this.state.numbers['c']} onClick={this.insertSigma} index="3" isnumber="true">{this.state.numbers['c']}</button>
                                    <button className="number-btn" value={this.state.numbers['d']} onClick={this.insertSigma} index="4" isnumber="true">{this.state.numbers['d']}</button>

                                    {/* Operators */}
                                    <button className="operator-btn" value={'+'} onClick={this.insertSigma} notnumber="true">+</button>
                                    <button className="operator-btn" value={'-'} onClick={this.insertSigma} notnumber="true">-</button>
                                    <button className="operator-btn" value={'*'} onClick={this.insertSigma} notnumber="true">*</button>
                                    <button className="operator-btn" value={'/'} onClick={this.insertSigma} notnumber="true">/</button>
                                    <button className="operator-btn" value={'^'} onClick={this.insertSigma} notnumber="true">^</button>
                                    <button className="operator-btn" value={'!'} onClick={this.insertSigma} notnumber="true">!</button>
                                    <button className="operator-btn" value={','} onClick={this.insertSigma} notnumber="true">,</button>
                                    {/* <button className="operator-btn" value={'√'} data-bs-toggle="modal" data-bs-target="#rootModal" onClick={this.insertSigma} notnumber="true">√</button> */}
                                    <button className="operator-btn" value={'('} onClick={this.insertSigma} notnumber="true">(</button>
                                    <button className="operator-btn" value={')'} onClick={this.insertSigma} notnumber="true">)</button>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
                                    this.doLastIndexListDisabled()
                                }}>ปิดหน้าต่าง</button>
                                <button type="button" className="btn btn-primary" onClick={this.fillSigma}>ตกลง</button>
                            </div>
                        </div>
                    </div>
                </div>


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
                        <button className="operator-btn" value={'!'} onClick={this.insertAnswer} notnumber="true">!</button>
                        <button className="operator-btn" value={','} onClick={this.insertAnswer} notnumber="true">,</button>
                        <button className="operator-btn" value={'√'} data-bs-toggle="modal" data-bs-target="#rootModal" onClick={this.insertAnswer} notnumber="true">√</button>
                        <button className="operator-btn" value={'Σ'} data-bs-toggle="modal" data-bs-target="#sigmaModal" notnumber="true" onClick={() => { this.disabledAllNumbers() }}>Σ</button>
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

export default Level7
