import * as Parser from 'mathjs'
const sigma = require('math-sigma')

class Services {

    //equation validator
    equationValidate = async (numberedEquation) => {

        numberedEquation = numberedEquation.replace('√', 'nthRoot')

        let status = {
            equation: null,
            answer: null,
            parathesesValid: false,
            divide: {
                contain: false,
                valid: false
            },
            subtract:{
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
        numberedEquation = numberedEquation.replace('Σ', 'sigma')
        numberedEquation = numberedEquation.replace('σ', 'sigma')

        const realEquation = numberedEquation.replace('sigma', 'Σ')

        //check paratheses
        if (this.checkParatheses(numberedEquation)) {

            //set paratheses valid status
            status.parathesesValid = true

            //set equation is contain summation operator status
            status.summation.contain = await numberedEquation.includes('sigma')

            // const for get result of checksigma
            const sigmaRes = await this.checkSigma(numberedEquation)

            //set equation is valid summation value valid status
            status.summation.valid = !sigmaRes ? sigmaRes : sigmaRes.status

            if (status.summation.contain === true && status.summation.valid === false) {
                return status
            }

            //replace sigma() to result of sigma
            numberedEquation = await numberedEquation.replace(sigmaRes.reformSigma, sigmaRes.sigmaRes)

            //update default eqaution
            status.equation = numberedEquation

            //set equation is contain root operator status
            status.root.contain = await numberedEquation.includes('nthRoot')

            //set equation is contain root value valid status
            status.root.valid = await this.checkRootValue(numberedEquation)

            if (!status.root.valid && status.root.contain) {
                return status
            }

            //set equation is contain divide operator status
            status.divide.contain = await numberedEquation.includes('/')

            //set equation is contain divide value valid status
            status.divide.valid = await this.checkDivideResult(numberedEquation)

            //set equation is contain factorial operator status
            status.factorial.contain = await numberedEquation.includes('!')

            //set equation is valid root value valid status
            status.factorial.valid = await this.checkFacValue(numberedEquation)

            //set equation is contain substract operator status
            status.subtract.contain = await numberedEquation.includes('-')

            //set equation is valid subtract operator status
            status.subtract.valid = await this.checkSubtractResult(numberedEquation)


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
            if (['root', 'divide', 'factorial', 'summation', 'subtract'].includes(key)) {
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
        status.equation = realEquation.replace('nthRoot','√')
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
                    respondText: 'ค่าภายในเครื่องหมายรูทไม่สามารถติดลบหรือผลลัพท์ไม่เป็นจำนวนเต็มบวกได้'
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
                    respondText: 'ค่า sigma ขอบล่างต้องมากกว่าหรือเท่ากับขอบบน'
                }
            },
             isSubtractValid: {
                false: {
                    isAnsCorrect: false,
                    showAnsClass: 'ans-card',
                    isCorrectClass: 'incorrect',
                    respondText: 'ไม่สามารถมีผลลัพท์ติดลบในสมการได้'
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

         if (checkingResult.subtract.contain !== checkingResult.subtract.valid) {
            return checkingRules.isSubtractValid[false]
        }

        if (checkingResult.answer === defaultAnswers) {
            return checkingRules.isAnswerCorrect[true]
        } else {
            return checkingRules.isAnswerCorrect[false]
        }


    }

    //generate random numbers
    randomNumbers = async (numberFormat) => {
        let prevNumbers = []
        let randomedNumber = numberFormat
        for (const key in randomedNumber) {
            let dummy = Math.floor(Math.random() * 10)
            const keyCheckList = ['c', 'd', 'e']


            if (key === 'a') {
                randomedNumber[key] = dummy
                prevNumbers.push(randomedNumber[key])

            }

            if (key === 'b') {
                randomedNumber[key] = dummy === 0 ? dummy + 1 : dummy
                prevNumbers.push(randomedNumber[key])

            }

            while (prevNumbers.includes(dummy) || dummy === 0) {
                dummy = Math.floor(Math.random() * 10)
            }
            randomedNumber[key] = dummy
            prevNumbers.push(randomedNumber[key])



        }

        return randomedNumber
    }

    checkSigma = async (equation) => {
        if (equation.includes('sigma')) {
            const sigmaStartIndex = equation.indexOf('a')
            let sigmaEquation = ''
            for (let index = sigmaStartIndex + 1; index < equation.length; index++) {
                sigmaEquation += equation[index]
                if (this.checkParatheses(sigmaEquation)) {
                    break
                }


            }
            sigmaEquation = await sigmaEquation.slice(1, -1)
            let splitParams = await sigmaEquation.split(',')
            let allParams = []
            let isAllInteger = []

            splitParams.forEach(item => {
                const temp = Parser.evaluate(item)
                isAllInteger.push(Number.isInteger(temp))
                allParams.push(temp)
            })

            if (Parser.evaluate(allParams[0]) < 0 || Parser.evaluate(allParams[1]) < 0 || Parser.evaluate(allParams[2]) < 0){
                return false
            }

            const sigmaResult = await eval(`sigma(x => ${allParams[0]},${allParams[1]}, ${allParams[2]})`)

            const isTrue = (res) => res === true

            if (sigmaResult > 0 && isAllInteger.every(isTrue)) {
                return { status: true, reformSigma: `sigma(${sigmaEquation})`, sigmaRes: sigmaResult }
            } else {
                return false
            }
        } else {
            return false
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
                if (equationPart.includes('nthRoot')) {
                    const rootResult = this.checkRootValue(equationPart)
                    isAllResultInt.push(rootResult)
                } else {
                    isAllResultInt.push(Number.isInteger(Parser.evaluate(equationPart)))
                }



            }
            //left or right is parentheses
            else if (left === ')' || right === '(' || left === '!') {

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
                    equationPart = equationPart.includes(',') ? 'nthRoot' + equationPart : equationPart

                    if (equationPart.includes('nthRoot')) {
                        const rootResult = this.checkRootValue(equationPart)
                        isAllResultInt.push(rootResult)
                    } else {
                        isAllResultInt.push(Number.isInteger(Parser.evaluate(equationPart)))
                    }


                }

                if (left === '!') {
                    let leftPart = ''
                    //get left part
                    for (let index = pos - 1; index >= 0; index--) {
                        leftPart += equation[index]
                      

                        if (this.checkParatheses(leftPart) && leftPart.length > 1) {
                            break
                        }


                    }

                    // leftPart = leftPart.replaceAll('(','')
                    // leftPart = leftPart.replaceAll(')','')


                    let equationPart = leftPart.split("").reverse().join("") + '/' + equation[pos + 1]
                    equationPart = equationPart.includes(',') ? 'nthRoot' + equationPart : equationPart

                    if (equationPart.includes('nthRoot')) {
                        const rootResult = this.checkRootValue(equationPart)
                        isAllResultInt.push(rootResult)
                    } else {
                        isAllResultInt.push(Number.isInteger(Parser.evaluate(equationPart)))
                    }


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
    checkRootValue = async (defaultEquation) => {

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

            const insideRootValue = insideRootCal.includes(',') ? Parser.evaluate(await this.getNRootForm(insideRootCal)) : Parser.evaluate(insideRootCal) //get the calculation of value inside parathenses of root 

            if (insideRootValue > 0 && Number.isInteger(insideRootValue)) { // check insideRootValue is >= 0
                return Number.isInteger(Parser.evaluate(rootPart)) // return the calculation of rootPart is integer or not
            } else {
                return false // incase insideRootValue < 0 get false
            }
        } else {
            return false //return false cause isn't contains root 
        }
    }


    //gen nthRoot form
    getNRootForm = async (equation) => {

        const commaIndex = equation.indexOf(',')
        let leftPart = ''
        let rightPart = ''

        //get right part beside comma symbol
        for (let index = commaIndex + 1; index < equation.length; index++) {
            if (equation[commaIndex + 1] === '(') {
                rightPart += equation[index]
                if (this.checkParatheses(rightPart)) {
                    break
                }
            } else {
                if (equation[index] === ')') {
                    break
                }

                rightPart += equation[index]
            }

            // if (equation[index] === ')') {
            //     if (this.checkParatheses(rightPart)) {
            //         break
            //     }
            // }
        }


        for (let index = commaIndex - 1; index >= 0; index--) {

            if (equation[commaIndex - 1] === ')') {
                leftPart += equation[index]
                if (this.checkParatheses(leftPart)) {
                    break
                }
            } else {
                if (equation[index] === '(' && this.checkParatheses(leftPart)) {
                    break
                }

                leftPart += equation[index]
            }
        }

        // leftPart = await leftPart.replaceAll('(', '')
        // leftPart = await leftPart.replaceAll(')', '')

        // rightPart = await rightPart.replaceAll('(', '')
        // rightPart = await rightPart.replaceAll(')', '')

        //reverse equation left part
        leftPart = leftPart.split('').reverse().join('')



        // //reverse rootValue string
        // const finalRootValue = rootValue.split("").reverse().join("") + ')'

        //check root condition
        if (Parser.evaluate(leftPart) >= 3 && Parser.evaluate(rightPart) > 1 && Number.isInteger(Parser.evaluate(rightPart))) {
            return `nthRoot(${leftPart},${rightPart})` // return new form of equation
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
        const result = Parser.evaluate(reseversedEquation)
        const isValid = await result >= 0 && Number.isInteger(result)

        return isValid
    }

    generateEquation = async (equationForm, generatedNumbers) => {
        let equation = equationForm.toLowerCase()
        for (const key in generatedNumbers) {
            equation = await equation.replace(key, generatedNumbers[key])
        }

        return equation
    }



    checkSubtractResult = async (defaultEquation) => {
        //check equation is contain "/"
        if (defaultEquation.search('-') > -1) {  // incase of equation is contain
            const marksPos = this.scanSubtractMarkPos(defaultEquation)
            return this.splitSubtractEquation(marksPos, defaultEquation)
        } else { // incase of equation isn't contain /
            return false
        }
    }

    //get Position of divide marks
    scanSubtractMarkPos = (equation) => {
        let marksPos = []
        for (let index = 0; index < equation.length; index++) {
            if (equation[index] === '-') {
                marksPos.push(index)
            }
        }
        return marksPos
    }

    //split equation and check result of value 
    splitSubtractEquation = (marksPos, equation) => {

        let isAllResultInt = []
        marksPos.forEach(pos => {
            let left = equation[pos - 1]
            let right = equation[pos + 1]
    

            //left and right are numbers
            if (!isNaN(left) && !isNaN(right)) {
                let result = parseInt(left) - parseInt(right)
                isAllResultInt.push(Number.isInteger(result) && result >= 0)
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

                let equationPart = leftPart.split("").reverse().join("") + '-' + rightPart
                if (equationPart.includes('nthRoot')) {
                    const rootResult = this.checkRootValue(equationPart)
                    isAllResultInt.push(rootResult)
                } else {
                    isAllResultInt.push(Number.isInteger(Parser.evaluate(equationPart)) 
                    && Parser.evaluate(equationPart) >= 0)
                }



            }
            //left or right is parentheses
            else if (left === ')' || right === '(' || left === '!') {

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




                    let equationPart = leftPart.split("").reverse().join("") + '-' + equation[pos + 1]
                    equationPart = equationPart.includes(',') ? 'nthRoot' + equationPart : equationPart

                    if (equationPart.includes('nthRoot')) {
                        const rootResult = this.checkRootValue(equationPart)
                        isAllResultInt.push(rootResult)
                    } else {
                        isAllResultInt.push(Number.isInteger(Parser.evaluate(equationPart)) 
                        && Parser.evaluate(equationPart) >=0)
                    }


                }

                if (left === '!') {
                    let leftPart = ''
                    //get left part
                    for (let index = pos - 1; index >= 0; index--) {
                        leftPart += equation[index]
                      

                        if (this.checkParatheses(leftPart) && leftPart.length > 1) {
                            break
                        }


                    }

                    // leftPart = leftPart.replaceAll('(','')
                    // leftPart = leftPart.replaceAll(')','')


                    let equationPart = leftPart.split("").reverse().join("") + '-' + equation[pos + 1]
                    equationPart = equationPart.includes(',') ? 'nthRoot' + equationPart : equationPart

                    if (equationPart.includes('nthRoot')) {
                        const rootResult = this.checkRootValue(equationPart)
                        isAllResultInt.push(rootResult)
                    } else {
                        isAllResultInt.push(Number.isInteger(Parser.evaluate(equationPart)) 
                        && Parser.evaluate(equationPart) >= 0)
                    }


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

                    let equationPart = equation[pos - 1] + '-' + rightPart
                    const equationPartResult  = Parser.evaluate(equationPart);
                    const isValidAnswer = equationPartResult >= 0 
                    && Number.isInteger(equationPartResult)
                    isAllResultInt.push(isValidAnswer)
                }

            }
        })

        //check all is Integer
        const finalResult = isAllResultInt.every(item => item === true)      
        return finalResult

    }
}

export default Services