import React, { useEffect, useState } from "react";
import TimeButton from "../../../../src/react/TimeButton";

export type ExcelData = Array<Array<string>>;

const Page = () => {
  const onAction = () => {
    alert("test");
  };
  return (
    <>
      <TimeButton text="操作" onAction={onAction}></TimeButton>
    </>
  );
};
export default Page;
