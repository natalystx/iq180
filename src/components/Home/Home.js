import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { level: 1 };
    }

    //Update value when select option
    onValChange = (event) => {
        this.setState({ level: event.target.value })
    }

    render() {
        return (
            <div className="Home">
                <h1 className="header-text">IQ180 GAME</h1>
                <h3 className="level-selection">เลือกระดับความยาก</h3>
                <div className="selector">
                    <select className="levels" onChange={this.onValChange} defaultValue={this.state.level}>
                        <option value="1">ระดับที่ 1</option>
                        <option value="2">ระดับที่ 2</option>
                        <option value="3">ระดับที่ 3</option>
                        <option value="4">ระดับที่ 4</option>
                        <option value="5">ระดับที่ 5</option>
                        <option value="6">ระดับที่ 6</option>
                        <option value="7">ระดับที่ 7</option>
                        <option value="8">ระดับที่ 8</option>
                    </select>
                    <Link to={
                        {
                            pathname: "/ingame",
                            state: {
                                level: this.state.level
                            }

                        }
                    } >
                        <button className="goBtn" onClick={this.goInGame}>เริ่มเกมกันเลย</button>
                    </Link>
                </div>
            </div >
        );
    }
}

export default Home;