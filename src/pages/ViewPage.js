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
      Content1
    </Card.Grid>
    <Card.Grid hoverable={false} style={gridStyle}>
      <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"  width = "22%"/>
      <br/> example
    </Card.Grid>

    <Card.Grid style={gridStyle}>
      <img alt="test1" src="./../../faces/7e2a2e335f2a48cf824e76e37bb6b004.png" width = "22%" />
    </Card.Grid>

    <Card.Grid style={gridStyle}>
      Content
    </Card.Grid>

    <Card.Grid style={gridStyle}>
      Content
    </Card.Grid>

    <Card.Grid style={gridStyle}>
      Content
    </Card.Grid>

    <Card.Grid style={gridStyle}>
      Content
    </Card.Grid>
    </Card>





  </>)
};