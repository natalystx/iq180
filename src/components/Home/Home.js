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
import FirebaseService from '../../services/Firebase'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { level: 1 , visitor: 0};
    }

    //Update value when select option
    onValChange = (event) => {
        this.setState({ level: event.target.value })
    }

   async componentDidMount(){
        const db = new FirebaseService()
        db.initialize()
        let count = 0
      await db.getData().then((data) => {
        
        
        if (data !== undefined) {
           count = data.count
        }
      })
      

       this.setState({
            visitor:count + 1
        })


        await db.setData(count + 1)
      

       
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
                <h1 className="header-text">GAME 180 IQ</h1>
                <p className="w-100 text-center text-white">จำนวนผู้เข้าเล่น {this.state.visitor ? 1423+ this.state.visitor : 1423} คน</p>

                <div className="levels-section d-flex justify-content-start align-items-center w-100 my-md-5">
                    <Link to={
                        {
                            pathname: "/ingame",
                            state: {
                                level: 1
                            }

                        }
                    } className="d-flex flex-column align-items-center link w-100 level-card-wrap">

                        <div className="level-card d-flex flex-column align-items-center w-100">
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
                     <Link to={
                        {
                            pathname: "/ingame",
                            state: {
                                level: 9
                            }

                        }
                    } className="d-flex flex-column align-items-center link w-100 level-card-wrap">

                        <div className="level-card d-flex flex-column align-items-center w-100">
                            <div className="rubik-wrapper d-flex flex-column align-items-center w-100">
                                <img src={rubik} alt="" className="rubik-icon" />
                            </div>
                            <p className="level-text text-white mt-5">ระดับ</p>
                            <h1 className="level-text-head text-white">Level 9</h1>
                        </div>
                    </Link>
                     <Link to={
                        {
                            pathname: "/ingame",
                            state: {
                                level: 10
                            }

                        }
                    } className="d-flex flex-column align-items-center link w-100 level-card-wrap">

                        <div className="level-card d-flex flex-column align-items-center w-100">
                            <div className="rubik-wrapper d-flex flex-column align-items-center w-100">
                                <img src={rubik} alt="" className="rubik-icon" />
                            </div>
                            <p className="level-text text-white mt-5">ระดับ</p>
                            <h1 className="level-text-head text-white">Level 10</h1>
                        </div>
                    </Link>
                     <Link to={
                        {
                            pathname: "/ingame",
                            state: {
                                level: 11
                            }

                        }
                    } className="d-flex flex-column align-items-center link w-100 level-card-wrap">

                        <div className="level-card d-flex flex-column align-items-center w-100">
                            <div className="rubik-wrapper d-flex flex-column align-items-center w-100">
                                <img src={rubik} alt="" className="rubik-icon" />
                            </div>
                            <p className="level-text text-white mt-5">ระดับ</p>
                            <h1 className="level-text-head text-white">Level 11</h1>
                        </div>
                    </Link>
                     <Link to={
                        {
                            pathname: "/ingame",
                            state: {
                                level: 12
                            }

                        }
                    } className="d-flex flex-column align-items-center link w-100 level-card-wrap">

                        <div className="level-card d-flex flex-column align-items-center w-100">
                            <div className="rubik-wrapper d-flex flex-column align-items-center w-100">
                                <img src={rubik} alt="" className="rubik-icon" />
                            </div>
                            <p className="level-text text-white mt-5">ระดับ</p>
                            <h1 className="level-text-head text-white">Level 12</h1>
                        </div>
                    </Link>
                </div>
              

               

               
            </div >
        );
    }
}

export default Home;