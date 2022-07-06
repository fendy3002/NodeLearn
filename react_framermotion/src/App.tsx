import { Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import './App.css';
import { Button } from './components/Button';

function App() {
  return (
    <>
    <Card>
      <CardContent
        component={motion.div}
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        sx={{ height: "40vh" }}
        viewport={{ once: true }}
        >
        <Button>Submit</Button>
      </CardContent>
    </Card>

    <Card>
      <CardContent
        component={motion.div}
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        sx={{ height: "40vh" }}
        viewport={{ once: true }}
        >
        <Button>Submit</Button>
      </CardContent>
    </Card>
    <Card>
      <CardContent
        component={motion.div}
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        sx={{ height: "40vh" }}
        viewport={{ once: true }}
        >
        <Button>Submit</Button>
      </CardContent>
    </Card>

    <Card>
      <CardContent
        component={motion.div}
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        sx={{ height: "40vh" }}
        viewport={{ once: true }}
        >
        <Button>Submit</Button>
      </CardContent>
    </Card>
    </>
  );
}

export default App;
