import React, { useState } from 'react';
import './App.css';

interface Task {
  id: number;
  text: string;
  priority: 'normal' | 'important' | 'highly-important';
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState<'normal' | 'important' | 'highly-important'>('normal');

  const addTask = () => {
    if (input.trim()) {
      const newTask: Task = {
        id: Date.now(),
        text: input.trim(),
        priority,
      };
      setTasks([...tasks, newTask]);
      setInput('');
      setPriority('normal');
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'important':
        return 'important';
      case 'highly-important':
        return 'highly-important';
      default:
        return 'normal';
    }
  };

  return (
    <div className="app">
      <h1>Smart Notes Todo</h1>
      <div className="add-task">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value as Task['priority'])}>
          <option value="normal">Normal</option>
          <option value="important">Important</option>
          <option value="highly-important">Highly Important</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`task ${getPriorityClass(task.priority)}`}>
            <span>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;