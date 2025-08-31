import type { Component, JSX } from 'solid-js';
import HomeComponent from './components/Home';
import SideBarComponent from './components/SideBar';
import { Router, Route } from '@solidjs/router';
import MemoScreen from './components/MemoScreen';
import { AppContextProvider } from './Provider';

const Layout = (props: { children: JSX.Element }) => {
  return (
    <div class="bg-black text-white">
      <SideBarComponent />
      <div class="ml-64">
        {props.children}
      </div>
    </div>
  );
};

const App: Component = () => {
  return (
    <AppContextProvider>
      <Router>
        <Route path="/" component={() => (
          <Layout>
            <HomeComponent />
          </Layout>
        )} />
        <Route path="/memo/:id" component={(props) => (
          <Layout>
            <MemoScreen memoId={props.params.id as unknown as string} />
          </Layout>
        )} />
      </Router>
    </AppContextProvider>
  );
};

export default App;
