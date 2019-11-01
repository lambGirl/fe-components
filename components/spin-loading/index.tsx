import React from 'react';
import { Spin } from 'antd';
import { LoadingInterFaces } from './_interfaces';

const SpinLoading = ({status = false, children}: LoadingInterFaces)=> {
  return status ? <Spin>
    {children}
  </Spin> :{children}
}

export default SpinLoading;