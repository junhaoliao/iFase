import './App.css';
import {Menu} from 'antd';
import {useState} from 'react';
import {
  FundViewOutlined,
  TaobaoCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {UploadPage} from './pages/UploadPage';

const App = () => {
  const [currentMenu, setCurrentMenu] = useState('upload');


  const menuItems = [
    {
      label: <TaobaoCircleOutlined
          style={{fontSize: '32px', marginTop: '12px'}}/>, key: 'home',
    },
    {
      label: 'Upload', key: 'upload', icon: <UploadOutlined/>,
    }, {
      label: 'View', key: 'app', icon: <FundViewOutlined/>,
    }];

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

  return (<div className="App">
    <Menu onClick={handleMenuClick}
          selectedKeys={[currentMenu]}
          mode="horizontal"
          items={menuItems}/>
    {page}

  </div>);
};

export default App;
