/**
 * @component TimeRotateComponent
 * @description 时间轴轮播组件
 * @author ChengZhenghao
 */
import * as React from "react";
import "./index.css";

interface State {
  defaultValue: string;
  value: string;
  curIndex: number;
  play: boolean;
}

interface Props {
  data: string[];
  forever: boolean;
  interval?: number;
  onChange?: (value: string) => void;
}

export default class TimeRotate extends React.Component<Props, State> {
  public static getDerivedStateFromProps(nextProps: any, prevState: any) {
    return {
      defaultValue: nextProps.data[0],
    };
  }

  public timer = null;

  constructor(props?: any) {
    super(props);
    this.state = {
      defaultValue: this.props.data[0],
      value: "",
      curIndex: 0,
      play: false,
    };
  }

  componentWillUnmount() {
    clearInterval(TimeRotate["timer"]);
  }

  render() {
    const { defaultValue, play, value } = this.state;
    return (
      <div className="date-time-rotate-wrapper">
        <div className="play-pause-box">
          <i className={`${play ? "pause" : "play"}`} onClick={this.handlePlay} />
        </div>
        <div className="time-text">
          <span>{value || defaultValue}</span>
        </div>
        <div className="time-axis">{this.renderPoint()}</div>
      </div>
    );
  }

  private handlePlay = () => {
    this.setState({ play: !this.state.play }, () => {
      if (this.state.play) {
        this.changeCurIndex();
      } else {
        clearInterval(TimeRotate["timer"]);
      }
    });
  };

  //  渲染时间点
  private renderPoint = () => {
    const { curIndex } = this.state;
    const { data } = this.props;
    return data.map((item, index) => (
      <div
        key={`point${index}`}
        onClick={() => {
          this.setState({ curIndex: index, value: this.props.data[index] });
        }}
        className={`point ${curIndex === index ? "active" : ""}`}
      />
    ));
  };

  private changeCurIndex = () => {
    const length = this.props.data.length;
    TimeRotate["timer"] = setInterval(() => {
      const resultIndex = this.state.curIndex + 1;
      const curIndex = resultIndex > length - 1 ? 0 : resultIndex;
      const stop = !this.props.forever && resultIndex === length - 1;
      stop && clearInterval(TimeRotate["timer"]);
      this.setState(
        {
          curIndex,
          value: this.props.data[resultIndex],
          play: !stop,
        },
        () => {
          const value = this.props.data[this.state.curIndex];
          this.props.onChange && this.props.onChange(value);
          this.setState({
            value,
          });
        },
      );
    }, this.props.interval || 1000);
  };
}
