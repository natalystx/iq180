import React from 'react'
import './Ingame.css'
import { Link } from 'react-router-dom'
import Level1 from '../Level1/Level1'
import Level2 from '../Level2/Level2'
import Level3 from '../Level3/Level3'
import Level4 from '../Level4/Level4'
import Level5 from '../Level5/Level5'
import Level6 from '../Level6/Level6'
import Level7 from '../Level7/Level7'
import Level8 from '../Level8/Level8'
import rubik from '../../images/rubik.svg'

class Ingame extends React.Component {
    constructor(props) {
        super(props)
        this.state = { level: null }
    }

    //setState when rendered 
    componentDidMount() {
        const level = this.props.location.state
        this.setState({ level: level['level'] })

    }

    render() {

        // Levels of game components store
        const levelComponents = {
            1: <Level1 />,
            2: <Level2 />,
            3: <Level3 />,
            4: <Level4 />,
            5: <Level5 />,
            6: <Level6 />,
            7: <Level7 />,
            8: <Level8 />
        }

        return (
            <div className="Ingame container">
                <div className="ingame-top-section">
                    <div className="level-box">
                        <img src={rubik} alt="sdas" className="rubik-icon-ingame" />
                        <h4 className="level-text-ingame text-white">ระดับ {this.state.level}</h4>
                    </div>
                    <Link to="/" className="h-100">
                        <button className="back-btn">กลับ</button>
                    </Link>

                </div>
                <div className="game-window">
                    {levelComponents[this.state.level]}
                </div>
            </div>
        )
    }
}

export default Ingame