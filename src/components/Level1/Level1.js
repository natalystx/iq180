import React from 'react';
import * as Parser from 'mathjs'; //math library
import './Level1.css';
import delIcon from '../../images/icons/delete.png';

class Level1 extends React.Component {
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
            isCorrectClass: 'incorrect'
        }
    }

    genDefaultAnswer = async () => {
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

        let randomIndex = await Math.floor(Math.random() * 25)
        let defaultEqualtion = randomIndex === 0 ? equaltionList[randomIndex + 1] : equaltionList[randomIndex]


        defaultEqualtion = await defaultEqualtion.split('a').join(this.state.numbers['a'])
        defaultEqualtion = await defaultEqualtion.split('b').join(this.state.numbers['b'])
        defaultEqualtion = await defaultEqualtion.split('c').join(this.state.numbers['c'])
        defaultEqualtion = await defaultEqualtion.split('d').join(this.state.numbers['d'])

        let defaultAns = Parser.evaluate(defaultEqualtion)
        if (Math.floor(defaultAns) < 10 || Math.floor(defaultAns) > 99) {
            await this.doRandomNumbers()
        } else {
            await this.setState({
                defaultAnswer: Math.floor(defaultAns),
                defaultEqualtion: defaultEqualtion
            })
        }

    }

    delAnswer = () => {
        let temp = this.state.equaltion
        temp = temp.slice(0, -1)
        this.setState({ equaltion: temp })
    }

    insertAnswer = (event) => {
        let temp = this.state.equaltion
        temp = temp + event.target.value
        this.setState({ equaltion: temp })
    }

    calAns = async () => {
        let tempAns = await Parser.evaluate(this.state.equaltion)
        this.setState({ answer: tempAns })
        if (this.state.answer === this.state.defaultAnswer) {
            this.setState({
                isAnsCorrect: true,
                showAnsClass: 'ans-card',
                respondText: 'คำตอบถูกต้อง',
                isCorrectClass: 'correct'
            })
        } else {
            this.setState({
                isAnsCorrect: false,
                showAnsClass: 'ans-card',
                respondText: 'คำตอบไม่ถูกต้อง'
            })
        }
        console.log(this.state.answer);
    }

    doRandomNumbers = () => {
        let temp = this.state.numbers
        let dummy = Math.floor(Math.random() * 10)
        temp['a'] = dummy
        dummy = Math.floor(Math.random() * 10)
        temp['b'] = dummy !== 0 ? dummy : Math.floor(Math.random() * 9) + 1
        dummy = Math.floor(Math.random() * 10)
        temp['c'] = dummy !== temp['b'] && dummy !== 0 ? dummy : Math.floor(Math.random() * 9) + 1
        dummy = Math.floor(Math.random() * 10)
        temp['d'] = dummy !== temp['b'] && dummy !== temp['c'] && dummy !== 0 ? dummy : Math.floor(Math.random() * 9) + 1
        this.setState({ numbers: temp })

        //generate default ans
        this.setState({
            equaltion: '',
            respondText: 'คำตอบไม่ถูกต้อง',
            showAnsClass: 'ans-card-inactive',
            isCorrectClass: 'incorrect'
        })
        this.genDefaultAnswer()

    }

    componentDidMount() {
        this.doRandomNumbers()
    }

    showExample = () => {
        if (this.state.equaltion === '') {
            this.setState({
                showAnsClass: 'ans-card',
                respondText: 'โปรดกรอกสมการ'
            })
        } else {
            this.setState({
                showAnsClass: 'ans-card',
                respondText: this.state.defaultEqualtion
            })
        }

        console.log(this.state.defaultEqualtion);
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
                        <button className="number-btn" value={this.state.numbers['a']} onClick={this.insertAnswer}>{this.state.numbers['a']}</button>
                        <button className="number-btn" value={this.state.numbers['b']} onClick={this.insertAnswer}>{this.state.numbers['b']}</button>
                        <button className="number-btn" value={this.state.numbers['c']} onClick={this.insertAnswer}>{this.state.numbers['c']}</button>
                        <button className="number-btn" value={this.state.numbers['d']} onClick={this.insertAnswer}>{this.state.numbers['d']}</button>

                        {/* Operators */}
                        <button className="operator-btn" value={'+'} onClick={this.insertAnswer}>+</button>
                        <button className="operator-btn" value={'-'} onClick={this.insertAnswer}>-</button>
                        <button className="operator-btn" value={'*'} onClick={this.insertAnswer}>*</button>
                        <button className="operator-btn" value={'/'} onClick={this.insertAnswer}>/</button>
                        <button className="operator-btn" value={'('} onClick={this.insertAnswer}>(</button>
                        <button className="operator-btn" value={')'} onClick={this.insertAnswer}>)</button>

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