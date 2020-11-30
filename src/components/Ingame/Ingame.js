import React from 'react'
import './Ingame.css'
import { Link } from 'react-router-dom'
import Level1 from '../Level1/Level1'
import Level2 from '../Level2/Level2'
import Level3 from '../Level3/Level3'
import Level4 from '../Level4/Level4'
import Level5 from '../Level5/Level5'
import Level6 from '../Level6/Level6'

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
            6: <Level6 />
        }

        return (
            <div className="Ingame">
                <div className="ingame-top-section">
                    <h3 className="level-show-text">ระดับความยาก {this.state.level}</h3>
                    <Link to="/">
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