import { Router } from 'express';

import Todo from '../models/todo';
import { totalmem } from 'os';

const todos: Todo[] = [];

const router = Router();

router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos })
})

router.post('/todo', (req, res, next) => {
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: req.body.text
    }

    todos.push(newTodo);
    res.status(200).json(todos);
})

router.delete('/todo', (req, res, next) => {
    const id = req.body.id;
    if (!todos[id]) {
        res.status(404).json({message: 'id=null'})
    } else {
        todos.splice(id, 1);
        res.status(200).json(todos);
    }
})

router.post('/edit', (req, res, next) => {
    const id = req.body.id;
    const text = req.body.text;
    if (!todos[id]) {
        res.status(404).json({message: 'id=null'})
    } else {
        todos[id].text = text;
        res.status(200).json(todos);
    }


})


export default router;