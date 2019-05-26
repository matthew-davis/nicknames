import React                     from 'react';
import {Button, Grid, TextField} from '@material-ui/core';
import {seedList}                from './seedList';
import {
  arrangeInput,
  arrangeCadence,
  datamuseRequest,
  random
}                                from './utils';
import './App.css';

const App: React.FC = () => {
  const [nickname, setNickname] = React.useState<string | false | undefined>('');
  let nick: string | false | undefined = '';

  // Write that syllable needs a declaration file written for it
  // Write a readme.md

  // Improved version would use the CMU Pronunciation Dictionary to find phonemes as well as stress to get a better cadence
  // Another improvement would be a strength of nickname meter showing the grades
  // a final improvement would be to capture and surface the list of past nicknames that can be re brought up

  // Connect live
  // Check on mobile phone
  // Final aesthetics pass

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let namesInput = arrangeInput(e.target.name.value);
    namesInput.first = arrangeCadence(namesInput['first']);
    if ('second' in namesInput) {
      namesInput.first = arrangeCadence(namesInput['second']);
      // Urban Dictionary Request

      // Including this so the project workd until I've connected the Urban Dictionary
      const seed = random(seedList);
      nick = await datamuseRequest(namesInput, seed, 0);

    } else {
      const seed = random(seedList);
      nick = await datamuseRequest(namesInput, seed, 0);
    }
    setNickname(nick);
  };

  return (
    <React.Fragment>
      <Grid container direction ={'row'} justify={'center'} alignItems={'flex-start'}>
        <h1 className={'title'}>Get A Proper Nickname!</h1>
      </Grid>
      <Grid container direction ={'row'} justify={'center'} alignItems={'flex-start'}>
        <h1 className={'nickname'}>&nbsp;{nickname}</h1>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid className={'nameInput'} container direction ={'row'} justify={'center'} alignItems={'flex-start'}>
          <Grid item xs={6}>
              <TextField name={'name'} label={'Type in Your Name'} fullWidth={true} margin={'normal'} variant={'outlined'}/>
          </Grid>
        </Grid>
        <Grid container direction ={'row'} justify={'center'} alignItems={'flex-end'}>
          <Grid className={'submitButton'} item xs={6}>
            <Button type={'submit'} variant={'contained'} color={'secondary'} size={'large'}>Are You Ready For Your New Nickname?!</Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default App;
