import BookFlipProvider from './components/BookFlipProvider';
import Layout from './components/Layout';

function App() {
  return (
    <BookFlipProvider>
      <Layout />
    </BookFlipProvider>
  );
}

export default App;
