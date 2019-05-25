import * as _ from 'lodash';
import * as syllable from "syllable";

export const arrangeInput = (name: string) => {
  const stringList = name.trim().split(/\s+/);
  const namesList = _.map(stringList, (name: string) => _.startCase(_.camelCase(name)));
  const namesInput: any = {first: {name: namesList[0], letter: namesList[0].charAt(0)}};
  if (namesList.length > 1) {
    namesInput.second = {name: namesList.slice(-1)[0], letter: namesList.slice(-1)[0].charAt(0)};
    namesInput.type = 'middleNick';
  } else {
    namesInput.type = 'frontNick';
  }
  return namesInput;
};


export const arrangeCadence = (names: any) => {

  // add syllable count to the object being built up


  console.log(syllable(names['first']['name']));


};



// const datamuseRequest = () => {
//  includes running new words through syllable thingy
//  pick the first two words that fit the syllable pattern
// randomly return one or the other with the name
// }:


// const urbanDictRequest = () => {
//  includes running new words through syllable thingy
//  pick the first two words that fit the syllable pattern
//  randomly return one or the other within the name
// }:
