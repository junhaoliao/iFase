import * as react from 'react';
import {Card,Input} from 'antd';
import {createRef, useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';


export const ViewPage = () => {
const gridStyle = {
  width: '20%',
  textAlign: 'center',
  hoverable: 'false',
};

  return (<>

    <Card title="People">

    <Card.Grid style={gridStyle}>
      Content
    </Card.Grid>
    <Card.Grid hoverable={false} style={gridStyle}>
      <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"  width = "22%"/>
    </Card.Grid>

    <Card.Grid style={gridStyle}>
      <img alt="test1" src="./../../../faces/53affeca9bc842d2a59d9de918f8e7a4.png" width = "22%" />
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