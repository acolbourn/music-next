import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ChordProgressions from './ChordProgressions';

export default function ChordsRoot() {
  return (
    <Switch>
      <Route path={'/circle-of-fifths/:scaleId'}>
        <ChordProgressions />
      </Route>
      <Route path={'/circle-of-fifths'}>
        <ChordProgressions />
      </Route>
    </Switch>
  );
}
