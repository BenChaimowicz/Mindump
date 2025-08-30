import type { Component } from 'solid-js';
import HomeComponent from './components/Home';
import SideBarComponent from './components/SideBar';
import { Router, Route } from '@solidjs/router';
import { render } from 'solid-js/web';

const App: Component = (props: { children }) => {
  return (
    <div class="bg-black text-white">
      <SideBarComponent />
      <div class="ml-64">
        {props.children}
      </div>
    </div>
  );
};

render(()=> (
  <Router root={App}>
    <Route path="/" component={HomeComponent} />
  </Router>
), document.getElementById('root') as HTMLElement)
export default App;
