<Waveform
    barWidth={4}
    peaks={this.props.peaks}
    height={200}
    pos={this.props.pos}
    duration={210}
    onClick={this.handleClick}
    color="#676767"
    progressGradientColors={[
        [0, "#888"],
        [1, "#aaa"],
    ]}
    transitionDuration={300}
/>;
