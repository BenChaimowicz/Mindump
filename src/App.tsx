import type { Component, JSX } from 'solid-js';
import { Show } from 'solid-js';
import HomeComponent from './components/Home';
import SideBarComponent from './components/SideBar';
import { Router, Route } from '@solidjs/router';
import MemoScreen from './components/MemoScreen';
import { AppContextProvider } from './Provider';

const Layout = (props: { children: JSX.Element, showSideBar: boolean }) => {
  return (
    <div class="bg-black text-white h-screen">
      <Show when={props.showSideBar}>
        <SideBarComponent />
      </Show>
      <div class="ml-16 sm:ml-48 md:ml-64 h-full overflow-hidden">
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
          <Layout showSideBar={true}>
            <HomeComponent />
          </Layout>
        )} />
        <Route path="/memo/:id" component={(props) => (
          <Layout showSideBar={false}>
            <MemoScreen memoId={props.params.id as unknown as string} />
          </Layout>
        )} />
      </Router>
    </AppContextProvider>
  );
};

export default App;
