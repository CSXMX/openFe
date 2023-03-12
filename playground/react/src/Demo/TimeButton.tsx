import React, { useEffect, useState } from "react";
import TimeButton from "../../../../src/components/TimeButton";

export type ExcelData = Array<Array<string>>;

const Page = () => {
  const onAction = () => {};
  return (
    <>
      <TimeButton text="操作" onAction={onAction}></TimeButton>
    </>
  );
};
export default Page;
