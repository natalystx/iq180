import React from 'react';
import * as Parser from 'mathjs'; //math library
import './Level1.css';
import delIcon from '../../images/icons/delete.png';

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
            equaltion: '',
            answer: 0,
            defaultAnswer: 0,
            defaultEqualtion: null,
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
        let equaltionList = {
            1: '((a+b)+	c)+	d',
            2: '((a-b)-c)+d',
            3: '((a*b)*c)-d',
            4: '((a/b)/c)*d',
            5: '((a*b)+c)*d',
            6: 'a+(b+(c+d))',
            7: 'a-(b-(c+d))',
            8: 'a*(b*(c-d))',
            9: 'a/(b/(c*d))',
            10: 'a-(b/(c+d))',
            11: '(a+b)+(c+d)',
            12: '(a-b)-(c+d)',
            13: '(a*b)*(c-d)',
            14: '(a/b)/(c*d)',
            15: '(a*b)/(c+d)',
            16: '(a+(b+c))+d',
            17: '(a-(b-c))+d',
            18: '(a*(b*c))-d',
            19: '(a/(b/c))*d',
            20: '(a-(b/c))*d',
            21: 'a+((b+c)+d)',
            22: 'a-((b-c)+d)',
            23: 'a*((b*c)-d)',
            24: 'a/((b/c)*d)',
            25: 'a-((b/c)*d)'
        }

        //random one equation for list, 25 means the total numbers of list 
        let randomIndex = await Math.floor(Math.random() * 25)

        //recheck for make sure index of equaltionList is not equal 0 if equal 0 just +1
        let defaultEqualtion = randomIndex === 0 ? equaltionList[randomIndex + 1] : equaltionList[randomIndex]

        //split equation and replace all a,b,c,d with numbers as same index name
        defaultEqualtion = await defaultEqualtion.split('a').join(this.state.numbers['a'])
        defaultEqualtion = await defaultEqualtion.split('b').join(this.state.numbers['b'])
        defaultEqualtion = await defaultEqualtion.split('c').join(this.state.numbers['c'])
        defaultEqualtion = await defaultEqualtion.split('d').join(this.state.numbers['d'])

        // Parse string to mathmatic equation for computable 
        let defaultAns = Parser.evaluate(defaultEqualtion)

        //check default answer is 2 digits
        if (defaultAns < 10 || defaultAns > 99 || !Number.isInteger(defaultAns)) {
            await this.doRandomNumbers()
        } else {
            await this.setState({
                defaultAnswer: defaultAns,
                defaultEqualtion: defaultEqualtion
            })
            console.log(this.state.defaultEqualtion);
            console.log(this.state.defaultAnswer);
        }


    }

    //delete input answer
    delAnswer = async () => {

        const operatorList = ['-', '+', '*', '/', '(', ')']
        let temp = this.state.equaltion

        // check values
        if (operatorList.includes(this.state.equaltion[this.state.equaltion.length - 1]) || this.state.equaltion.length === 0) {
            //delete answer
            temp = await temp.slice(0, -1)
            //setState new answer
            await this.setState({ equaltion: temp })
        } else {
            //delete answer
            temp = await temp.slice(0, -1)
            //remove disable button
            let elem = document.querySelector('button[index = "' + this.state.lastButtonIndex[this.state.lastButtonIndex.length - 1] + '"]')
            let tempIndex = this.state.lastButtonIndex
            tempIndex = await tempIndex.slice(0, -1)
            elem.removeAttribute("disabled")

            //setState new answer and buttonIndex
            await this.setState({ equaltion: temp, lastButtonIndex: tempIndex })
        }

    }

    //get user input answer
    insertAnswer = (event) => {
        let temp = this.state.equaltion
        temp = temp + event.target.value
        let elem = event.target
        if (elem.hasAttribute("index")) {
            let indexTemp = [...this.state.lastButtonIndex]
            indexTemp.push(elem.getAttribute("index"))
            this.setState({ equaltion: temp, lastButtonIndex: indexTemp })
            elem.setAttribute("disabled", true)
        } else {
            this.setState({ equaltion: temp })
        }

    }

    //calculate user's equation result and checks with default answer
    calAns = async () => {
        const operatorList = ['-', '+', '*', '/', '(', ')']
        console.log(operatorList);
        console.log(this.state.equaltion.slice(-1));
        let tempAns = operatorList.includes(this.state.equaltion.slice(-1)) ? false : await Parser.evaluate(this.state.equaltion)

        if (this.state.equaltion.length >= 6) {
            console.log(tempAns);
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
                    answer: tempAns
                })
            }
        } else if (this.state.equaltion.length === 0) {
            this.setState({
                isAnsCorrect: false,
                showAnsClass: 'ans-card',
                respondText: 'โปรดกรอกสมการ'
            })
        } else {
            this.setState({
                isAnsCorrect: false,
                showAnsClass: 'ans-card',
                respondText: 'โปรดใช้ตัวเลขให้ครบทุกตัว'
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
            equaltion: '',
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
        if (this.state.equaltion === '') {
            this.setState({
                showAnsClass: 'ans-card',
                respondText: 'โปรดกรอกสมการ'
            })
        } else if (this.state.equaltion.length >= 6) {
            this.setState({
                showAnsClass: 'ans-card',
                respondText: this.state.defaultEqualtion
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
            equaltion: '',
            lastButtonIndex: []
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
                        <p className="ur-equaltion-text">
                            สมการของคุณ
                        </p>
                        <p className="ans-text">
                            ผลลัพท์ {this.state.defaultAnswer}
                        </p>
                    </div>
                    <div className="input-section">
                        <input type="text" className="equaltionInput" readOnly={true} value={this.state.equaltion} />
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
        );
    }
}

export default Level1;