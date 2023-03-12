import React, { useEffect, useState } from "react";
// import TimeButton from "../../../../src/components/TimeButton";
import { TimeButton } from "openfe";

const Page = () => {
  const onAction = () => {};
  return (
    <>
      <TimeButton text="操作" onAction={onAction} m={1} s={10}></TimeButton>
    </>
  );
};
export default Page;
