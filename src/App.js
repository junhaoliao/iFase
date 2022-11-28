import './App.css';
import {Menu} from 'antd';
import {useState} from 'react';
//import Ant design UI
import {
  FundViewOutlined,
  HomeOutlined,
  UploadOutlined,
  CameraOutlined,
  NotificationOutlined
} from '@ant-design/icons';


import {UploadPage} from './pages/UploadPage';
import {ViewPage} from './pages/ViewPage';
import {CameraPage} from './pages/CameraPage';
import {WelcomePage} from './pages/WelcomePage';

const App = () => {
  const [currentMenu, setCurrentMenu] = useState('upload');


  const menuItems = [
    {
      label: <HomeOutlined
          style={{fontSize: '32px', marginTop: '12px'}}/>, key: 'home',
    },
    {
      label: 'About', key: 'about', icon:<NotificationOutlined/>,
    },
    {
      label: 'Upload', key: 'upload', icon: <UploadOutlined/>,
    }, {
      label: 'Camera', key: 'camera', icon: <CameraOutlined />,
    },{
      label: 'View', key: 'view', icon: <FundViewOutlined/>,
    }

    ];

  const handleMenuClick = (ev) => {
    if (ev.key === 'home') {
      window.location = '/';
    } else {
      setCurrentMenu(ev.key);
    }
  };

  let page = null
  if (currentMenu === 'upload'){
    page = <UploadPage/>
  }
  if (currentMenu === 'about'){
    page = <WelcomePage/>
  }
  if (currentMenu === 'view'){
    page = <ViewPage/>
  }
  if (currentMenu === 'camera'){
    page = <CameraPage/>
  }


  return (<div className="App">
    <Menu onClick={handleMenuClick}
          selectedKeys={[currentMenu]}
          mode="horizontal"
          items={menuItems}/>
    {page}

  </div>);
};

export default App;
