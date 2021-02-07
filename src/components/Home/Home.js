import React from 'react';
import { Link } from 'react-router-dom';
import kidHead from '../../images/kid-head.svg'
import overfloat1 from '../../images/icon-flow-1.svg'
import overfloat2 from '../../images/icon-flow-2.svg'
import overfloat3 from '../../images/icon-flow-3.svg'
import overfloat4 from '../../images/icon-flow-4.svg'
import overfloat5 from '../../images/icon-flow-5.svg'
import rubik from '../../images/rubik.svg'
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
            <div className="Home container">
                <div className="svg-logo d-flex justify-content-center align-items-center">
                    <div className="logo-animated">
                        <img src={overfloat5} alt="logo" className="overfloat-logo overfloat-logo-5" />
                        <img src={overfloat4} alt="logo" className="overfloat-logo overfloat-logo-4" />
                        <img src={overfloat3} alt="logo" className="overfloat-logo overfloat-logo-3" />
                        <img src={overfloat2} alt="logo" className="overfloat-logo overfloat-logo-2" />
                        <img src={overfloat1} alt="logo" className="overfloat-logo overfloat-logo-1" />
                        <img src={kidHead} alt="logo" className="kid-head" />
                    </div>
                </div>
                <h1 className="header-text">IQ180 GAME</h1>

                <div className="levels-section d-flex justify-content-start align-items-center w-100 mb-md-5">
                    <Link to={
                        {
                            pathname: "/ingame",
                            state: {
                                level: 1
                            }

                        }
                    } className="d-flex flex-column align-items-center link w-100 level-card-wrap">

                        <div className="level-card d-flex flex-column align-items-center w-100 mt-md-5">
                            <div className="rubik-wrapper d-flex flex-column align-items-center w-100">
                                <img src={rubik} alt="" className="rubik-icon" />
                            </div>
                            <p className="level-text text-white mt-5">ระดับ</p>
                            <h1 className="level-text-head text-white">Level 1</h1>
                        </div>
                    </Link>
                    <Link to={
                        {
                            pathname: "/ingame",
                            state: {
                                level: 2
                            }

                        }
                    } className="d-flex flex-column align-items-center link w-100 level-card-wrap">

                        <div className="level-card d-flex flex-column align-items-center w-100">
                            <div className="rubik-wrapper d-flex flex-column align-items-center w-100">
                                <img src={rubik} alt="" className="rubik-icon" />
                            </div>
                            <p className="level-text text-white mt-5">ระดับ</p>
                            <h1 className="level-text-head text-white">Level 2</h1>
                        </div>
                    </Link>
                    <Link to={
                        {
                            pathname: "/ingame",
                            state: {
                                level: 3
                            }

                        }
                    } className="d-flex flex-column align-items-center link w-100 level-card-wrap">

                        <div className="level-card d-flex flex-column align-items-center w-100">
                            <div className="rubik-wrapper d-flex flex-column align-items-center w-100">
                                <img src={rubik} alt="" className="rubik-icon" />
                            </div>
                            <p className="level-text text-white mt-5">ระดับ</p>
                            <h1 className="level-text-head text-white">Level 3</h1>
                        </div>
                    </Link>
                    <Link to={
                        {
                            pathname: "/ingame",
                            state: {
                                level: 4
                            }

                        }
                    } className="d-flex flex-column align-items-center link w-100 level-card-wrap">

                        <div className="level-card d-flex flex-column align-items-center w-100">
                            <div className="rubik-wrapper d-flex flex-column align-items-center w-100">
                                <img src={rubik} alt="" className="rubik-icon" />
                            </div>
                            <p className="level-text text-white mt-5">ระดับ</p>
                            <h1 className="level-text-head text-white">Level 4</h1>
                        </div>
                    </Link>
                    <Link to={
                        {
                            pathname: "/ingame",
                            state: {
                                level: 5
                            }

                        }
                    } className="d-flex flex-column align-items-center link w-100 level-card-wrap">

                        <div className="level-card d-flex flex-column align-items-center w-100">
                            <div className="rubik-wrapper d-flex flex-column align-items-center w-100">
                                <img src={rubik} alt="" className="rubik-icon" />
                            </div>
                            <p className="level-text text-white mt-5">ระดับ</p>
                            <h1 className="level-text-head text-white">Level 5</h1>
                        </div>
                    </Link>
                    <Link to={
                        {
                            pathname: "/ingame",
                            state: {
                                level: 6
                            }

                        }
                    } className="d-flex flex-column align-items-center link w-100 level-card-wrap">

                        <div className="level-card d-flex flex-column align-items-center w-100">
                            <div className="rubik-wrapper d-flex flex-column align-items-center w-100">
                                <img src={rubik} alt="" className="rubik-icon" />
                            </div>
                            <p className="level-text text-white mt-5">ระดับ</p>
                            <h1 className="level-text-head text-white">Level 6</h1>
                        </div>
                    </Link>
                    <Link to={
                        {
                            pathname: "/ingame",
                            state: {
                                level: 7
                            }

                        }
                    } className="d-flex flex-column align-items-center link w-100 level-card-wrap">

                        <div className="level-card d-flex flex-column align-items-center w-100">
                            <div className="rubik-wrapper d-flex flex-column align-items-center w-100">
                                <img src={rubik} alt="" className="rubik-icon" />
                            </div>
                            <p className="level-text text-white mt-5">ระดับ</p>
                            <h1 className="level-text-head text-white">Level 7</h1>
                        </div>
                    </Link>
                    <Link to={
                        {
                            pathname: "/ingame",
                            state: {
                                level: 8
                            }

                        }
                    } className="d-flex flex-column align-items-center link w-100 level-card-wrap">

                        <div className="level-card d-flex flex-column align-items-center w-100">
                            <div className="rubik-wrapper d-flex flex-column align-items-center w-100">
                                <img src={rubik} alt="" className="rubik-icon" />
                            </div>
                            <p className="level-text text-white mt-5">ระดับ</p>
                            <h1 className="level-text-head text-white">Level 8</h1>
                        </div>
                    </Link>
                </div>
                {/* 
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
                </div> */}
            </div >
        );
    }
}

export default Home;