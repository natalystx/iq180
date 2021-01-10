import React from 'react'
import * as Parser from 'mathjs' //math library
import './Level7.css'
import delIcon from '../../images/icons/delete.png'

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

        //random one equation for list, 25 means the total numbers of list
        let randomIndex = await Math.floor(Math.random() * 80)


        //recheck for make sure index of equationList is not equa 0 if equa 0 just +1
        let defaultEquation = randomIndex === 0 ? await equationList[randomIndex + 1] : await equationList[randomIndex]

        console.log('index: ' + randomIndex)

        //split equation and replace all a,b,c,d with numbers as same index name
        defaultEquation = await defaultEquation.split('a').join(this.state.numbers['a'])
        defaultEquation = await defaultEquation.split('b').join(this.state.numbers['b'])
        defaultEquation = await defaultEquation.split('c').join(this.state.numbers['c'])
        defaultEquation = await defaultEquation.split('d').join(this.state.numbers['d'])





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
        } else if (await this.checkFacValue(tempDefaultEquation)){

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


        }

        else {
          this.doRandomNumbers()
        }


    }

    //check inside root value
    checkRootValue = (defaultEquation) => {

        const startIndex = defaultEquation.indexOf('nthRoot') //find start index of root
        let rootPart = '' // set default value of rootPart
        let insideRootCal = '' // set default value of insideRootCal
        let openParathensesCounter = 0 // set default value of openParathensesCounter
        let closeParathensesCounter = 0 // set default value of closeParathensesCounter

        //check includes some root
        if (defaultEquation.includes('nthRoot')) {
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
                console.log('isNeg')
                return 0 // incase insideRootValue < 0 get false
            }
        } else {
            return false //return false cause isn't contains root
        }
    }

    //check factorial inner value
    checkFacValue = async (equation) => {
      let facIndexList = []
      let allFacValueIsValid = []
      console.log(`isInclude: ${equation.includes('!')}`);
      if(await equation.includes('!')){
        for (let i = 0; i < equation.length; i++) {
          if(equation[i] === '!'){
            facIndexList.push(i)
          }
        }

        for (let i = 0; i < facIndexList.length; i++) {
          allFacValueIsValid.push(await this.getFacPart(equation, facIndexList[i]))
        }

        console.log(`allFacValueIsValid: ${allFacValueIsValid}`);


        if (await allFacValueIsValid.includes(false)) {
          return false
        } else {
          return true
        }



      }
      else{
        return false
      }
    }

    getFacPart = async (equation, index) => {
        let equationPart = ''

        for (let i = index-1; i >= 0; i--) {
          equationPart += equation[i]

          if(this.checkParatheses(equationPart)){
            break
          }

        }

      const reseversedEquation = equationPart.split("").reverse().join("")
      console.log(`reversed: ${reseversedEquation}`);
      const result = Parser.evaluate(reseversedEquation)
      console.log(`isPositive: ${result >= 0 && Number.isInteger(result)}`);
      const isValid = await result >= 0 && Number.isInteger(result)

      return isValid
    }

    //gen nthRoot form
    getNRootForm = (params) => {
        let newParams = params // define variable
        let baseRootPart = '' // set default value of baseRootPart
        let openParathensesCounter = 0 // set default value of openParathensesCounter
        let closeParathensesCounter = 0 // set default value of closeParathensesCounter
        let rootValue = ''
        console.log('nthRoot' + newParams)

        const baseRootPartStartIndex = newParams.indexOf(',') + 1 //find start index of comma

        //get root base value
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
                }

            } else {
                baseRootPart += newParams[index] // store baseRootPart
            }
        }

        //check Parathenses balance
        if (openParathensesCounter > closeParathensesCounter) {
            let diff = openParathensesCounter - closeParathensesCounter
            for (let index = 0; index < diff; index++) {
                baseRootPart = baseRootPart + ')'
            }
        }

        //check Parathenses balance
        if (openParathensesCounter < closeParathensesCounter) {
            let diff = closeParathensesCounter - openParathensesCounter
            for (let index = 0; index < diff; index++) {
                baseRootPart = '(' + baseRootPart
            }
        }

        //reset Parathenses counter
        openParathensesCounter = 0
        closeParathensesCounter = 0

        //get root value
        for (let index = baseRootPartStartIndex - 2; index >= 0; index--) {

            if (newParams[index] === '(') { // count open parathenses
                rootValue += newParams[index] // store value in index into baseRootPart
                openParathensesCounter++ // store openParathensesCounter
            } else if (newParams[index] === ')') { // close open parathenses
                rootValue += newParams[index] // store value in index into baseRootPart
                closeParathensesCounter++ // close openParathensesCounter

                //check closeParathensesCounter and openParathensesCounter are both eqaul and aren't empty
                if (openParathensesCounter === closeParathensesCounter && openParathensesCounter !== 0 && closeParathensesCounter !== 0) {
                    break //break the loop
                }

            } else {
                rootValue += newParams[index] // store baseRootPart
            }

        }

        //reverse rootValue string
        const finalRootValue = rootValue.split("").reverse().join("") + ')'

        console.log('baseRootPart: ' + baseRootPart)
        console.log('finalRootValue: ' + finalRootValue)
        //check root condition
        if (Parser.evaluate(baseRootPart) >= 3 && Parser.evaluate(finalRootValue) >= 0 && Number.isInteger(Parser.evaluate(finalRootValue))) {
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
                this.setState({ equation: temp})
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
        const operatorList = ['-', '+', '*', '/']
        let tempAns
        let equationTemp = this.state.equation.replace('√', 'nthRoot')
        console.log('temp: ' + equationTemp)

        // check Paratheses
        if (this.checkParatheses(this.state.equation)) {

            //check is contain root ?
            if (await this.checkRootValue(equationTemp)) {
                tempAns = operatorList.includes(equationTemp.slice(-1)) ? false : await Parser.evaluate(equationTemp)
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
            else if (await this.checkRootValue(equationTemp) === 0) {
                this.setState({
                    isAnsCorrect: false,
                    showAnsClass: 'ans-card',
                    respondText: 'ค่าในเครื่องหมายรูทไม่สามารถติดลบได้และเป็นจำนวนเต็มเท่านั้น',
                    isCorrectClass: 'incorrect',
                    answer: 0
                })
            }
            else if(await this.checkFacValue(equationTemp) === false){
                      this.setState({
                          isAnsCorrect: false,
                          showAnsClass: 'ans-card',
                          respondText: 'ค่า factorial ไม่สามารถติดลบได้',
                          isCorrectClass: 'incorrect',
                          answer: 0
                      })
            }


            else {
                tempAns = operatorList.includes(equationTemp.slice(-1)) ? false : await Parser.evaluate(equationTemp)
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
