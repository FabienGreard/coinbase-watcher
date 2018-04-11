import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* CSS */
import './Chart.css';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null,
      origin: { x: props.width / props.step, y: 0 },
      width: props.width,
      height: props.height,
      chart: props.data,
      isError: false
    };
  }

  componentDidMount() {
    const interval = setInterval(
      this.updateChart,
      this.props.stepSecond * 1000
    );
    this.setState({ interval });
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  // updateChart = () => {
  //   const { apiMethod, params } = this.props;
  //   apiMethod(params)
  //     .then(json => {
  //       const value = json.data.amount;
  //       this.update('chart', value);
  //     })
  //     .catch(e => {
  //       this.setState({
  //         isError: true
  //       });
  //     });
  // };

  updateChart = () => {
    this.update('chart', Math.round(Math.random() * 1000));
  };

  update = (chart, value) => {
    this.setState(prevstate => ({
      isError: false,
      [chart]: [
        ...prevstate[chart],
        {
          x:
            prevstate[chart][prevstate[chart].length - 1].x +
            prevstate.width / this.props.step,
          y: value,
          value: value
        }
      ],
      origin: {
        x:
          prevstate[chart][prevstate[chart].length - 1].x > prevstate.width
            ? prevstate.origin.x + prevstate.width / this.props.step
            : prevstate.origin.x,
        y: 0
      }
    }));
  };

  newUpdateMethod = () => {};

  getUtils = coords => {
    const array = Object.values(coords).map(coord => coord.y);
    return {
      array: array,
      min: Math.floor(Math.min.apply(null, array)),
      max: Math.ceil(Math.max.apply(null, array)),
      moy: Math.round(array.reduce((acc, coord) => acc + coord) / array.length)
    };
  };

  getCoordinates = (coords, height) => {
    const minMax = this.getUtils(coords);
    const yRatio = (minMax.max - minMax.min) / height;

    return coords.map((coord, i) => ({
      x: coord.x,
      y: Math.round(height - coord.y / yRatio) | 0,
      value: coord.value
    }));
  };

  render() {
    const { chart, origin, width, height, isError } = this.state;
    const {
      title,
      identification,
      step,
      showPoint,
      showPath,
      showCoord,
      showLine,
      showXGrid,
      showYGrid,
      showAbscissa,
      showOrdinate
    } = this.props;

    const graph = this.getCoordinates(chart, height);

    const utils = this.getUtils(chart);
    const ordinateAxis = { min: utils.min, moy: utils.moy, max: utils.max };

    const value = graph[graph.length - 1].value | 0;

    return (
      <div>
        <h1>
          {title} {value} {identification}
        </h1>
        <div
          className="chart-container"
          style={{
            gridTemplateColumns: 'auto ' + width / 2 + 'px ' + width / 2 + 'px',
            gridTemplateRows: height / 2 + 'px ' + height / 2 + 'px auto'
          }}>
          {!isError ? (
            <svg
              viewBox={origin.x + ' ' + origin.y + ' ' + width + ' ' + height}
              className="chart"
              style={{
                width: width,
                height: height
              }}>
              {showPath &&
                graph.map((coord, key) => (
                  <g className="graph" key={key}>
                    <path
                      className="graph-path"
                      d={
                        'M' +
                        graph[key - 1 >= 0 ? key - 1 : key].x +
                        ' ' +
                        graph[key - 1 >= 0 ? key - 1 : key].y +
                        ', L' +
                        graph[key - 1 >= 0 ? key - 1 : key].x +
                        ' ' +
                        (origin.y + height) +
                        ', L' +
                        coord.x +
                        ' ' +
                        (origin.y + height) +
                        ', L' +
                        coord.x +
                        ' ' +
                        coord.y +
                        ' Z'
                      }
                    />
                  </g>
                ))}
              {showXGrid && (
                <g className="grid">
                  <line
                    className="x-grid"
                    x1={origin.x}
                    y1={origin.y}
                    x2={origin.x}
                    y2={origin.y + height}
                  />
                </g>
              )}
              {showYGrid && (
                <g className="grid">
                  <line
                    className="y-grid"
                    x1={origin.x}
                    y1={origin.y + height}
                    x2={origin.x + width}
                    y2={origin.y + height}
                  />
                </g>
              )}
              {showLine &&
                graph.map((coord, key) => (
                  <g className="graph" key={key}>
                    <line
                      className="graph-line"
                      style={{ strokeWidth: 2 + 5 / step }}
                      x1={graph[key - 1 >= 0 ? key - 1 : key].x}
                      y1={graph[key - 1 >= 0 ? key - 1 : key].y}
                      x2={coord.x}
                      y2={coord.y}
                    />
                  </g>
                ))}
              {showPoint &&
                graph.map((coord, key) => (
                  <g className="graph" key={key}>
                    <circle
                      className="graph-point"
                      style={{ r: 1 + 5 / step }}
                      cx={coord.x}
                      cy={coord.y}
                      data-value={coord.x}
                    />
                  </g>
                ))}
              {showCoord &&
                graph.map((coord, key) => (
                  <g className="graph" key={key}>
                    <text
                      className="graph-text"
                      style={{ 'font-size': 12 + 4 / step }}
                      x={coord.x - width / step / 2}
                      y={origin.y + height - 10}>
                      {coord.value}
                    </text>
                  </g>
                ))}
            </svg>
          ) : (
            <h1>Error</h1>
          )}
          {showAbscissa && <div className="abscissa" />}
          {showOrdinate && (
            <div className="ordinate">
              {Object.values(ordinateAxis).map((ordinate, index) => (
                <span className="ordinate-span" key={index}>
                  {ordinate} {identification}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  identification: PropTypes.string,
  step: PropTypes.number,
  stepSecond: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  showPoint: PropTypes.bool,
  showCoord: PropTypes.bool,
  showLine: PropTypes.bool,
  showPath: PropTypes.bool,
  showXGrid: PropTypes.bool,
  showYGrid: PropTypes.bool,
  showAbscissa: PropTypes.bool,
  showOrdinate: PropTypes.bool
};

Chart.defaultProps = {
  title: '',
  identification: '',
  step: 20,
  stepSecond: 1,
  width: 600,
  height: 400,
  showPoint: true,
  showCoord: false,
  showLine: true,
  showPath: true,
  showXGrid: true,
  showYGrid: true,
  showAbscissa: true,
  showOrdinate: true
};

export { Chart };
