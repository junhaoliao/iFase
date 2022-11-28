import * as react from 'react';
import {Card,Input} from 'antd';
import {createRef, useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';


export const ViewPage = () => {
const gridStyle = {
  width: '20%',
  textAlign: 'center',
};

  return (<>

    <Card title="People">

    <Card.Grid style={gridStyle}>
      <img alt="test1" src="https://media.allure.com/photos/6154778ae59dcf29244cc558/3:4/w_2310,h_3080,c_limit/Dwayne%20The%20Rock%20Johnson%20Nail%20Art%20Lede.jpg" width = "22%" />
      <br/> d.Johnson
    </Card.Grid>
    <Card.Grid hoverable={false} style={gridStyle}>
      <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"  width = "22%"/>
      <br/> example
    </Card.Grid>

    <Card.Grid style={gridStyle}>
      r1c3
    </Card.Grid>

    <Card.Grid style={gridStyle}>
      r1c4
    </Card.Grid>


    </Card>





  </>)
};