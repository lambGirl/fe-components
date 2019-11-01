import React from 'react';
import { Spin } from 'antd';

type SpinLoadingProps={
  status: boolean,
}
const SpinLoading:React.FC<SpinLoadingProps>= ({status, children})=> {
  return status ? <Spin>
    {children}
  </Spin> : children as React.ReactElement<any>;
}
export default SpinLoading;