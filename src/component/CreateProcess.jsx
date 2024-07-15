import { useEffect, useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { toast } from 'react-toastify';
import db from '../db/db';
import Accordian from './Accordian';

function CreateProcess() {
    const [name, setName] = useState('');
    const [path, setPath] = useState('');
    const [command, setCommand] = useState('');
    const [processes, setProcesses] = useState([]);


    const saveProcess = async () => {
        try {
            debugger;
            await db.processes.add({ name, path, command });
            toast.success('Process saved successfully!');
            reset();
            fetchProcesses();
        } catch (error) {
            toast.error('Process failed')
            console.error('Error saving process:', error);
        }
    };
    const fetchProcesses = async () => {
        const allProcesses = await db.processes.toArray();
        setProcesses(allProcesses);
      };
    const reset = () => {
        setName('');
        setCommand('');
        setPath('');
    }

    const deleteProcess = async (id) => {
        try {
          await db.processes.delete(id);
          toast.success('Process deleted successfully!');
          fetchProcesses(); // Refresh the list after deletion
        } catch (error) {
            toast.error('Process delete failed');
          console.error('Error deleting process:', error);
        }
      };

    useEffect(()=>{
        fetchProcesses()
    },[])

    return (
        <div className='d-grid gap-4'>
        <Stack direction="horizontal" gap={2}>
            <Form.Control
                size='md'
                type="text" placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Form.Control
                size='md'
                type="text" placeholder="Project path"
                value={path}
                onChange={(e) => setPath(e.target.value)}
            />
            <Form.Control
                size='md'
                type="text" placeholder="Executable Command"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
            />

            <Button disabled={name && command && path ? false : true} onClick={saveProcess}>
                Save
            </Button>
            <Button onClick={reset}>
                Reset
            </Button>
        </Stack>
        <Accordian processList={processes} deleteProcess={deleteProcess} />
        </div>
    );
}

export default CreateProcess;