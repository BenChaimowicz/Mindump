import type { Component } from 'solid-js';
import { createContext } from 'solid-js';
import HomeComponent from './components/Home';
import SideBarComponent from './components/SideBar';
import { Router, Route } from '@solidjs/router';
import { render } from 'solid-js/web';
import MemoScreen from './components/MemoScreen';
import { AppState, Memo } from './types';
import { createStore } from 'solid-js/store';
import {AppContext, AppContextProvider} from './Provider';

const App: Component = (props: { children }) => {


  return (
    <AppContextProvider>
    <div class="bg-black text-white">
      <SideBarComponent />
      <div class="ml-64">
        {props.children}
      </div>
    </div>
    </AppContextProvider>
  );
};

render(()=> (
  <Router root={App}>
    <Route path="/" component={HomeComponent} />
    <Route path="/memo/:id" component={(props) => <MemoScreen memoId={props.params.id as unknown as string} />} />
  </Router>
), document.getElementById('root') as HTMLElement)
export default App;
