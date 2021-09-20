/* eslint-disable */
import React from "react";

export const useValues = (name: string, props: any) => {
  React.useEffect(() => {
    props?.setFieldValue(name, { ...props.values }, false);
  }, [name, props.values]);
};
