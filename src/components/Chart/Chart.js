import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* CSS */
import './Chart.css';

class Chart extends Component {
  constructor(props) {
    super(props);

    const { gridMargin, step, width, height } = props;
    this.state = {
      interval: null,
      origin: { x: step + 2, y: 0 },
      width: width,
      height: height,
      chart: [{ x: step, y: 0 }],
      chartMock: [{ x: step, y: 0 }],
      isError: false
    };
  }

  componentDidMount() {
    let interval = setInterval(this.updateChartMock, this.props.step * 1000);
    this.setState({ interval });
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  updateChart = () => {
    const { apiMethod, currencyPair } = this.props;
    apiMethod(currencyPair)
      .then(val => {
        const price = val.data.amount;
        this.update('chart', price);
      })
      .catch(e => {
        this.setState({
          isError: true
        });
      });
  };

  updateChartMock = () => {
    this.update('chartMock', Math.round(Math.random() * 100));
  };

  update = (chart, price) => {
    const { step } = this.props;
    this.setState(prevstate => ({
      isError: false,
      [chart]: [
        ...prevstate[chart],
        {
          x:
            prevstate[chart][prevstate[chart].length - 1].x +
            prevstate.width / step,
          y: price
        }
      ],
      origin: {
        x:
          prevstate[chart][prevstate[chart].length - 1].x > prevstate.width
            ? prevstate.origin.x + prevstate.width / step
            : prevstate.origin.x,
        y: price - prevstate.height / 2
      }
    }));
  };

  render() {
    const { chart, chartMock, isError, origin, width, height } = this.state;
    const {
      apiMethod,
      currencyPair,
      gridMargin,
      step,
      showPoint,
      showPath,
      showCoord,
      showLine
    } = this.props;

    const graph = chart[1] ? chart : chartMock;

    const currency = currencyPair.slice(4) === 'EUR' ? '€' : '$';
    const price =
      graph[graph.length - 1] !== 0
        ? graph[graph.length - 1].y + ' ' + currency
        : '';

    return (
      <div>
        <h1>
          {apiMethod.name} : {price}
        </h1>
        {!isError ? (
          <svg
            viewBox={origin.x + ' ' + origin.y + ' ' + width + ' ' + height}
            className="chart"
          >
            <g className="grid x-grid">
              <line
                x1={origin.x + gridMargin}
                y1={origin.y - gridMargin}
                x2={origin.x + gridMargin}
                y2={origin.y + height - gridMargin}
              />
            </g>
            <g className="grid y-grid">
              <line
                x1={origin.x + gridMargin}
                y1={origin.y + height - gridMargin}
                x2={origin.x + width + gridMargin}
                y2={origin.y + height - gridMargin}
              />
            </g>
            {showPath &&
              graph.map((coord, key) => (
                <g className="graph" key={key}>
                  <path
                    className="graph-path"
                    d={
                      'M' +
                      (graph[key - 1 >= 0 ? key - 1 : key].x + gridMargin) +
                      ' ' +
                      (origin.y - gridMargin) +
                      ', L' +
                      (origin.y + height - gridMargin) +
                      ' ' +
                      (graph[key - 1 >= 0 ? key - 1 : key].x + gridMargin) +
                      ', L' +
                      (coord.x + gridMargin) +
                      ' 0, L' +
                      (graph[key - 1 >= 0 ? key - 1 : key].x + gridMargin) +
                      ' 0'
                    }
                    //d={'M0 0 L0 200 L200 300 L200 0'}
                  />
                </g>
              ))}
            {showLine &&
              graph.map((coord, key) => (
                <g className="graph" key={key}>
                  <line
                    className="graph-line"
                    x1={graph[key - 1 >= 0 ? key - 1 : key].x + gridMargin}
                    y1={graph[key - 1 >= 0 ? key - 1 : key].y - gridMargin}
                    x2={coord.x + gridMargin}
                    y2={coord.y - gridMargin}
                  />
                </g>
              ))}
            {showPoint &&
              graph.map((coord, key) => (
                <g className="graph" key={key}>
                  <circle
                    className="graph-point"
                    cx={coord.x + gridMargin}
                    cy={coord.y - gridMargin}
                    data-value={coord.x}
                  />
                </g>
              ))}
            {showCoord &&
              graph.map((coord, key) => (
                <g className="graph" key={key}>
                  <text
                    className="graph-text"
                    x={coord.x - width / step / 2}
                    y={
                      coord.y - height / 4 > 0
                        ? coord.y - height / 4
                        : coord.y + height / 4
                    }
                  >
                    {coord.y}
                  </text>
                </g>
              ))}
          </svg>
        ) : (
          <h1>Error</h1>
        )}
      </div>
    );
  }
}

Chart.propTypes = {
  apiMethod: PropTypes.func.isRequired,
  currencyPair: PropTypes.string.isRequired
};

Chart.defaultProps = {
  step: 2,
  gridMargin: 0,
  width: 300,
  height: 200,
  showPoint: true,
  showCoord: true,
  showLine: true,
  showPath: true
};

export { Chart };
