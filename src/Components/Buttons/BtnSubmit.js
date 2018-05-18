import React, { Component } from "react";
import { Button } from 'react-native-elements';



export const BtnSubmit = (props) => (<Button
    icon={{ size: 28 }}
    buttonStyle={{ backgroundColor: 'blue', borderRadius: 10 }}
    textStyle={{ textAlign: 'center' }}
    title={props.text}
/>
)