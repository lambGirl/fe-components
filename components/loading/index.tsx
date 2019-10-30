import React from 'react';
import { LoadingInterFaces } from './_interfaces';
import './style';

const Loading = ({type = 'default'}: LoadingInterFaces)=> {

    const displayName = 'Loading 加载中';
    
    const style = {
        width: 100,
        height: 100,
      };
  
    if (type === 'large') {
      style.width = 140;
      style.height = 140;
    } else if (type === 'small') {
      style.width = 60;
      style.height = 60;
    }
    
    return (<div className="loading-container">
    <img
      alt="正在加载..."
      src={require('./images/loading.gif')}
      style={style}
    />
    { displayName }
  </div>)
}

export default Loading;