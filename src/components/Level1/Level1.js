import React from 'react';
import './Level1.css';

class Level1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numbers: [
                null,
                null,
                null,
                null,
            ],
            equaltion: 'a+b+c+d'
        }
    }
    // doRandomNumbers = () => {


    //     let temp = {}
    //     let number = {}
    //     if (this.state.numbers.includes(null)) {
    //         if (this.state.numbers[0] === 0) {
    //             this.setState(number[0] = 2)
    //         }
    //         if (this.state.numbers[1] === 0) {
    //             this.setState(number[1] = 2)
    //         }
    //         if (this.state.numbers[2] === 0) {
    //             this.setState(number[2] = 2)
    //         }
    //         if (this.state.numbers[3] === 0) {
    //             this.setState(number[3] = 2)
    //         }
    //     }


    // }

    // componentDidMount() {
    //     this.doRandomNumbers()
    // }

    render() {
        return (
            <div className="level-1">
                <div className="re-random-section">
                    <button className="re-random-btn">
                        สุ่มใหม่
                </button>
                </div>
                <div className="game-content">
                    <div className="info-text">
                        <p className="ur-equaltion-text">
                            สมการของคุณ
                        </p>
                        <p className="ans-text">
                            ผลลัพท์ 53
                        </p>
                    </div>
                    <input type="text" className="equaltionInput" readOnly="true" defaultValue={this.state.equaltion} />
                    <div className="calculator-section">

                        {/* numbers */}
                        <button className="number-btn">2</button>
                        <button className="number-btn">2</button>
                        <button className="number-btn">2</button>
                        <button className="number-btn">2</button>

                        {/* Operators */}
                        <button className="operator-btn">+</button>
                        <button className="operator-btn">-</button>
                        <button className="operator-btn">*</button>
                        <button className="operator-btn">/</button>
                        <button className="operator-btn">(</button>
                        <button className="operator-btn">)</button>

                        {/* Submit */}
                        <button className="submit-btn">ส่งคำตอบ</button>

                        {/* Show Answer */}
                        <button className="show-ans-btn">เฉลย</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Level1;