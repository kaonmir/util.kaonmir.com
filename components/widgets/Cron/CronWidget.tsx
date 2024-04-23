"use client";

import React, { useEffect, useState } from "react";
import { CronTime } from "cron";
import { CronTimeExt } from "./CronTimeExt";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Widget from "@/components/base/Widget";

interface IWidgetProps {}

export default function CrontabWidget({}: IWidgetProps) {
  const [text, setText] = useState<string>("5 4 * 2,4 1");
  const [errorCode, setErrorCode] = useState<number>(0);
  const [cursorUnit, setCursorUnit] = useState<number>(-1);
  const [stack, setStack] = useState<DateTime[]>([]);
  const [nextStackIndex, setNextStackIndex] = useState<number>(0);

  useEffect(() => {
    const newErrorCode = CronTimeExt.verify(text);
    setErrorCode(newErrorCode);

    if (newErrorCode === 0) {
      const crontime = new CronTime(text);
      setStack([crontime.getNextDateFrom(new Date(Date.now()))]);
      setNextStackIndex(0);
    }
  }, [text]);

  const activateUnit = (cursorIndex: number) => {
    const regex = /([^ ]+| +)/gm; // 문자들 혹은 공백들
    const matches = text.matchAll(regex);

    let newCursorUnit = 0;
    let index = 0;
    const unitIndexes: number[] = [];
    for (const [word] of matches) {
      if (word.trim() !== "") {
        unitIndexes.push(index);
      }
      index += word.length;
    }
    unitIndexes.push(index + 1);

    for (let i = 0; i < unitIndexes.length; i++) {
      if (cursorIndex < unitIndexes[i]) {
        newCursorUnit = i - 1;
        break;
      }
    }

    setCursorUnit(newCursorUnit);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

    const cursorIndex = Number(e.currentTarget.selectionStart);
    activateUnit(cursorIndex);
  };

  const onClickBefore = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (nextStackIndex === 0) return;
    setNextStackIndex(nextStackIndex - 1);
  };
  const onClickAfter = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (nextStackIndex === stack.length - 1) {
      const crontime = new CronTime(text);
      const newStack = [...stack];
      newStack.push(crontime.getNextDateFrom(newStack[nextStackIndex]));
      setStack(newStack);
    }
    setNextStackIndex(nextStackIndex + 1);
  };

  return (
    <Widget description="You can set the cron time and check the next execution time.">
      <div className="mb-6 h-5 text-sm text-gray-500">
        {errorCode === 0 && stack[nextStackIndex] && (
          <div className="flex flex-row items-center justify-center gap-x-3">
            <span
              className={`
                ${nextStackIndex === 0 ? "text-gray-300" : ""}
                clickable h-full w-3 text-left`}
              onClick={onClickBefore}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </span>
            <span>{stack[nextStackIndex].toFormat("yyyy-MM-dd HH:mm")}</span>
            <span
              className="clickable h-full w-3 text-right"
              onClick={onClickAfter}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
        )}
      </div>
      <div className="text-editor mb-1">
        <input
          id="input"
          type="text"
          // disable auto complete
          className={`${
            errorCode !== 0 ? "border-red-600 focus:border-red-600" : ""
          } w-full rounded-xl border border-gray-300 p-1 text-center text-base [word-spacing:0.8em] focus:border-blue-500 focus:outline-none`}
          value={text}
          onChange={onChange}
          onClick={(e) => activateUnit(Number(e.currentTarget.selectionStart))}
          onKeyUp={(e) => activateUnit(Number(e.currentTarget.selectionStart))}
          onBlur={() => setCursorUnit(-1)}
          autoComplete="off"
        />
      </div>
      <div className="ignore-drag" draggable={false}>
        <div className="flex-rows flex justify-center pl-3 text-xs">
          {["분", "시", "일", "월", "요일"].map((name, index) => {
            const active = cursorUnit === index;
            const error = (errorCode & (1 << index)) !== 0;
            return (
              // TODO : 설명문 표시 필요
              <div key={index}>
                <span
                  className={`rounded-lg px-2 py-0.5 text-xs
                    ${error ? "text-red-600" : ""}
                    ${active ? "text-blue-500" : "text-gray-400"}`}
                >
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Widget>
  );
}
