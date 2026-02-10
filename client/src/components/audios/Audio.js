import React from 'react';

class Audio extends React.Component {

    render() {
        return (
            <div className='page'>
                <p className="itemp">
                    {this.props.location.state.side} audio recorded on: {new Date(this.props.location.state.dateSent).toLocaleDateString()}
                </p>

                <img className="item"
                    id={this.props.location.state.id}
                    src={this.props.location.state.src}
                    alt={this.props.location.state.alt}
                    audio={this.props.location.state.audio}
                />
                <a className='closeWindow' href='/dashboard'>x</a>
            </div>
        );
    }
}

export default Audio;