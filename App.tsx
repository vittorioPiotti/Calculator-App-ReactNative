/*
  Calcolatrice-React-Native v1.0.0 (https://github.com/vittorioPiotti/Calcolatrice-React-Native/releases/tag/1.0.0)
  Copyright 2024 Vittorio Piotti
  Licensed under GPL-3.0 (https://github.com/vittorioPiotti/Calcolatrice-React-Native/blob/main/LICENSE.md)
*/

/*
  React Native v0.74.0 (https://github.com/facebook/react-native/releases/tag/v0.74.0)
  Copyright Facebook, Inc.
  Licensed under MIT (https://github.com/facebook/react-native/blob/main/LICENSE)
*/

/**
 * @access public
 * @author Vittorio Piotti
 * @class App.tsx
 * @description Calcolatrice 
*/

import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity }
from 'react-native';
const App = () => {

const [outNum,setOutNum] = useState('');
const [inNumFs,setInNumFs] = useState('');
const [operaFs,setOperaFs] = useState('');
const [isSelFs,setIsSelFs] = useState(false);
const [isSelNd,setIsSelNd] = useState(false);
const [isSelRd,setIsSelRd] = useState(false);
const MAX_NUM = 5;
const SOMMA = 'somma';
const PROD = 'prodotto';
const RAPP = 'rapporto';
const SOCT = 'sottrazione';
const PERM = 'permutazione';
const PERC = 'percentuale';
const ERROR = 'Errore';

const deleteAll =() => {
setOutNum('');
setInNumFs('');
setOperaFs('');
setIsSelFs(false);
setIsSelNd(false);
setIsSelRd(false);
}

const doCalc = (opera:string,_inNumFs:string,_outNum:string) =>
{
var calc = '';
switch (opera) {
case SOMMA:
calc = String(parseFloat(_inNumFs) + parseFloat(_outNum));

break;
case SOCT:
calc = String(parseFloat(_inNumFs) - parseFloat(_outNum));
break;
case PROD:
calc = String(parseFloat(_inNumFs) *
parseFloat(_outNum));
break;
case RAPP:
calc = (parseFloat(_outNum) == 0 ) ? ERROR :
String(parseFloat(_inNumFs) / parseFloat(_outNum));
break;
case PERM:
calc = String(parseFloat(_outNum) * (-1));
break;
case PERC:
calc = String(parseFloat(_outNum) /100);
break;
default:
return ERROR;
}
if(checkNum(calc)){
return calc;
}else{
return ERROR;
}
}
const doOpera = (opera:string) => {
if(outNum != ''){
switch(opera){
case PERC:
var appOutNum = (isSelFs) ?
doCalc(operaFs,inNumFs,outNum) : outNum;

appOutNum = doCalc(opera,'',appOutNum);
setOutNum(appOutNum);
setInNumFs(appOutNum)
if(isSelFs){
setIsSelFs(false)
}
break;
case PERM:
var appOutNum = doCalc(opera,'',outNum);
setOutNum(appOutNum)
setIsSelFs(false)
setIsSelRd(true)

break;
default:
if(isSelNd){
var appOutNum = doCalc(operaFs,inNumFs,outNum);
setOutNum(appOutNum);
setInNumFs(appOutNum)
setIsSelNd(false)
}else{
setInNumFs(outNum)
}
setOperaFs(opera)
setIsSelFs(true)
break;
}
}

}
const checkNum = (num:string) => {
return num.length <= MAX_NUM + (num.includes('.') ? 1 : 0)
}
const setFloat = () => {
if(!outNum.includes('.')){
setOutNum( outNum + '.')
}
}
const addNum = (num:number) => {
console.log(num)
var appOutNum = '';
var appOutNumNd = (outNum == '0') ? '' : outNum;
if(checkNum(outNum) && outNum != ERROR){
if(isSelRd){
setOutNum( appOutNumNd + num)
setIsSelRd(false)
} else{
if(isSelFs){
setIsSelFs(false)
setIsSelNd(true)
}else{
appOutNum = appOutNumNd;
}
setOutNum( appOutNum + num)
}

}else{
if(isSelFs || outNum == ERROR){
setOutNum( appOutNum + num)
}
}

}
const getResult = () => {
if(operaFs != '' && inNumFs != ''){
var appOutNum = (doCalc(operaFs,inNumFs,outNum));
setOutNum(appOutNum)
setInNumFs(appOutNum)
setIsSelFs(false)
setIsSelNd(false)
setIsSelRd(false)
}
}

return (
<SafeAreaView style={styles.container}>
<View style={[styles.outputView, { flex: 0.40,
flexDirection: 'row', justifyContent: 'flex-end', alignItems:
'flex-end' }]}>
<Text style={[styles.outputText, styles.colorWhite]}
>{outNum}</Text>
</View>
<View style={[styles.inputView, { flex: 0.60 }]}>
<View style={styles.row}>
<TouchableOpacity style={[styles.circle,
styles.bgLightDark]} onPress={() => deleteAll()}>
<Text style={[styles.inputText, styles.colorGray]}
>AC</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.circle,
styles.bgLightDark]} onPress={() => doOpera(PERM)}>
<Text style={[styles.inputText, styles.colorGray]}>±</
Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.circle,
styles.bgLightDark]} onPress={ () => doOpera(PERC)}>
<Text style={[styles.inputText, styles.colorGray]}>%</
Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.circle,
styles.bgOrange]} onPress={() => doOpera(RAPP)}>

<Text style={[styles.inputText, styles.colorWhite]}
>÷</Text>
</TouchableOpacity>
</View>
<View style={styles.row}>
<TouchableOpacity style={[styles.circle,
styles.bgDarkGray]} onPress={() => addNum(7)}>
<Text style={[styles.inputText, styles.colorWhite]}
>7</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.circle,
styles.bgDarkGray]} onPress={() => addNum(8)}>
<Text style={[styles.inputText, styles.colorWhite]}
>8</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.circle,
styles.bgDarkGray]} onPress={() => addNum(9)}>
<Text style={[styles.inputText, styles.colorWhite]}
>9</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.circle,
styles.bgOrange]} onPress={() => doOpera(PROD)}>
<Text style={[styles.inputText, styles.colorWhite]}
>×</Text>
</TouchableOpacity>
</View>
<View style={styles.row}>
<TouchableOpacity style={[styles.circle,
styles.bgDarkGray]} onPress={() => addNum(4)}>
<Text style={[styles.inputText, styles.colorWhite]}
>4</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.circle,
styles.bgDarkGray]} onPress={() => addNum(5)}>
<Text style={[styles.inputText, styles.colorWhite]}
>5</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.circle,
styles.bgDarkGray]} onPress={() => addNum(6)}>
<Text style={[styles.inputText, styles.colorWhite]}
>6</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.circle,
styles.bgOrange]} onPress={() => doOpera(SOCT)}>
<Text style={[styles.inputText, styles.colorWhite]}
>−</Text>
</TouchableOpacity>
</View>
<View style={styles.row}>
<TouchableOpacity style={[styles.circle,
styles.bgDarkGray]} onPress={() => addNum(1)}>

<Text style={[styles.inputText, styles.colorWhite]}
>1</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.circle,
styles.bgDarkGray]} onPress={() => addNum(2)}>
<Text style={[styles.inputText, styles.colorWhite]}
>2</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.circle,
styles.bgDarkGray]} onPress={() => addNum(3)}>
<Text style={[styles.inputText, styles.colorWhite]}
>3</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.circle,
styles.bgOrange]} onPress={() => doOpera(SOMMA)}>
<Text style={[styles.inputText, styles.colorWhite]}
>+</Text>
</TouchableOpacity>
</View>
<View style={styles.row}>
<TouchableOpacity style={[styles.customCircle,
styles.bgDarkGray]} onPress={() => addNum(0)}>
<Text style={[styles.inputText,
styles.customInputText, styles.colorWhite]}>0</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.customCircleSecond,
styles.bgDarkGray]} onPress={() => setFloat()}>
<Text style={[styles.inputText, styles.colorWhite]}
>,</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.customCircleSecond,
styles.bgOrange]} onPress={() =>getResult()}>
<Text style={[styles.inputText, styles.colorWhite]}
>=</Text>
</TouchableOpacity>
</View>
</View>
</SafeAreaView>
);
};
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#1e1e1e',
},
outputView: {
},
inputView: {
},
outputTextExp:{
fontSize: 50,

marginEnd: 10,
},
outputText: {
fontSize: 90,
marginEnd: 10,
},
inputText: {
fontSize: 35,
},
customInputText: {
marginStart: 35
},
colorWhite: {
color: 'white',
},
row: {
flex: 1,
flexDirection: 'row',
justifyContent: 'space-around',
alignItems: 'center',
},
circle: {
width: '20%',
height: '90%',
borderRadius: 85,
backgroundColor: 'white',
justifyContent: 'center',
alignItems: 'center',
},
customCircle: {
width: '45%',
height: '90%',
borderRadius: 85,
backgroundColor: 'white',
justifyContent: 'center',
alignItems: 'flex-start',
},
customCircleSecond: {
width: '20%',
height: '90%',
borderRadius: 85,
backgroundColor: 'white',
justifyContent: 'center',
alignItems: 'center',
},
colorGray: {
color: '#404040'
},
bgOrange: {
backgroundColor: '#FFA500'
},
bgDarkGray: {

backgroundColor: '#505050'
},
bgLightDark: {
backgroundColor: '#afafaf'
}
});
export default App;
