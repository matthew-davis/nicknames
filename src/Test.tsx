import React      from 'react';
import {Grid}     from '@material-ui/core';

import {cmudict} from './cmudict';

import './App.css';

const Test: React.FC = () => {


  // interface Icmudict {[key: string]: string}
  //
  // const cmudict: Icmudict = {
  //   "matthew": "EY1 Z",
  //   "steve": "EY1"
  // };

  const matthew: string = 'barry';


  return (
    <React.Fragment>
      <Grid container direction ={'row'} justify={'center'} alignItems={'flex-start'}>

        <h1 className={'nickname'}>&nbsp;{cmudict[matthew]}</h1>

      </Grid>
    </React.Fragment>
  );
};

export default Test;
