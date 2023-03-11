import React, { Component } from "react";
import { Button, Tooltip } from "antd";
import { TooltipPlacement } from "antd/es/tooltip";
import { getLocalStorage, getStorageKey } from "@/utils/storage";

type ButtonProps = {
  text: string; // 按钮文案
  storageKey: string; // 计时storageKey
  onAction: () => void; // 按钮操作
  placement?: TooltipPlacement; // 提示方向
};

class TimeButton extends Component<ButtonProps> {
  state = {
    restTime: 0,
    formatTime: "",
    disabled: false,
  };

  // 计时器
  timer: NodeJS.Timeout | undefined;

  componentDidMount() {
    const restTime = this.getRestTime();

    if (restTime > 0) {
      this.setState({
        disabled: true,
        restTime,
        formatTime: this.formatRestTime(restTime),
      });
      this.timer = setTimeout(() => {
        this.handleTimer();
      }, 1000);
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  /** @desc 按钮功能 */
  handleAction = async () => {
    this.props.onAction && this.props.onAction();
    this.setState({
      disabled: true,
    });
    const restTime = this.getRestTime();

    this.timer = setTimeout(() => {
      this.setState({
        restTime,
      });
      this.handleTimer();
    }, 1000);
  };

  /** @desc 获取剩余时间 */
  getRestTime = () => {
    const now = new Date().getTime();
    const key = getStorageKey(this.props.storageKey);
    const storageTime = getLocalStorage(key) || 0;
    const time = storageTime ? +storageTime : now;

    return time - now;
  };

  /** @desc 格式化剩余时间 */
  formatRestTime = (restTime: number) => {
    const m = Math.floor((restTime / 1000 / 60) % 60);
    const s = Math.floor((restTime / 1000) % 60);

    return m > 0 ? `${m}分${s}秒` : `${s}秒`;
  };

  /** @desc 倒计时剩余时间 */
  handleTimer = () => {
    if (this.state.restTime > 1000) {
      const restTime = this.state.restTime - 1000;

      this.setState({
        restTime,
        formatTime: this.formatRestTime(restTime),
      });
      this.timer = setTimeout(() => {
        this.handleTimer();
      }, 1000);
    } else {
      this.setState({
        disabled: false,
      });
    }
  };

  render() {
    const { text = "", placement = "top" } = this.props;
    const { disabled, formatTime } = this.state;

    return (
      <>
        {disabled ? (
          <Tooltip
            placement={placement}
            title={`请${formatTime}后再使用${text}功能`}
          >
            <Button type="primary" disabled>
              {text}
            </Button>
          </Tooltip>
        ) : (
          <Button type="primary" onClick={this.handleAction}>
            {text}
          </Button>
        )}
      </>
    );
  }
}

export default TimeButton;
