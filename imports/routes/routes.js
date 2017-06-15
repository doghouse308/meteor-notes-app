import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';

import Signup from '../ui/signup';
import Dashboard from '../ui/dashboard';
import NotFound from '../ui/notFound';
import Login from '../ui/login';


const onEnterNotePage = (nextState) => {
  Session.set('selectedNoteId', nextState.params.id);
};

const onLeavNotePage = ()=> {
  Session.set('selectedNoteId', undefined);
}

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauthenticated';
  const isAuthenticatedPage = currentPagePrivacy === 'authenticated'

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};

export const globalOnChange = (previosState, nextState) => {
  globalOnEnter(nextState);

}
export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
}
export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={Login} privacy="unauthenticated" />
      <Route path="/signup" component={Signup} privacy="unauthenticated" />
      <Route path="/dashboard" component={Dashboard} privacy="authenticated" />
      <Route path="/dashboard/:id" component={Dashboard} privacy="authenticated" onEnter={onEnterNotePage} onLeave={onLeavNotePage}/>
      <Route path="*" component={NotFound} />
    </Route>

  </Router>
);