import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* CSS */
import './Chart.css';

class Chart extends Component {
  constructor(props) {
    super(props);

    const { step, width, height } = props;
    this.state = {
      interval: null,
      origin: { x: step, y: 0 },
      width: width,
      height: height,
      chart: [{ x: 0, y: 0, value: 0 }],
      chartMock: [{ x: 0, y: 0, value: 0 }],
      isError: false
    };
  }

  componentDidMount() {
    const interval = setInterval(
      this.updateChartMock,
      this.props.stepSecond * 1000
    );
    this.setState({ interval });
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  updateChart = () => {
    const { apiMethod, params } = this.props;
    apiMethod(params)
      .then(json => {
        const value = json.data.amount;
        this.update('chart', value);
      })
      .catch(e => {
        this.setState({
          isError: true
        });
      });
  };

  updateChartMock = () => {
    this.update('chartMock', Math.round(Math.random() * 1000));
  };

  update = (chart, value) => {
    const { step } = this.props;
    this.setState(prevstate => ({
      isError: false,
      [chart]: [
        ...prevstate[chart],
        {
          x:
            prevstate[chart][prevstate[chart].length - 1].x +
            prevstate.width / step,
          y: value,
          value: value
        }
      ],
      origin: {
        x:
          prevstate[chart][prevstate[chart].length - 1].x > prevstate.width
            ? prevstate.origin.x + prevstate.width / step
            : prevstate.origin.x,
        y: 0
      }
    }));
  };

  getCoordinates = (coords, width, height) => {
    const maxMinArray = Object.values(coords).map(coord => coord.y);
    const min = Math.floor(Math.min.apply(null, maxMinArray));
    const max = Math.ceil(Math.max.apply(null, maxMinArray));

    const yRatio = (max - min) / height;
    return coords.map((coord, i) => {
      const y = Math.round(height - coord.y / yRatio) | 0;
      return { x: coord.x, y: y, value: coord.value };
    });
  };

  render() {
    const { chart, chartMock, isError, origin, width, height } = this.state;
    const {
      apiMethod,
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

    const graph = chart[1]
      ? this.getCoordinates(chart, width, height)
      : this.getCoordinates(chartMock, width, height);

    const value = graph[graph.length - 1].value | 0;

    return (
      <div>
        <h1>
          {apiMethod.name} : {value}
          {identification}
        </h1>
        <div className="chart-grid">
          {!isError ? (
            <svg
              viewBox={origin.x + ' ' + origin.y + ' ' + width + ' ' + height}
              className="chart"
            >
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
                      y={origin.y + height - 10}
                    >
                      {coord.value}
                    </text>
                  </g>
                ))}
            </svg>
          ) : (
            <h1>Error</h1>
          )}
          {showAbscissa && <div className="abscissa">abscissa</div>}
          {showOrdinate && <div className="ordinate">ordinate</div>}
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  apiMethod: PropTypes.func.isRequired,
  params: PropTypes.string.isRequired
};

Chart.defaultProps = {
  step: 20,
  stepSecond: 1,
  width: 300,
  height: 200,
  identification: '€',
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
