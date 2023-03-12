import React, { FC, useEffect, useState, useRef } from "react";
import { Button, Tooltip } from "antd";
import { TooltipPlacement } from "antd/es/tooltip";

type TimeButtonProps = {
  text: string; // 按钮文案
  onAction: () => void; // 按钮操作
  placement?: TooltipPlacement; // 提示方向
  h?: number; // 剩余时间,小时数，默认0
  m?: number; // 剩余时间,分钟数，默认1
  s?: number; // 剩余时间,秒数，默认0
};
const TimeButton: FC<TimeButtonProps> = ({
  text = "",
  placement = "top",
  onAction,
  h = 0,
  m = 0,
  s = 10,
}) => {
  const [disabled, setDisabled] = useState(false);
  const [formatTime, setFormatTime] = useState("");
  let restTime = useRef(0);
  let timer = useRef(null);
  /** @desc 时间格式化 */
  const formatRestTime = (restTime: number) => {
    const m = Math.floor((restTime / 1000 / 60) % 60);
    const s = Math.floor((restTime / 1000) % 60);
    return m > 0 ? `${m}分${s}秒` : `${s}秒`;
  };
  /** @desc 获取存储的剩余时间 */
  const getPageRestTime = () => {
    const now = new Date().getTime();
    const storageTime = window.localStorage.getItem("restTime") || 0;
    const time = storageTime ? +storageTime : now;
    return time - now;
  };
  /** @desc 设置存储的剩余时间 */
  const setPageRestTime = () => {
    const now = new Date().getTime();
    window.localStorage.setItem(
      "restTime",
      String(now + 3600 * h * 1000 + 60 * m * 1000 + s * 1000)
    );
  };
  /** @desc 开启循环定时任务 */
  const handleTimer = () => {
    if (restTime.current > 1000) {
      restTime.current -= 1000;
      setFormatTime(formatRestTime(restTime.current));
      timer.current = setTimeout(() => {
        handleTimer();
      }, 1000);
    } else {
      setDisabled(false);
    }
  };
  /** @desc 点击按钮，开启定时器*/
  const handleAction = () => {
    onAction && onAction();
    setPageRestTime();
    setDisabled(true);
    const pageRestTime = getPageRestTime();
    restTime.current = pageRestTime;
    timer.current = setTimeout(() => {
      handleTimer();
    }, 0);
  };
  /**
   * @desc 页面初始化，
   */
  const init = (pageRestTime: number) => {
    setDisabled(true);
    restTime.current = pageRestTime;
    setFormatTime(formatRestTime(pageRestTime));
  };
  useEffect(() => {
    const pageRestTime = getPageRestTime();
    if (pageRestTime > 0) {
      init(pageRestTime);
      timer.current = setTimeout(() => {
        handleTimer();
      }, 1000);
    }
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
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
        <Button type="primary" onClick={handleAction}>
          {text}
        </Button>
      )}
    </>
  );
};

export type { TimeButtonProps };
export default TimeButton;
