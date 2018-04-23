import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null,
      getMouseY: { y: props.height, value: 0 },
      toolTip: {},
      utils: this.getUtils(props.data, null),
      width: props.width,
      height: props.height,
      chart: props.data,
      origin: { x: props.width / props.step, y: 0 }
    };
  }

  componentDidMount() {
    if (this.props.isDataLive) {
      this.setState({
        interval: setInterval(this.updateChart, this.props.stepSecond * 1000)
      });
    }
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  updateChart = () => {
    this.update('chart', this.props.liveData());
  };

  update = (chart, value) => {
    if (this.state[chart].length > this.props.step) {
      this.setState(prevstate => ({
        [chart]: prevstate[chart]
          .map((val, i) => prevstate[chart][i + 1])
          .filter(x => x)
      }));
    }
    this.setState(prevstate => ({
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
      },
      utils: this.getUtils(
        [
          ...prevstate[chart],
          {
            x:
              prevstate[chart][prevstate[chart].length - 1].x +
              prevstate.width / this.props.step,
            y: value,
            value: value
          }
        ],
        prevstate.utils
      )
    }));
  };

  getUtils = (coords, utils) => {
    const array = Object.values(coords).map(coord => coord.y);
    return {
      min:
        utils && utils.min < Math.floor(Math.min.apply(null, array))
          ? utils.min
          : Math.floor(Math.min.apply(null, array)),
      max:
        utils && utils.max > Math.ceil(Math.max.apply(null, array))
          ? utils.max
          : Math.ceil(Math.max.apply(null, array)),
      moy: utils ? utils.min + utils.max / 2 : 0
    };
  };

  getCoordinates = (coords, height, utils) => {
    this.getUtils(utils);
    const yRatio = (utils.max * 1.01 - utils.min * 0.99) / height;

    return coords.map((coord, i) => ({
      x: coord.x,
      y: Math.round(height - coord.y / yRatio) | 0,
      value: coord.value
    }));
  };

  setToolTip = coord => {
    this.setState({
      toolTip: { value: coord.value, hover: coord.x }
    });
  };

  setOrdonateIndicator = (e, utils, height) => {
    const yRatio = (utils.max * 1.01 - utils.min * 0.99) / height;
    const y = e.clientY - e.target.getBoundingClientRect().y;
    this.setState({
      getMouseY: { y: y, value: Math.round((height - y) * yRatio) }
    });
  };

  resetOrdonateIndicator = height => {
    this.setState({
      getMouseY: { y: height, value: 0 }
    });
  };

  render() {
    const {
      chart,
      origin,
      width,
      height,
      utils,
      toolTip,
      getMouseY
    } = this.state;
    const {
      title,
      identification,
      step,
      stepSecond,
      showTrend,
      showToolTip,
      showPoint,
      showPath,
      showCoord,
      showLine,
      showMouseY,
      showXGrid,
      showYGrid,
      showAbscissa,
      showOrdinate,
      colors
    } = this.props;

    const graph = this.getCoordinates(chart, height, utils);
    const ordinateAxis = { min: utils.min, moy: utils.moy, max: utils.max };

    const value = graph[graph.length - 1].value | 0;
    const date = new Date();

    const setToolTip = this.setToolTip;
    const setOrdonateIndicator = this.setOrdonateIndicator;
    const resetOrdonateIndicator = this.resetOrdonateIndicator;

    return (
      <div>
        <h1>
          {title} {value} {identification}
        </h1>
        <div
          className="chart-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto ' + width + 'px ',
            gridTemplateRows: 'auto ' + height + 'px auto',
            backgroundColor: colors.background
          }}>
          {showToolTip && (
            <div
              className="tool-tip"
              style={{
                padding: 5,
                backgroundColor: colors.background,
                color: colors.text,
                gridColumn: '2 / span 2',
                gridRow: '1',
                height: 20,
                textAlign: 'end'
              }}>
              {toolTip.value && 'V : ' + toolTip.value}
            </div>
          )}
          <svg
            viewBox={origin.x + ' ' + origin.y + ' ' + width + ' ' + height}
            className="chart"
            style={{
              width: width,
              height: height,
              gridRow: '2 / span 2',
              gridColumn: '2 / span 2',
              cursor: 'pointer',
              zIndex: 1
            }}
            onMouseMove={e => setOrdonateIndicator(e, utils, height)}
            onMouseLeave={() => resetOrdonateIndicator(height)}>
            {showPath &&
              graph.map((coord, key) => (
                <g
                  className="graph"
                  style={{ cursor: 'pointer' }}
                  key={key}
                  onMouseEnter={e => setToolTip(coord)}
                  onMouseLeave={() => setToolTip({ x: 0, value: 0 })}>
                  <path
                    className="graph-path-background"
                    style={{
                      fill:
                        toolTip.hover !== coord.x
                          ? colors.background
                          : colors.backgroundHover
                    }}
                    d={
                      'M' +
                      graph[key - 1 >= 0 ? key - 1 : key].x + // 0,1
                      ' ' +
                      graph[key - 1 >= 0 ? key - 1 : key].y +
                      ', L' +
                      graph[key - 1 >= 0 ? key - 1 : key].x + // 0,0
                      ' ' +
                      0 +
                      ', L' +
                      coord.x + // 1,0
                      ' ' +
                      0 +
                      ', L' +
                      coord.x + // 1,1
                      ' ' +
                      coord.y +
                      ' Z'
                    }
                  />
                  <path
                    className={
                      'graph-path ' +
                      (key - 1 >= 0 && showTrend
                        ? graph[key - 1].value > coord.value
                          ? 'graph-path-low'
                          : graph[key - 1].value < coord.value
                            ? 'graph-path-hight'
                            : ''
                        : '')
                    }
                    style={{
                      fill:
                        key - 1 >= 0 && showTrend
                          ? graph[key - 1].value > coord.value
                            ? toolTip.hover !== coord.x
                              ? colors.pathLow
                              : colors.pathLowHover
                            : graph[key - 1].value < coord.value
                              ? toolTip.hover !== coord.x
                                ? colors.pathHight
                                : colors.pathHightHover
                              : toolTip.hover !== coord.x
                                ? colors.path
                                : colors.pathHover
                          : toolTip.hover !== coord.x
                            ? colors.path
                            : colors.pathHover
                    }}
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
            {showLine &&
              graph.map((coord, key) => (
                <g
                  className="graph"
                  onMouseEnter={() => setToolTip(coord)}
                  onMouseLeave={() => setToolTip({ x: 0, value: 0 })}
                  style={{ cursor: 'pointer' }}
                  key={key}>
                  <line
                    className={
                      'graph-line ' +
                      (key - 1 >= 0 && showTrend
                        ? graph[key - 1].value > coord.value
                          ? 'graph-line-low'
                          : graph[key - 1].value < coord.value
                            ? 'graph-line-hight'
                            : ''
                        : '')
                    }
                    style={{
                      strokeWidth: 2 + 5 / step,
                      stroke:
                        key - 1 >= 0 && showTrend
                          ? graph[key - 1].value > coord.value
                            ? colors.lineLow
                            : graph[key - 1].value < coord.value
                              ? colors.lineHight
                              : colors.line
                          : colors.line
                    }}
                    x1={graph[key - 1 >= 0 ? key - 1 : key].x}
                    y1={graph[key - 1 >= 0 ? key - 1 : key].y}
                    x2={coord.x}
                    y2={coord.y}
                  />
                </g>
              ))}
            {showPoint &&
              graph.map((coord, key) => (
                <g
                  className="graph"
                  onMouseEnter={() => setToolTip(coord)}
                  onMouseLeave={() => setToolTip({ x: 0, value: 0 })}
                  style={{ cursor: 'pointer' }}
                  key={key}>
                  <circle
                    className={
                      'graph-point ' +
                      (key - 1 >= 0 && showTrend
                        ? graph[key - 1].value > coord.value
                          ? 'graph-point-low'
                          : graph[key - 1].value < coord.value
                            ? 'graph-point-hight'
                            : ''
                        : '')
                    }
                    style={{
                      r: 1 + 5 / step,
                      stroke:
                        key - 1 >= 0 && showTrend
                          ? graph[key - 1].value > coord.value
                            ? colors.pointLow
                            : graph[key - 1].value < coord.value
                              ? colors.pointHight
                              : colors.point
                          : colors.point,
                      fill:
                        key - 1 >= 0 && showTrend
                          ? graph[key - 1].value > coord.value
                            ? colors.lineLow
                            : graph[key - 1].value < coord.value
                              ? colors.lineHight
                              : colors.line
                          : colors.line,
                      strokeWidth: 2
                    }}
                    cx={coord.x}
                    cy={coord.y}
                    data-value={coord.x}
                  />
                </g>
              ))}
            {showCoord &&
              graph.map((coord, key) => (
                <g
                  className="graph"
                  onMouseEnter={() => setToolTip(coord)}
                  onMouseLeave={() => setToolTip({ x: 0, value: 0 })}
                  key={key}
                  style={{ cursor: 'pointer' }}>
                  <text
                    className="graph-text"
                    style={{
                      fontSize: 12 + 4 / step,
                      fill: colors.textInside,
                      textAnchor: 'middle'
                    }}
                    x={coord.x - width / step / 2}
                    y={origin.y + height - 10}>
                    {coord.value}
                  </text>
                </g>
              ))}
            {showMouseY && (
              <g
                className="grid"
                style={{
                  strokeDasharray: '5',
                  strokeWidth: '1'
                }}>
                <line
                  className="mouse-y-grid"
                  style={{ stroke: colors.grid }}
                  x1={origin.x}
                  y1={origin.y + getMouseY.y}
                  x2={origin.x + width}
                  y2={origin.y + getMouseY.y}
                />
              </g>
            )}
            {showXGrid && (
              <g
                className="grid"
                style={{
                  strokeDasharray: '5',
                  strokeWidth: '1'
                }}>
                <line
                  className="x-grid"
                  style={{ stroke: colors.grid }}
                  x1={origin.x}
                  y1={origin.y}
                  x2={origin.x}
                  y2={origin.y + height}
                />
              </g>
            )}
            {showYGrid && (
              <g
                className="grid"
                style={{
                  strokeDasharray: '5',
                  strokeWidth: '1'
                }}>
                <line
                  className="y-grid"
                  style={{ stroke: colors.grid }}
                  x1={origin.x}
                  y1={origin.y + height}
                  x2={origin.x + width}
                  y2={origin.y + height}
                />
              </g>
            )}
          </svg>
          {showAbscissa && (
            <div
              className="abscissa"
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
                gridColumn: '2 / span 2',
                gridRow: '3',
                width:
                  (graph.length > step ? graph.length - 1 : graph.length - 2) *
                  width /
                  step
              }}>
              {Array.from(
                Array(Math.floor((graph.length - 1) * (width / step) / 100)),
                (v, i) => i * (step / width) * 100
              ).map((value, i) => (
                <span
                  className="abscissa-span"
                  key={i}
                  style={{ color: colors.text }}>
                  {new Date(
                    date.getTime() - value * stepSecond * 1000
                  ).getHours()}:{new Date(
                    date.getTime() - value * stepSecond * 1000
                  ).getMinutes()}
                </span>
              ))}
            </div>
          )}
          {showOrdinate && (
            <div
              className="ordinate"
              style={{
                display: 'flex',
                position: 'relative',
                flexDirection: 'column-reverse',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gridRow: '2 / 2'
              }}>
              {Object.values(ordinateAxis).map((ordinate, index) => (
                <span
                  className="ordinate-span"
                  key={index}
                  style={{
                    color: colors.text,
                    marginRight: '2px',
                    textAlign: 'end',
                    minWidth: '30px'
                  }}>
                  {ordinate} {identification}
                </span>
              ))}
              {showMouseY &&
                getMouseY.y !== height && (
                  <span
                    className="abscissa-mouse-y"
                    style={{
                      position: 'absolute',
                      top: getMouseY.y - 10,
                      right: 2,
                      backgroundColor: colors.background,
                      width: '100%',
                      border: '1px solid ' + colors.text,
                      textAlign: 'end'
                    }}>
                    {getMouseY.value}
                  </span>
                )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  data: PropTypes.array,
  liveData: PropTypes.func,
  isDataLive: PropTypes.bool,
  title: PropTypes.string,
  identification: PropTypes.string,
  step: PropTypes.number,
  stepSecond: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  showTrend: PropTypes.bool,
  showToolTip: PropTypes.bool,
  showPoint: PropTypes.bool,
  showCoord: PropTypes.bool,
  showLine: PropTypes.bool,
  showPath: PropTypes.bool,
  showMouseY: PropTypes.bool,
  showXGrid: PropTypes.bool,
  showYGrid: PropTypes.bool,
  showAbscissa: PropTypes.bool,
  showOrdinate: PropTypes.bool,
  colors: PropTypes.object
};

Chart.defaultProps = {
  data: [{ x: 0, y: 0, value: 0 }],
  isDataLive: true,
  liveData: () => Math.round(Math.random() * 100),
  title: '',
  identification: '',
  step: 20,
  stepSecond: 1,
  width: 600,
  height: 400,
  showTrend: false,
  showToolTip: false,
  showPoint: true,
  showCoord: false,
  showLine: true,
  showPath: false,
  showMouseY: true,
  showXGrid: true,
  showYGrid: true,
  showAbscissa: true,
  showOrdinate: true,
  colors: {
    background: '#fff',
    textInside: '#fff',
    text: '#00171F',
    grid: '#00171F',
    point: '#fff',
    line: '#1E97BF',
    path: '#8FCFE8',
    backgroundHover: '#F5F5F5',
    pathHover: '#6BB2CE',
    pathLowHover: '#CC1A49',
    pathHightHover: '#9CD6A7',
    lineLow: '#CC0036',
    lineHight: '#71D685',
    pointLow: 'fff',
    pointHight: '#fff',
    pathLow: '#E63462',
    pathHight: '#C7EFCF'
  }
};

export { Chart };
