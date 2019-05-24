import React                     from 'react';
import * as _                    from 'lodash';
import {Button, Grid, TextField} from '@material-ui/core';
import {seedList}                from './seedList';
import './App.css';

const App: React.FC = () => {
  const [nickname, setNickname] = React.useState('');
  let count: number = 0;

  const apiCall = async (name: string, oneChar: string, twoChar: string, seed: string) => {
    const initResponse = await fetch(`https://api.datamuse.com/words?rel_jjb=${seed}&sp=${oneChar}*`);
    const response = await initResponse.json();
    if (Object.keys(response).length === 0) {
      if (count <= 5) {
        count++;
      } else {
        setNickname('Special ' + name);
        return false;
      }
      apiCall(name, oneChar, twoChar, seedList[Math.floor(Math.random()*seedList.length)]);
    } else {
      const best = _.filter(response, (name: any) => name.word.substring(0, 1) === twoChar);
      if (best.length > 0) {
        setNickname(_.startCase(_.camelCase(best[Math.floor(Math.random()*best.length)].word) + ' ' + name));
        return false;
      } else {
        setNickname(_.startCase(_.camelCase(response[Math.floor(Math.random()*response.length)].word) + ' ' + name));
        return false;
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const firstChar = e.target.name.value.charAt(0);
    const firstTwoChar = e.target.name.value.substring(0, 1);
    const seed = seedList[Math.floor(Math.random()*seedList.length)];
    count = 0;
    await apiCall(e.target.name.value, firstChar, firstTwoChar, seed);
  };

  return (
    <React.Fragment>
      <Grid container direction ={'row'} justify={'center'} alignItems={'flex-start'}>
        <h1 className={'title'}>Get A Proper Manly Nickname!</h1>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid className={'nameInput'} container direction ={'row'} justify={'center'} alignItems={'flex-start'}>
          <Grid item xs={6}>
              <TextField name={'name'} label={'Type in Your Name'} fullWidth={true} margin={'normal'} variant={'outlined'}/>
          </Grid>
        </Grid>
        <Grid container direction ={'row'} justify={'center'} alignItems={'flex-end'}>
          <Grid item xs={6}>
            <Button type={'submit'} variant={'contained'} color={'secondary'} size={'large'}>Are You Ready For Your New Nickname?!</Button>
          </Grid>
        </Grid>
        <Grid container direction ={'row'} justify={'center'} alignItems={'flex-start'}>
          <h1 className={'nickname'}>{nickname}</h1>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default App;
