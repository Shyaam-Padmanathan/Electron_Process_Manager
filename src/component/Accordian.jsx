import { Button, Stack } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

function Accordian({processList, deleteProcess}) {

  const handleRunCommand = (command, filePath) => {
    debugger;
    if (window.electron && window.electron.ipcRenderer) {
      window.electron.ipcRenderer.send('run-command', { command, filePath });

      window.electron.ipcRenderer.on('command-response', (response) => {
        console.log(response); // Handle command output
      });
    } else {
      console.error('ipcRenderer is not available');
    }
  };

  return (
    <Accordion className='d-grid gap-3'>
      {processList.map(item=>{return <Accordion.Item className='d-grid gap-3' key={item.id} eventKey={item.id.toString()}>
        <Accordion.Header className='d-flex justify-content-between align-items-right'>
          <span>{item.name}</span> 
        <Stack className="ms-auto" direction="horizontal" gap={3}>
        <Button variant="info" onClick={(e) => {
                  e.stopPropagation();
                  handleRunCommand(item.command, item.path)}}>
            Run
          </Button>
          <Button variant="success">
            Edit
          </Button>
          <Button variant="danger" onClick={(e) => {
                  e.stopPropagation();
                  deleteProcess(item.id)}}>
            Delete
          </Button>
          <Button variant="info">
            Stop
          </Button>
          <Button variant="success">
            Open in VS Code
          </Button>
        </Stack></Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>})}
    </Accordion>
  );
}

export default Accordian;