import './App.css'
import CardList from './components/CardList';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';







const App = () => {

  return (
    <Box>
      <Sidebar />
      <CardList />
      <Footer />
    </Box>
  )


};

export default App
