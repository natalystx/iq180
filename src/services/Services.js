import * as Parser from 'mathjs'

class Services {

    //equation validator
    equationValidate = async (numberedEquation) => {
        let status = {
            equation: null,
            answer: null,
            parathesesValid: false,
            divide: {
                contain: false,
                valid: false
            },
            factorial: {
                contain: false,
                valid: false
            },
            root: {
                contain: false,
                valid: false
            },
            summation: {
                contain: false,
                valid: false
            }
        }

        status.equation = numberedEquation

        //check paratheses
        if (this.checkParatheses(numberedEquation)) {

            //set paratheses valid status
            status.parathesesValid = true

            //set equation is contain divide operator status
            status.divide.contain = await numberedEquation.includes('/')

            //set equation is contain divide value valid status
            status.divide.valid = await this.checkDivideResult(numberedEquation)

            //set equation is contain root operator status
            status.root.contain = await numberedEquation.includes('nthRoot')

            //set equation is contain root value valid status
            status.root.valid = await this.checkRootValue(numberedEquation)

            //set equation is contain factorial operator status
            status.factorial.contain = await numberedEquation.includes('!')

            //set equation is contain root value valid status
            status.factorial.valid = await this.checkFacValue(numberedEquation)
        } else {

            //set paratheses valid status
            status.parathesesValid = false

        }

        //all operator validation checker
        let isAllOperatorValid = false

        //check equation vilidation
        for (const key in status) {

            //if patheses invalid
            if (!status.parathesesValid) {
                break
            }

            // check all operator validation 
            if (['root', 'divide', 'factorial', 'summation'].includes(key)) {
                // check contain and valid status are same
                isAllOperatorValid = status[key].contain === status[key].valid

                //if some case invalid
                if (!isAllOperatorValid) {
                    break
                }
            }
        }

        //set answer by isAllOperatorValid value based
        status.answer = isAllOperatorValid ? await Parser.evaluate(status.equation) : 'invalid'
        //return status object
        return status

    }


    //cal inserted equation
    calInsertedEquation = async (insertedEquation, defaultAnswers, usedNumbers, defaultNumberCount) => {

        const checkingResult = await this.equationValidate(insertedEquation)
        const operatorList = ['-', '+', '*', '/']

        const checkingRules = {
            isLastCharIsOperator: {
                true: {
                    isAnsCorrect: false,
                    showAnsClass: 'ans-card',
                    respondText: 'ตัวสุดท้ายของสมการไม่สามารถเป็นเครื่องหมายทางคณิตศาสตร์ได้',
                    isCorrectClass: 'incorrect',
                }
            },
            isAnswerCorrect: {
                true: {
                    isAnsCorrect: true,
                    showAnsClass: 'ans-card',
                    respondText: 'คำตอบถูกต้อง',
                    isCorrectClass: 'correct',
                },
                false: {
                    isAnsCorrect: false,
                    showAnsClass: 'ans-card',
                    respondText: 'คำตอบไม่ถูกต้อง',
                    isCorrectClass: 'incorrect',
                }
            },

            isParathesesValid: {
                false: {
                    isAnsCorrect: false,
                    showAnsClass: 'ans-card',
                    respondText: 'โปรดใส่วงเล็บให้ครบถ้วน',
                    isCorrectClass: 'incorrect',
                }
            },
            isEquationEmpty: {
                true: {
                    isAnsCorrect: false,
                    showAnsClass: 'ans-card',
                    isCorrectClass: 'incorrect',
                    respondText: 'โปรดกรอกสมการ'
                }
            },
            isUsedAllNumber: {
                false: {
                    isAnsCorrect: false,
                    showAnsClass: 'ans-card',
                    isCorrectClass: 'incorrect',
                    respondText: 'โปรดใช้ตัวเลขให้ครบทุกตัว'
                }
            },
            isDivideValid: {
                false: {
                    isAnsCorrect: false,
                    showAnsClass: 'ans-card',
                    isCorrectClass: 'incorrect',
                    respondText: 'ผลลัพท์ที่ได้จากการหารต้องเป็นจำนวนเต็มเท่านั้น'
                }
            },
            isRootValid: {
                false: {
                    isAnsCorrect: false,
                    showAnsClass: 'ans-card',
                    isCorrectClass: 'incorrect',
                    respondText: 'ค่าภายในเครื่องหมายรูทไม่สามารถติดลบได้'
                }
            },
            isFactorialValid: {
                false: {
                    isAnsCorrect: false,
                    showAnsClass: 'ans-card',
                    isCorrectClass: 'incorrect',
                    respondText: 'ค่าfactorialไม่สามารถติดลบได้'
                }
            },
            isSummationValid: {
                false: {
                    isAnsCorrect: false,
                    showAnsClass: 'ans-card',
                    isCorrectClass: 'incorrect',
                    respondText: 'ค่าsummationไม่สามารถติดลบได้'
                }
            }
        }



        if (!checkingResult.parathesesValid) {
            return checkingRules.isParathesesValid[false]
        }

        if (checkingResult.equation.length === 0) {
            return checkingRules.isEquationEmpty[true]
        }

        if (operatorList.includes(checkingResult.equation.slice(-1))) {
            return checkingRules.isLastCharIsOperator[true]
        }

        if (usedNumbers < defaultNumberCount) {
            return checkingRules.isUsedAllNumber[false]
        }

        if (checkingResult.divide.contain !== checkingResult.divide.valid) {
            return checkingRules.isDivideValid[false]
        }

        if (checkingResult.root.contain !== checkingResult.root.valid) {
            return checkingRules.isRootValid[false]
        }

        if (checkingResult.summation.contain !== checkingResult.summation.valid) {
            return checkingRules.isSummationValid[false]
        }

        if (checkingResult.answer === defaultAnswers) {
            return checkingRules.isAnswerCorrect[true]
        } else {
            return checkingRules.isAnswerCorrect[false]
        }


    }


    //Paratheses checker
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


    checkDivideResult = async (defaultEquation) => {
        //check equation is contain "/"
        if (defaultEquation.search('/') > -1) {  // incase of equation is contain
            const marksPos = this.scanDivideMarkPos(defaultEquation)
            return this.splitEquation(marksPos, defaultEquation)
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

                        if (this.checkParatheses(leftPart)) {
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


                        if (this.checkParatheses(rightPart)) {
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

                            if (this.checkParatheses(leftPart)) {
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


                            if (this.checkParatheses(rightPart)) {
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
                return false // incase insideRootValue < 0 get false
            }
        } else {
            return false //return false cause isn't contains root 
        }
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

    //check factorial inner value
    checkFacValue = async (equation) => {
        let facIndexList = []
        let allFacValueIsValid = []
        if (equation.includes('!')) {
            for (let i = 0; i < equation.length; i++) {
                if (equation[i] === '!') {
                    facIndexList.push(i)
                }
            }

            for (let i = 0; i < facIndexList.length; i++) {
                allFacValueIsValid.push(await this.getFacPart(equation, facIndexList[i]))
            }

            console.log(`allFacValueIsValid: ${allFacValueIsValid}`)


            if (allFacValueIsValid.includes(false)) {
                return false
            } else {
                return true
            }



        }
        else {
            return false
        }
    }

    getFacPart = async (equation, index) => {
        let equationPart = ''

        for (let i = index - 1; i >= 0; i--) {
            equationPart += equation[i]

            if (this.checkParatheses(equationPart)) {
                break
            }

        }

        const reseversedEquation = equationPart.split("").reverse().join("")
        console.log(`reversed: ${reseversedEquation}`)
        const result = Parser.evaluate(reseversedEquation)
        console.log(`isPositive: ${result >= 0 && Number.isInteger(result)}`)
        const isValid = await result >= 0 && Number.isInteger(result)

        return isValid
    }

}

export default Services